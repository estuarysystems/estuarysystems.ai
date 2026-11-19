import { centsBetween, detectPitch } from "./pitch";

export const CLIP_MS = 900;

export type MicSession = {
  context: AudioContext;
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
  analyser: AnalyserNode;
  tone: OscillatorNode | null;
  toneGain: GainNode | null;
  preview: AudioBufferSourceNode | null;
};

export async function openMic(): Promise<MicSession> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("This browser has no microphone control.");
  }
  const context = new AudioContext();
  if (context.state !== "running") await context.resume();
  const silent = context.createBuffer(1, 1, context.sampleRate);
  const blip = context.createBufferSource();
  blip.buffer = silent;
  blip.connect(context.destination);
  blip.start();

  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      video: false,
    });
  } catch (error) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch {
      await context.close();
      throw error;
    }
  }

  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);
  return { context, stream, source, analyser, tone: null, toneGain: null, preview: null };
}

export function closeMic(session: MicSession) {
  stopTone(session);
  stopPreview(session);
  for (const track of session.stream.getTracks()) track.stop();
  safeDisconnect(session.source);
  safeDisconnect(session.analyser);
  void session.context.close();
}

export function watchPitch(
  getSession: () => MicSession | null,
  getTargetHz: () => number | null,
  onCents: (cents: number | null) => void,
): () => void {
  let last = 0;
  let raf = 0;
  let smooth: number | null = null;
  const loop = () => {
    const session = getSession();
    if (!session) return;
    const now = performance.now();
    if (now - last >= 50) {
      last = now;
      const target = getTargetHz();
      if (!target) {
        smooth = null;
        onCents(null);
      } else {
        const hz = readPitch(session);
        if (hz == null) {
          smooth = null;
          onCents(null);
        } else {
          const cents = Math.max(-200, Math.min(200, centsBetween(hz, target)));
          smooth = smooth == null ? cents : smooth + (cents - smooth) * 0.45;
          onCents(smooth);
        }
      }
    }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}

export function readPitch(session: MicSession): number | null {
  const buf = new Float32Array(session.analyser.fftSize);
  session.analyser.getFloatTimeDomainData(buf);
  return detectPitch(buf, session.context.sampleRate);
}

export function playTone(session: MicSession, hz: number) {
  stopTone(session);
  stopPreview(session);
  const osc = session.context.createOscillator();
  const gain = session.context.createGain();
  osc.type = "sine";
  osc.frequency.value = hz;
  const now = session.context.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
  gain.gain.setValueAtTime(0.18, now + 0.42);
  gain.gain.linearRampToValueAtTime(0, now + 0.55);
  osc.connect(gain);
  gain.connect(session.context.destination);
  osc.start(now);
  osc.stop(now + 0.56);
  session.tone = osc;
  session.toneGain = gain;
  osc.onended = () => {
    if (session.tone === osc) {
      session.tone = null;
      session.toneGain = null;
    }
  };
}

export function stopTone(session: MicSession) {
  const osc = session.tone;
  const gain = session.toneGain;
  session.tone = null;
  session.toneGain = null;
  if (!osc) return;
  const now = session.context.currentTime;
  try {
    gain?.gain.cancelScheduledValues(now);
    gain?.gain.setValueAtTime(0, now);
    osc.stop(now + 0.01);
  } catch {
    return;
  }
}

export function playSamples(session: MicSession, samples: Float32Array, sampleRate: number) {
  if (samples.length < 2 || sampleRate <= 0) return;
  stopPreview(session);
  const buffer = session.context.createBuffer(1, samples.length, sampleRate);
  buffer.copyToChannel(new Float32Array(samples), 0);
  const source = session.context.createBufferSource();
  source.buffer = buffer;
  source.connect(session.context.destination);
  source.start();
  session.preview = source;
  source.onended = () => {
    if (session.preview === source) session.preview = null;
  };
}

export function captureClip(session: MicSession, ms: number, isCancelled: () => boolean): Promise<Float32Array> {
  if (typeof session.context.createScriptProcessor === "function") {
    return captureWithProcessor(session, ms, isCancelled).then((samples) => {
      if (samples.length >= 16 || isCancelled()) return samples;
      return captureWithRecorder(session, ms, isCancelled);
    });
  }
  return captureWithRecorder(session, ms, isCancelled);
}

export function micErrorText(error: unknown): string {
  if (typeof window !== "undefined" && !window.isSecureContext) {
    return "Open this page on a secure connection (https) to use the microphone.";
  }
  if (error instanceof Error && error.message === "This browser has no microphone control.") {
    return error.message;
  }
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "The browser blocked the microphone. Allow microphone access. Then press Start microphone again.";
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return "This device has no microphone.";
  }
  if (name === "NotReadableError" || name === "TrackStartError" || name === "AbortError") {
    return "The microphone is busy. Close other apps that use it. Then press Start microphone again.";
  }
  if (name === "SecurityError") {
    return "The browser blocked the microphone on this page.";
  }
  return "The microphone did not start. Check the browser permission. Then press Start microphone again.";
}

