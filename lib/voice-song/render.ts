import { nearestClip, pitchRate, type VoiceClip } from "./clips";
import { songSeconds, type ScheduledNote } from "./songs";

const MAX_RENDER_SECONDS = 180;

export function encodeWav(sampleRate: number, channels: Float32Array[]): Uint8Array {
  const channelCount = Math.max(1, channels.length);
  const frames = channels[0]?.length ?? 0;
  const blockAlign = channelCount * 2;
  const dataSize = frames * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  writeText(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeText(view, 8, "WAVE");
  writeText(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channelCount, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeText(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let frame = 0; frame < frames; frame += 1) {
    for (let channel = 0; channel < channelCount; channel += 1) {
      const raw = channels[channel]?.[frame] ?? 0;
      const sample = Math.max(-1, Math.min(1, raw));
      const scaled = Math.round(sample < 0 ? sample * 0x8000 : sample * 0x7fff);
      view.setInt16(offset, Math.max(-32768, Math.min(32767, scaled)), true);
      offset += 2;
    }
  }
  return new Uint8Array(buffer);
}

export function scheduleVoiceSong(
  ctx: BaseAudioContext,
  output: AudioNode,
  notes: readonly ScheduledNote[],
  clips: readonly VoiceClip[],
  bpm: number,
  startAt: number,
): { sources: AudioBufferSourceNode[]; endAt: number } {
  const secondsPerBeat = 60 / (bpm > 0 ? bpm : 100);
  let endAt = startAt;
  const sources: AudioBufferSourceNode[] = [];

  for (const note of notes) {
    const clip = nearestClip(clips, note.midi);
    if (!clip) continue;
    const rate = pitchRate(clip.midi, note.midi);
    if (!Number.isFinite(rate) || rate <= 0) continue;
    const noteStart = startAt + note.startBeat * secondsPerBeat;
    const duration = Math.max(0.05, note.beats * secondsPerBeat);
    endAt = Math.max(endAt, noteStart + duration);

    const buffer = ctx.createBuffer(1, clip.samples.length, clip.sampleRate);
    buffer.copyToChannel(new Float32Array(clip.samples), 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;
    const onePass = buffer.duration / rate;
    if (duration > onePass + 0.02) source.loop = true;

    const gain = ctx.createGain();
    const attack = Math.min(0.015, duration / 5);
    const release = Math.min(0.04, duration / 4);
    const releaseAt = Math.max(noteStart + attack, noteStart + duration - release);
    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.7, noteStart + attack);
    gain.gain.setValueAtTime(0.7, releaseAt);
    gain.gain.linearRampToValueAtTime(0, noteStart + duration);
    source.connect(gain);
    gain.connect(output);
    source.start(noteStart);
    source.stop(noteStart + duration + 0.02);
    sources.push(source);
  }

  return { sources, endAt };
}

export async function renderSongWav(
  notes: readonly ScheduledNote[],
  clips: readonly VoiceClip[],
  bpm: number,
): Promise<Blob> {
  const seconds = songSeconds(notes, bpm);
  if (seconds <= 0 || clips.length === 0) {
    throw new Error("Record at least one note before you download a song.");
  }
  if (seconds > MAX_RENDER_SECONDS) {
    throw new Error("This song is too long to download. Choose a shorter song.");
  }
  const sampleRate = 44100;
  const length = Math.ceil((seconds + 0.08) * sampleRate);
  const ctx = new OfflineAudioContext(1, length, sampleRate);
  scheduleVoiceSong(ctx, ctx.destination, notes, clips, bpm, 0);
  const rendered = await ctx.startRendering();
  const wav = encodeWav(rendered.sampleRate, [rendered.getChannelData(0)]);
  const copy = wav.buffer.slice(wav.byteOffset, wav.byteOffset + wav.byteLength) as ArrayBuffer;
  return new Blob([copy], { type: "audio/wav" });
}

function writeText(view: DataView, offset: number, value: string) {
  for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
}
