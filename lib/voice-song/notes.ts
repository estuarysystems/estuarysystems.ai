export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export const DEFAULT_RANGE_START = 60;
export const DEFAULT_RANGE_END = 72;
export const RANGE_FLOOR = 48;
export const RANGE_CEILING = 84;
export const MAX_RANGE_SPAN = 24;

export type NoteTone = {
  midi: number;
  name: string;
  hz: number;
};

export function midiToName(midi: number): string {
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function midiToHz(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function formatHz(hz: number): string {
  return `${hz.toFixed(1)} Hz`;
}

export function clampRange(start: number, end: number): { start: number; end: number } {
  const safeStart = Math.min(Math.max(Math.round(start), RANGE_FLOOR), DEFAULT_RANGE_END);
  const highCap = Math.min(RANGE_CEILING, safeStart + MAX_RANGE_SPAN);
  const safeEnd = Math.min(Math.max(Math.round(end), safeStart), highCap);
  return { start: safeStart, end: safeEnd };
}

export function notesInRange(start: number, end: number): NoteTone[] {
  const range = clampRange(start, end);
  const notes: NoteTone[] = [];
  for (let midi = range.start; midi <= range.end; midi += 1) {
    notes.push({ midi, name: midiToName(midi), hz: midiToHz(midi) });
  }
  return notes;
}

export function startNoteChoices(): number[] {
  const notes: number[] = [];
  for (let midi = RANGE_FLOOR; midi <= DEFAULT_RANGE_END; midi += 1) notes.push(midi);
  return notes;
}

export function endNoteChoices(start: number): number[] {
  const range = clampRange(start, start);
  const last = Math.min(RANGE_CEILING, range.start + MAX_RANGE_SPAN);
  const notes: number[] = [];
  for (let midi = range.start; midi <= last; midi += 1) notes.push(midi);
  return notes;
}
