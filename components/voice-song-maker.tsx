"use client";

import { useEffect, useRef, useState } from "react";
import {
  captureClip,
  CLIP_MS,
  closeMic,
  micErrorText,
  openMic,
  playSamples,
  playTone,
  stopTone,
  watchPitch,
  type MicSession,
} from "@/lib/voice-song/browser-audio";
import { mergeClips, normalizePeak, upsertClip, type VoiceClip } from "@/lib/voice-song/clips";
import { parseMidi } from "@/lib/voice-song/midi";
import {
  clampRange,
  endNoteChoices,
  formatHz,
  midiToName,
  notesInRange,
  startNoteChoices,
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  type NoteTone,
} from "@/lib/voice-song/notes";
import { pitchWord } from "@/lib/voice-song/pitch";
import { renderSongWav, scheduleVoiceSong } from "@/lib/voice-song/render";
import {
  builtInSongs,
  clampTempo,
  fileSlug,
  MAX_TEMPO,
  MIN_TEMPO,
  songById,
  songSeconds,
  type ScheduledNote,
  type Song,
} from "@/lib/voice-song/songs";
import { loadClips, saveClip } from "@/lib/voice-song/storage";

const BEAT_PX = 32;
const ROW_PX = 16;

const primaryBtn =
  "inline-flex min-h-12 items-center justify-center bg-signal px-5 text-sm font-medium text-paper hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40";
const quietBtn =
  "inline-flex min-h-12 items-center justify-center border border-line bg-paper px-5 text-sm font-medium text-ink hover:border-ink disabled:cursor-not-allowed disabled:opacity-40";
const fieldClass = "mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink";

type Phase = "setup" | "listen" | "record" | "review" | "done";

type PlayRun = {
  ctx: AudioContext;
  sources: AudioBufferSourceNode[];
  raf: number;
  startAt: number;
  endAt: number;
  bpm: number;
  notes: ScheduledNote[];
};

function sameList(left: number[], right: number[]): boolean {
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i += 1) {
    if (left[i] !== right[i]) return false;
  }
  return true;
}

