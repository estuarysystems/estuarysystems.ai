import { clampTempo, type ScheduledNote, type Song } from "./songs";

const NOTE_LIMIT = 800;

type RawNote = {
  midi: number;
  startTick: number;
  durationTicks: number;
};

export function parseMidi(data: Uint8Array, title: string): { song: Song; truncated: boolean } {
  if (data.length < 14 || textAt(data, 0, 4) !== "MThd") fail();
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const headerLen = view.getUint32(4);
  if (headerLen < 6 || 8 + headerLen > data.length) fail();
  const format = view.getUint16(8);
  const trackCount = view.getUint16(10);
  const division = view.getInt16(12);
  if (format !== 0 && format !== 1) {
    throw new Error("This MIDI file uses a format this page cannot read.");
  }
  if (division <= 0) {
    throw new Error("This MIDI file uses a time format this page cannot read.");
  }

  let offset = 8 + headerLen;
  const raw: RawNote[] = [];
  let tempo: number | null = null;
  for (let track = 0; track < trackCount; track += 1) {
    if (offset + 8 > data.length || textAt(data, offset, 4) !== "MTrk") fail();
    const length = view.getUint32(offset + 4);
    const start = offset + 8;
    const end = start + length;
    if (end > data.length) fail();
    const parsed = parseTrack(data, start, end, division);
    if (tempo == null && parsed.tempo != null) tempo = parsed.tempo;
    raw.push(...parsed.notes);
    offset = end;
  }

  if (raw.length === 0) throw new Error("This MIDI file has no notes.");
  raw.sort((a, b) => a.startTick - b.startTick || a.midi - b.midi);
  const notes: ScheduledNote[] = raw.map((note) => ({
    midi: note.midi,
    startBeat: note.startTick / division,
    beats: Math.max(note.durationTicks / division, 0.05),
  }));
  const truncated = notes.length > NOTE_LIMIT;
  const bpm = clampTempo(tempo == null ? 120 : 60_000_000 / tempo);
  return {
    truncated,
    song: {
      id: "upload",
      title: title.trim() || "Uploaded song",
      bpm,
      notes: truncated ? notes.slice(0, NOTE_LIMIT) : notes,
    },
  };
}

function parseTrack(
  data: Uint8Array,
  start: number,
  end: number,
  ppq: number,
): { notes: RawNote[]; tempo: number | null } {
  let offset = start;
  let tick = 0;
  let running: number | null = null;
  let tempo: number | null = null;
  const open = new Map<number, number[]>();
  const notes: RawNote[] = [];

  const readByte = () => {
    if (offset >= end) fail();
    const value = data[offset];
    offset += 1;
    return value;
  };

  const readVar = () => {
    let value = 0;
    for (let i = 0; i < 4; i += 1) {
      const byte = readByte();
      value = (value << 7) | (byte & 0x7f);
      if ((byte & 0x80) === 0) return value;
    }
    fail();
  };

  while (offset < end) {
    tick += readVar();
    let status = readByte();
    if (status < 0x80) {
      if (running == null) fail();
      offset -= 1;
      status = running;
    }

    if (status === 0xff) {
      running = null;
      const type = readByte();
      const length = readVar();
      if (offset + length > end) fail();
      if (type === 0x51 && length === 3) {
        tempo = (data[offset] << 16) | (data[offset + 1] << 8) | data[offset + 2];
      }
      offset += length;
      continue;
    }

    if (status === 0xf0 || status === 0xf7) {
      running = null;
      const length = readVar();
      if (offset + length > end) fail();
      offset += length;
      continue;
    }

    if (status >= 0xf0) fail();

    running = status;
    const kind = status & 0xf0;
    const channel = status & 0x0f;
    if (kind === 0xc0 || kind === 0xd0) {
      readByte();
      continue;
    }
    const data1 = readByte();
    const data2 = readByte();
    if (channel === 9) continue;
    if (kind !== 0x80 && kind !== 0x90) continue;
    const key = channel * 128 + data1;
    const noteOff = kind === 0x80 || data2 === 0;
    if (!noteOff) {
      const stack = open.get(key) ?? [];
      stack.push(tick);
      open.set(key, stack);
      continue;
    }
    const stack = open.get(key);
    const startTick = stack?.pop();
    if (startTick == null) continue;
    notes.push({
      midi: data1,
      startTick,
      durationTicks: Math.max(1, tick - startTick),
    });
  }

  for (const [key, stack] of open) {
    const midi = key % 128;
    for (const startTick of stack) {
      notes.push({ midi, startTick, durationTicks: ppq });
    }
  }

  return { notes, tempo };
}

function textAt(data: Uint8Array, offset: number, length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) out += String.fromCharCode(data[offset + i] ?? 0);
  return out;
}

function fail(): never {
  throw new Error("This file is not a MIDI song.");
}
