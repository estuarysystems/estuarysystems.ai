import assert from "node:assert/strict";
import test from "node:test";
import { mergeClips, nearestClip, normalizePeak, pitchRate, upsertClip, type VoiceClip } from "./clips.ts";
import { parseMidi } from "./midi.ts";
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  clampRange,
  formatHz,
  midiToHz,
  midiToName,
  notesInRange,
} from "./notes.ts";
import { centsBetween, detectPitch, pitchWord } from "./pitch.ts";
import { encodeWav } from "./render.ts";
import { builtInSongs, clampTempo, fileSlug, sequenceNotes, songById, songSeconds } from "./songs.ts";

function assertHz(found: number | null, target: number) {
  assert.ok(found != null);
  const cents = Math.abs(1200 * Math.log2(found / target));
  assert.ok(cents < 20, `${found} Hz is ${cents.toFixed(1)} cents from ${target} Hz`);
}

function sine(hz: number, sampleRate: number, seconds: number): Float32Array {
  const length = Math.floor(sampleRate * seconds);
  const out = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    out[i] = Math.sin((2 * Math.PI * hz * i) / sampleRate) * 0.4;
  }
  return out;
}

function vlq(value: number): number[] {
  const bytes = [value & 0x7f];
  let rest = value >> 7;
  while (rest > 0) {
    bytes.unshift((rest & 0x7f) | 0x80);
    rest >>= 7;
  }
  return bytes;
}