export function VoiceSongMaker() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [rangeStart, setRangeStart] = useState(DEFAULT_RANGE_START);
  const [rangeEnd, setRangeEnd] = useState(DEFAULT_RANGE_END);
  const [step, setStep] = useState(0);
  const [clips, setClips] = useState<VoiceClip[]>([]);
  const [clipsLoaded, setClipsLoaded] = useState(false);
  const [storeNote, setStoreNote] = useState<string | null>(null);
  const [take, setTake] = useState<Float32Array | null>(null);
  const [pitchCents, setPitchCents] = useState<number | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [songId, setSongId] = useState(builtInSongs[0].id);
  const [customSong, setCustomSong] = useState<Song | null>(null);
  const [tempo, setTempo] = useState(builtInSongs[0].bpm);
  const [midiNote, setMidiNote] = useState<string | null>(null);
  const [playError, setPlayError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const [playBeat, setPlayBeat] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const sessionRef = useRef<MicSession | null>(null);
  const playCtxRef = useRef<AudioContext | null>(null);
  const playRef = useRef<PlayRun | null>(null);
  const playingRef = useRef(false);
  const keyHandlerRef = useRef<((event: KeyboardEvent) => void) | null>(null);
  const onKeyRef = useRef<(event: KeyboardEvent) => void>(() => undefined);
  const stopMeterRef = useRef<(() => void) | null>(null);
  const lastPaint = useRef(0);
  const captureToken = useRef(0);
  const targetHzRef = useRef<number | null>(null);
  const aliveRef = useRef(true);
  const startingRef = useRef(false);
  const releaseRef = useRef<() => void>(() => undefined);
  const rollRef = useRef<HTMLDivElement | null>(null);

  const notes = notesInRange(rangeStart, rangeEnd);
  const safeStep = Math.min(step, Math.max(0, notes.length - 1));
  const current = notes[safeStep];
  const song = songById(songId, customSong);
  const saved = new Set(clips.map((clip) => clip.midi));
  const meterLive = phase === "listen" || phase === "record" || phase === "review";

  function stopPlayback(stopSources = true) {
    const run = playRef.current;
    playRef.current = null;
    playingRef.current = false;
    if (run) {
      cancelAnimationFrame(run.raf);
      if (stopSources) {
        for (const source of run.sources) {
          try {
            source.stop();
          } catch {
            continue;
          }
        }
      }
    }
    if (!aliveRef.current) return;
    setPlaying(false);
    setActiveNotes([]);
    setPlayBeat(0);
  }

  function releaseSession() {
    captureToken.current += 1;
    stopMeterRef.current?.();
    stopMeterRef.current = null;
    targetHzRef.current = null;
    stopPlayback();
    const onKey = keyHandlerRef.current;
    keyHandlerRef.current = null;
    if (onKey) window.removeEventListener("keydown", onKey, true);
    const session = sessionRef.current;
    sessionRef.current = null;
    if (session) closeMic(session);
    const extra = playCtxRef.current;
    playCtxRef.current = null;
    if (extra && extra.state !== "closed") void extra.close();
    if (aliveRef.current) setPitchCents(null);
  }

  useEffect(() => {
    aliveRef.current = true;
    let cancel = false;
    loadClips()
      .then((rows) => {
        if (cancel) return;
        setClips((currentClips) => mergeClips(rows, currentClips));
        setClipsLoaded(true);
      })
      .catch(() => {
        if (cancel) return;
        setStoreNote("Saved notes did not load. New notes stay in this visit.");
        setClipsLoaded(true);
      });
    return () => {
      cancel = true;
      aliveRef.current = false;
      releaseRef.current();
    };
  }, []);

  function startMeter() {
    stopMeterRef.current?.();
    stopMeterRef.current = watchPitch(
      () => sessionRef.current,
      () => targetHzRef.current,
      (cents) => {
        if (aliveRef.current) setPitchCents(cents);
      },
    );
  }

  function goTo(index: number, list: NoteTone[]) {
    const session = sessionRef.current;
    if (index >= list.length) {
      setStep(Math.max(0, list.length - 1));
      setPhase("done");
      setTake(null);
      if (session) stopTone(session);
      targetHzRef.current = null;
      return;
    }
    const next = Math.max(0, index);
    setStep(next);
    setPhase("listen");
    setTake(null);
    const note = list[next];
    targetHzRef.current = note?.hz ?? null;
    if (session && note) playTone(session, note.hz);
  }

  async function onStart() {
    if (startingRef.current || sessionRef.current) return;
    startingRef.current = true;
    setMicError(null);
    if (!window.isSecureContext) {
      startingRef.current = false;
      setMicError("Open this page on a secure connection (https) to use the microphone.");
      return;
    }
    stopPlayback();
    if (playCtxRef.current && playCtxRef.current.state !== "closed") {
      void playCtxRef.current.close();
      playCtxRef.current = null;
    }
    try {
      const session = await openMic();
      sessionRef.current = session;
      const onKey = (event: KeyboardEvent) => onKeyRef.current(event);
      keyHandlerRef.current = onKey;
      window.addEventListener("keydown", onKey, true);
      setPhase("listen");
      setStep(0);
      setTake(null);
      const first = notesInRange(rangeStart, rangeEnd)[0];
      targetHzRef.current = first?.hz ?? null;
      if (first) playTone(session, first.hz);
      startMeter();
    } catch (error) {
      if (sessionRef.current) {
        closeMic(sessionRef.current);
        sessionRef.current = null;
      }
      setMicError(micErrorText(error));
    } finally {
      startingRef.current = false;
    }
  }

  function onStopMic() {
    releaseSession();
    setPhase("setup");
    setTake(null);
  }

  function onHear() {
    const session = sessionRef.current;
    if (!session || phase === "setup" || phase === "record" || phase === "done") return;
    const note = notes[safeStep];
    if (note) playTone(session, note.hz);
  }

  function onSkip() {
    if (phase === "setup" || phase === "done") return;
    captureToken.current += 1;
    goTo(safeStep + 1, notes);
  }

  function onBack() {
    if (phase === "setup") return;
    captureToken.current += 1;
    if (phase === "done") {
      goTo(safeStep, notes);
      return;
    }
    if (safeStep <= 0) {
      setPhase("listen");
      setTake(null);
      const note = notes[0];
      targetHzRef.current = note?.hz ?? null;
      if (sessionRef.current && note) playTone(sessionRef.current, note.hz);
      return;
    }
    goTo(safeStep - 1, notes);
  }

  async function onRecord() {
    const session = sessionRef.current;
    const note = notes[safeStep];
    if (!session || !note || phase !== "listen") return;
    stopTone(session);
    const token = captureToken.current + 1;
    captureToken.current = token;
    setPhase("record");
    setTake(null);
    const samples = await captureClip(session, CLIP_MS, () => captureToken.current !== token);
    if (captureToken.current !== token) return;
    if (samples.length < 16) {
      setPhase("listen");
      setMicError("The recording was empty. Try again.");
      return;
    }
    const nextTake = normalizePeak(samples, 0.9);
    setTake(nextTake);
    setMicError(null);
    setPhase("review");
    playSamples(session, nextTake, session.context.sampleRate);
  }

  async function onKeep() {
    const session = sessionRef.current;
    const note = notes[safeStep];
    if (!session || !note || !take || phase !== "review") return;
    const clip: VoiceClip = {
      midi: note.midi,
      hz: note.hz,
      sampleRate: session.context.sampleRate,
      samples: take,
    };
    setClips((currentClips) => upsertClip(currentClips, clip));
    goTo(safeStep + 1, notes);
    try {
      await saveClip(clip);
      setStoreNote(null);
    } catch {
      setStoreNote("This browser did not store the note. It stays in this visit.");
    }
  }

  function onRedo() {
    if (phase !== "review") return;
    const session = sessionRef.current;
    const note = notes[safeStep];
    setTake(null);
    setPhase("listen");
    if (session && note) playTone(session, note.hz);
  }

  function onPlayTake() {
    const session = sessionRef.current;
    if (!session || !take) return;
    playSamples(session, take, session.context.sampleRate);
  }

  function onRangeStart(value: number) {
    const next = clampRange(value, rangeEnd);
    setRangeStart(next.start);
    setRangeEnd(next.end);
    if (phase === "setup") {
      setStep(0);
      return;
    }
    captureToken.current += 1;
    const list = notesInRange(next.start, next.end);
    setStep(0);
    setPhase("listen");
    setTake(null);
    const note = list[0];
    targetHzRef.current = note?.hz ?? null;
    if (sessionRef.current && note) playTone(sessionRef.current, note.hz);
  }

  function onRangeEnd(value: number) {
    const next = clampRange(rangeStart, value);
    setRangeStart(next.start);
    setRangeEnd(next.end);
    if (phase === "setup") {
      setStep(0);
      return;
    }
    captureToken.current += 1;
    const list = notesInRange(next.start, next.end);
    setStep(0);
    setPhase("listen");
    setTake(null);
    const note = list[0];
    targetHzRef.current = note?.hz ?? null;
    if (sessionRef.current && note) playTone(sessionRef.current, note.hz);
  }

  function contextForPlay(): AudioContext {
    const live = sessionRef.current?.context;
    if (live && live.state !== "closed") return live;
    if (!playCtxRef.current || playCtxRef.current.state === "closed") {
      playCtxRef.current = new AudioContext();
    }
    return playCtxRef.current;
  }

  async function onPlay() {
    if (clips.length === 0) {
      setPlayError("Record at least one note before you play a song.");
      return;
    }
    stopPlayback();
    let ctx: AudioContext;
    try {
      ctx = contextForPlay();
      if (ctx.state !== "running") await ctx.resume();
    } catch {
      setPlayError("This browser cannot play audio on this page.");
      return;
    }
    setPlayError(null);
    const startAt = ctx.currentTime + 0.08;
    const scheduled = scheduleVoiceSong(ctx, ctx.destination, song.notes, clips, tempo, startAt);
    const run: PlayRun = {
      ctx,
      sources: scheduled.sources,
      raf: 0,
      startAt,
      endAt: scheduled.endAt,
      bpm: tempo,
      notes: song.notes,
    };
    playRef.current = run;
    playingRef.current = true;
    setPlaying(true);
    const tick = (frameTime: number) => {
      const activeRun = playRef.current;
      if (!activeRun) return;
      const now = activeRun.ctx.currentTime;
      const beat = (now - activeRun.startAt) * (activeRun.bpm / 60);
      const active: number[] = [];
      activeRun.notes.forEach((note, index) => {
        if (beat >= note.startBeat && beat < note.startBeat + note.beats) active.push(index);
      });
      setActiveNotes((prev) => (sameList(prev, active) ? prev : active));
      if (frameTime - lastPaint.current > 70) {
        lastPaint.current = frameTime;
        setPlayBeat(Math.max(0, beat));
        const scroller = rollRef.current;
        const mark = scroller?.querySelector<HTMLElement>("[data-active='true']");
        if (scroller && mark) {
          const left = mark.offsetLeft - scroller.clientWidth / 2 + mark.offsetWidth / 2;
          scroller.scrollLeft = Math.max(0, left);
        }
      }
      if (now >= activeRun.endAt) {
        stopPlayback(false);
        return;
      }
      activeRun.raf = requestAnimationFrame(tick);
    };
    run.raf = requestAnimationFrame(tick);
  }

  function onSong(id: string) {
    stopPlayback();
    setSongId(id);
    setTempo(songById(id, customSong).bpm);
    setPlayError(null);
  }

  async function onMidiFile(file: File) {
    setMidiNote(null);
    if (file.size > 2_000_000) {
      setMidiNote("This file is too large. Use a smaller MIDI file.");
      return;
    }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const title = file.name.replace(/\.[^.]+$/, "").trim() || "Uploaded song";
      const parsed = parseMidi(bytes, title);
      stopPlayback();
      setCustomSong(parsed.song);
      setSongId("upload");
      setTempo(parsed.song.bpm);
      setPlayError(null);
      setMidiNote(parsed.truncated ? "This page plays the first 800 notes." : null);
    } catch (error) {
      setMidiNote(error instanceof Error ? error.message : "This file is not a MIDI song.");
    }
  }

  async function onDownload() {
    if (clips.length === 0) {
      setPlayError("Record at least one note before you download a song.");
      return;
    }
    if (songSeconds(song.notes, tempo) > 180) {
      setPlayError("This song is too long to download. Choose a shorter song.");
      return;
    }
    setDownloading(true);
    setPlayError(null);
    try {
      const blob = await renderSongWav(song.notes, clips, tempo);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `voice-song-${fileSlug(song.title)}.wav`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setPlayError(error instanceof Error ? error.message : "This browser could not build the WAV file.");
    } finally {
      setDownloading(false);
    }
  }

  useEffect(() => {
    targetHzRef.current = meterLive ? (current?.hz ?? null) : null;
    releaseRef.current = releaseSession;
    onKeyRef.current = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }
      const key = event.key.toLowerCase();
      if (key !== " " && key !== "s" && key !== "b") return;
      if (playingRef.current || !sessionRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      if (key === " ") onHear();
      if (key === "s") onSkip();
      if (key === "b") onBack();
    };
  });

  const lows = Math.min(...song.notes.map((note) => note.midi));
  const highs = Math.max(...song.notes.map((note) => note.midi));
  const rows = Math.max(1, highs - lows + 1);
  const totalBeats = song.notes.reduce((max, note) => Math.max(max, note.startBeat + note.beats), 0);
  const fill = ((tempo - MIN_TEMPO) / (MAX_TEMPO - MIN_TEMPO)) * 100;
  const activeSet = new Set(activeNotes);
  const rangeLocked = phase === "record" || phase === "review";

  return (
    <div className="mt-10 space-y-8">
      <section className="border border-line bg-slot" aria-labelledby="record-heading">
        <div className="px-5 py-6 md:px-6 md:py-8">
          <h2 id="record-heading" className="text-2xl font-medium tracking-tight md:text-3xl">
            Record notes
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Default range is C4 to C5. You can choose a range up to two octaves. The song player uses every note you
            keep.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="range-start" className="block text-sm font-medium">
                First note
              </label>
              <select
                id="range-start"
                value={rangeStart}
                disabled={rangeLocked}
                onChange={(event) => onRangeStart(Number(event.target.value))}
                className={fieldClass}
              >
                {startNoteChoices().map((midi) => (
                  <option key={midi} value={midi}>
                    {midiToName(midi)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="range-end" className="block text-sm font-medium">
                Last note
              </label>
              <select
                id="range-end"
                value={rangeEnd}
                disabled={rangeLocked}
                onChange={(event) => onRangeEnd(Number(event.target.value))}
                className={fieldClass}
              >
                {endNoteChoices(rangeStart).map((midi) => (
                  <option key={midi} value={midi}>
                    {midiToName(midi)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">
            This range has {notes.length} {notes.length === 1 ? "note" : "notes"}.
          </p>

          <div className="mt-6 flex flex-wrap gap-1" aria-hidden="true">
            {notes.map((note, index) => {
              const tone = saved.has(note.midi) ? "bg-signal" : index === safeStep && phase !== "setup" ? "bg-ink" : "bg-line";
              return <span key={note.midi} className={`h-2 w-4 ${tone}`} />;
            })}
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            {phase === "done" ? "Range complete" : `Note ${safeStep + 1} of ${notes.length}`}
          </p>
          {phase === "done" ? (
            <p className="mt-3 text-3xl font-medium tracking-tight">You finished this range.</p>
          ) : (
            <p aria-live="polite" className="mt-3 text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
              {current?.name}
            </p>
          )}
          {phase !== "done" && current ? (
            <p className="mt-2 font-mono text-sm text-muted">{formatHz(current.hz)}</p>
          ) : null}
          {current && saved.has(current.midi) && phase !== "done" ? (
            <p className="mt-2 text-sm">This note is saved.</p>
          ) : null}

          {meterLive ? (
            <div className="mt-6 max-w-xl">
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                <span>Too low</span>
                <span>Too high</span>
              </div>
              <div
                className="relative mt-2 h-12 border border-line bg-paper"
                role="meter"
                aria-label="Pitch"
                aria-valuemin={-200}
                aria-valuemax={200}
                aria-valuenow={Math.round(pitchCents ?? 0)}
                aria-valuetext={pitchWord(pitchCents)}
              >
                <span className="absolute inset-y-0 left-1/2 w-px bg-ink/40" />
                {pitchCents != null ? (
                  <span
                    className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-signal"
                    style={{ left: `${50 + (pitchCents / 200) * 46}%` }}
                  />
                ) : null}
              </div>
              <p className="mt-2 text-sm font-medium">{pitchWord(pitchCents)}</p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {phase === "setup" ? (
              <button type="button" className={primaryBtn} onClick={() => void onStart()}>
                Start microphone
              </button>
            ) : (
              <button type="button" className={quietBtn} onClick={onStopMic}>
                Stop microphone
              </button>
            )}
            {phase === "done" ? (
              <button type="button" className={primaryBtn} onClick={() => goTo(0, notes)}>
                Start this range again
              </button>
            ) : null}
            {phase === "listen" ? (
              <button type="button" className={primaryBtn} onClick={() => void onRecord()}>
                Record
              </button>
            ) : null}
            {phase === "record" ? (
              <button type="button" className={primaryBtn} disabled>
                Recording…
              </button>
            ) : null}
            {phase === "review" ? (
              <>
                <button type="button" className={primaryBtn} onClick={() => void onKeep()}>
                  Keep
                </button>
                <button type="button" className={quietBtn} onClick={onRedo}>
                  Record again
                </button>
                <button type="button" className={quietBtn} onClick={onPlayTake}>
                  Play this take
                </button>
              </>
            ) : null}
            {phase === "listen" || phase === "review" ? (
              <button type="button" className={quietBtn} onClick={onHear}>
                Hear the note
              </button>
            ) : null}
            {phase !== "setup" && phase !== "done" ? (
              <button type="button" className={quietBtn} onClick={onSkip}>
                Skip
              </button>
            ) : null}
            {phase !== "setup" ? (
              <button type="button" className={quietBtn} onClick={onBack}>
                Back
              </button>
            ) : null}
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Space plays the tone again. S skips the note. B goes back one note.
          </p>
          <p className="mt-2 text-sm text-muted">
            {clipsLoaded ? `Saved notes: ${clips.length}` : "Loading saved notes."}
          </p>
          {storeNote ? <p className="mt-2 text-sm">{storeNote}</p> : null}
          {micError ? (
            <p role="alert" className="mt-3 max-w-2xl text-sm leading-relaxed">
              {micError}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border border-line bg-slot" aria-labelledby="play-heading">
        <div className="px-5 py-6 md:px-6 md:py-8">
          <h2 id="play-heading" className="text-2xl font-medium tracking-tight md:text-3xl">
            Play a song
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            The player uses your clips only. A missing note uses the nearest clip, shifted to that pitch.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <label htmlFor="song" className="block text-sm font-medium">
                Song
              </label>
              <select id="song" value={song.id} onChange={(event) => onSong(event.target.value)} className={fieldClass}>
                {builtInSongs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
                {customSong ? (
                  <option value="upload">{customSong.title}</option>
                ) : null}
              </select>
            </div>
            <div>
              <label htmlFor="midi-file" className="block text-sm font-medium">
                Upload a MIDI file
              </label>
              <input
                id="midi-file"
                type="file"
                accept=".mid,.midi,audio/midi,audio/x-midi"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) void onMidiFile(file);
                }}
                className="mt-2 block w-full text-sm file:mr-4 file:min-h-12 file:border-0 file:bg-ink file:px-4 file:text-sm file:font-medium file:text-paper"
              />
            </div>
          </div>
          {midiNote ? <p className="mt-3 text-sm">{midiNote}</p> : null}

          <div className="mt-6 max-w-xl">
            <label htmlFor="tempo" className="block text-sm font-medium">
              Tempo: {tempo} bpm
            </label>
            <input
              id="tempo"
              type="range"
              min={MIN_TEMPO}
              max={MAX_TEMPO}
              step={1}
              value={tempo}
              disabled={playing}
              onChange={(event) => setTempo(clampTempo(Number(event.target.value)))}
              className="offer-range mt-2"
              style={{ ["--fill" as string]: `${fill}%` }}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {playing ? (
              <button type="button" className={primaryBtn} onClick={() => stopPlayback()}>
                Stop
              </button>
            ) : (
              <button type="button" className={primaryBtn} onClick={() => void onPlay()} disabled={clips.length === 0}>
                Play song
              </button>
            )}
            <button
              type="button"
              className={quietBtn}
              onClick={() => void onDownload()}
              disabled={clips.length === 0 || downloading}
            >
              {downloading ? "Building WAV…" : "Download WAV"}
            </button>
          </div>
          {clips.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Record at least one note before you play a song.</p>
          ) : null}
          {playError ? (
            <p role="alert" className="mt-3 text-sm">
              {playError}
            </p>
          ) : null}

          <div ref={rollRef} className="mt-6 max-h-80 overflow-auto border border-line bg-paper" role="img" aria-label={playing ? "Piano roll. The song is playing." : "Piano roll"}>
            <div className="relative" style={{ width: Math.max(totalBeats * BEAT_PX, 280), height: Math.max(rows * ROW_PX, 96) }}>
              {song.notes.map((note, index) => (
                <span
                  key={`${song.id}-${index}`}
                  data-active={activeSet.has(index) ? "true" : "false"}
                  className={`absolute ${activeSet.has(index) ? "bg-signal" : "bg-ink/45"}`}
                  style={{
                    left: note.startBeat * BEAT_PX,
                    width: Math.max(4, note.beats * BEAT_PX - 2),
                    bottom: (note.midi - lows) * ROW_PX,
                    height: ROW_PX - 2,
                  }}
                />
              ))}
              {playing ? (
                <span className="absolute inset-y-0 w-px bg-signal" style={{ left: Math.max(0, playBeat) * BEAT_PX }} />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