function captureWithProcessor(session: MicSession, ms: number, isCancelled: () => boolean): Promise<Float32Array> {
  const { context, source } = session;
  const processor = context.createScriptProcessor(2048, 1, 1);
  const mute = context.createGain();
  mute.gain.value = 0;
  const target = Math.max(1, Math.round(context.sampleRate * (ms / 1000)));
  const chunks: Float32Array[] = [];
  let got = 0;

  return new Promise((resolve) => {
    let settled = false;
    let timer = 0;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      processor.onaudioprocess = null;
      safeDisconnect(processor);
      safeDisconnect(mute);
      if (isCancelled()) {
        resolve(new Float32Array(0));
        return;
      }
      resolve(joinSamples(chunks, target));
    };
    timer = window.setTimeout(finish, ms + 1200);
    processor.onaudioprocess = (event) => {
      if (settled || isCancelled()) {
        finish();
        return;
      }
      const data = event.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(data));
      got += data.length;
      if (got >= target) finish();
    };
    source.connect(processor);
    processor.connect(mute);
    mute.connect(context.destination);
  });
}

function captureWithRecorder(session: MicSession, ms: number, isCancelled: () => boolean): Promise<Float32Array> {
  if (typeof MediaRecorder === "undefined") return Promise.resolve(new Float32Array(0));
  let recorder: MediaRecorder;
  try {
    recorder = new MediaRecorder(session.stream);
  } catch {
    return Promise.resolve(new Float32Array(0));
  }
  const chunks: Blob[] = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };
  const stopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve();
  });
  recorder.start();
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (recorder.state !== "inactive") recorder.stop();
      void stopped.then(async () => {
        if (isCancelled()) {
          resolve(new Float32Array(0));
          return;
        }
        try {
          const blob = new Blob(chunks);
          const bytes = await blob.arrayBuffer();
          const audio = await session.context.decodeAudioData(bytes.slice(0));
          resolve(audio.getChannelData(0).slice());
        } catch {
          resolve(new Float32Array(0));
        }
      });
    }, ms);
  });
}

function joinSamples(chunks: Float32Array[], target: number): Float32Array {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Float32Array(Math.min(total, target));
  let offset = 0;
  for (const chunk of chunks) {
    const room = out.length - offset;
    if (room <= 0) break;
    out.set(chunk.subarray(0, room), offset);
    offset += Math.min(room, chunk.length);
  }
  return out;
}

function stopPreview(session: MicSession) {
  const preview = session.preview;
  session.preview = null;
  if (!preview) return;
  try {
    preview.stop();
  } catch {
    return;
  }
}

function safeDisconnect(node: { disconnect: () => void }) {
  try {
    node.disconnect();
  } catch {
    return;
  }
}