function midiFile(format: number, tracks: number[][]): Uint8Array {
  const header = new Uint8Array(14);
  header.set([0x4d, 0x54, 0x68, 0x64], 0);
  const view = new DataView(header.buffer);
  view.setUint32(4, 6);
  view.setUint16(8, format);
  view.setUint16(10, tracks.length);
  view.setUint16(12, 480);
  const bodies = tracks.map((events) => {
    const body = Uint8Array.from(events);
    const chunk = new Uint8Array(8 + body.length);
    chunk.set([0x4d, 0x54, 0x72, 0x6b], 0);
    new DataView(chunk.buffer).setUint32(4, body.length);
    chunk.set(body, 8);
    return chunk;
  });
  const size = header.length + bodies.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(size);
  out.set(header, 0);
  let offset = header.length;
  for (const chunk of bodies) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function endTrack(): number[] {
  return [0x00, 0xff, 0x2f, 0x00];
}

test("default range is one octave and the cap is two octaves", () => {
  assert.equal(midiToName(60), "C4");
  assert.equal(midiToName(72), "C5");
  assert.equal(midiToHz(69), 440);
  assert.equal(formatHz(440), "440.0 Hz");
  assert.equal(DEFAULT_RANGE_START, 60);
  assert.equal(DEFAULT_RANGE_END, 72);
  assert.equal(notesInRange(60, 72).length, 13);
  assert.deepEqual(clampRange(60, 96), { start: 60, end: 84 });
  assert.deepEqual(clampRange(70, 60), { start: 70, end: 70 });
  assert.equal(notesInRange(48, 84).length, 25);
});

test("pitch detector finds a sung tone and ignores silence", () => {
  assert.equal(detectPitch(new Float32Array(2048), 44100), null);
  assertHz(detectPitch(sine(440, 44100, 0.2), 44100), 440);
  assertHz(detectPitch(sine(261.63, 44100, 0.25), 44100), 261.63);
  assertHz(detectPitch(sine(880, 44100, 0.2), 44100), 880);
  assert.ok(Math.abs(centsBetween(440, 440)) < 0.01);
  assert.equal(pitchWord(null), "Sing the note.");
  assert.equal(pitchWord(12), "In tune");
  assert.equal(pitchWord(-50), "Too low");
  assert.equal(pitchWord(50), "Too high");
});

test("nearest clip breaks a tie toward the lower note", () => {
  const low = clip(62);
  const high = clip(66);
  assert.equal(nearestClip([high, low], 64)?.midi, 62);
  assert.equal(nearestClip([low], 69)?.midi, 62);
  assert.equal(nearestClip([], 60), null);
  assert.equal(pitchRate(60, 72), 2);
  const quiet = new Float32Array([0.1, -0.1, 0.05]);
  const peaked = normalizePeak(quiet, 0.9);
  let peak = 0;
  for (const sample of peaked) peak = Math.max(peak, Math.abs(sample));
  assert.ok(Math.abs(peak - 0.9) < 0.0001);
  const kept = upsertClip([low], high);
  assert.deepEqual(
    kept.map((item) => item.midi),
    [62, 66],
  );
  const replaced = mergeClips([low, high], [clip(62, 0.2)]);
  const replacedSample = replaced.find((item) => item.midi === 62)?.samples[0] ?? 0;
  assert.ok(Math.abs(replacedSample - 0.2) < 0.0001);
});

test("built-in songs are public-domain melodies with playable timing", () => {
  assert.deepEqual(
    builtInSongs.map((song) => song.title),
    ["Twinkle Twinkle", "Ode to Joy", "Happy Birthday"],
  );
  const twinkle = songById("twinkle", null);
  assert.equal(twinkle.notes[0]?.midi, 60);
  assert.equal(twinkle.notes.at(-1)?.midi, 60);
  assert.equal(twinkle.notes.length, 42);
  const ode = songById("ode", null);
  assert.equal(ode.notes[0]?.midi, 64);
  assert.equal(ode.notes[12]?.beats, 1.5);
  const birthday = songById("birthday", null);
  assert.equal(birthday.notes.some((note) => note.midi === 72), true);
  assert.equal(birthday.notes.some((note) => note.midi === 70), true);
  for (const song of builtInSongs) {
    assert.ok(song.bpm >= 40 && song.bpm <= 200);
    let previous = -1;
    for (const note of song.notes) {
      assert.ok(note.beats > 0);
      assert.ok(note.midi >= 0 && note.midi <= 127);
      assert.ok(note.startBeat >= previous);
      previous = note.startBeat;
    }
    assert.ok(songSeconds(song.notes, song.bpm) > 5);
  }
  assert.equal(songSeconds(sequenceNotes([{ midi: 60, beats: 1 }]), 60), 1);
  assert.equal(clampTempo(12), 40);
  assert.equal(fileSlug("Twinkle Twinkle"), "twinkle-twinkle");
});

test("midi parser reads notes, tempo, and running status", () => {
  const simple = midiFile(0, [
    [
      0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20,
      0x00, 0x90, 0x3c, 0x64,
      ...vlq(480), 0x80, 0x3c, 0x00,
      ...endTrack(),
    ],
  ]);
  const parsed = parseMidi(simple, "Demo.mid");
  assert.equal(parsed.truncated, false);
  assert.equal(parsed.song.title, "Demo.mid");
  assert.equal(parsed.song.bpm, 120);
  assert.equal(parsed.song.notes.length, 1);
  assert.equal(parsed.song.notes[0]?.midi, 60);
  assert.equal(parsed.song.notes[0]?.startBeat, 0);
  assert.equal(parsed.song.notes[0]?.beats, 1);

  const running = midiFile(0, [
    [
      0x00, 0x90, 0x3c, 0x40,
      ...vlq(480), 0x3c, 0x00,
      0x00, 0x40, 0x40,
      ...vlq(480), 0x40, 0x00,
      ...endTrack(),
    ],
  ]);
  const two = parseMidi(running, "Run");
  assert.deepEqual(
    two.song.notes.map((note) => note.midi),
    [60, 64],
  );
  assert.equal(two.song.notes[1]?.startBeat, 1);

  assert.throws(() => parseMidi(Uint8Array.from([1, 2, 3, 4]), "Bad"), /not a MIDI song/);
  assert.throws(() => parseMidi(midiFile(2, [[...endTrack()]]), "Fmt"), /format this page cannot read/);
  assert.throws(() => parseMidi(midiFile(0, [[...endTrack()]]), "Empty"), /no notes/);
});

test("wav file starts with a RIFF header", () => {
  const wav = encodeWav(44100, [Float32Array.from([0, 0.5, -1])]);
  assert.equal(String.fromCharCode(...wav.subarray(0, 4)), "RIFF");
  assert.equal(String.fromCharCode(...wav.subarray(8, 12)), "WAVE");
  assert.equal(wav.length, 44 + 6);
  const view = new DataView(wav.buffer, wav.byteOffset, wav.byteLength);
  assert.equal(view.getInt16(46, true), 16384);
  assert.equal(view.getInt16(48, true), -32768);
});

function clip(midi: number, first = 0.4): VoiceClip {
  const samples = new Float32Array(16);
  samples[0] = first;
  return { midi, hz: midiToHz(midi), sampleRate: 44100, samples };
}
