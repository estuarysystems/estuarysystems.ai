export type ScheduledNote = {
  midi: number;
  startBeat: number;
  beats: number;
};

export type Song = {
  id: string;
  title: string;
  bpm: number;
  notes: ScheduledNote[];
};

export const MIN_TEMPO = 40;
export const MAX_TEMPO = 200;

export function clampTempo(bpm: number): number {
  if (!Number.isFinite(bpm)) return 100;
  return Math.min(MAX_TEMPO, Math.max(MIN_TEMPO, Math.round(bpm)));
}

export function sequenceNotes(steps: readonly { midi: number; beats: number }[]): ScheduledNote[] {
  let startBeat = 0;
  return steps.map((step) => {
    const note = { midi: step.midi, startBeat, beats: step.beats };
    startBeat += step.beats;
    return note;
  });
}

export function songSeconds(notes: readonly ScheduledNote[], bpm: number): number {
  const safeTempo = bpm > 0 ? bpm : 100;
  const endBeat = notes.reduce((max, note) => Math.max(max, note.startBeat + note.beats), 0);
  return (endBeat * 60) / safeTempo;
}

export function fileSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "song";
}

const twinkle = sequenceNotes([
  { midi: 60, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 69, beats: 1 },
  { midi: 69, beats: 1 },
  { midi: 67, beats: 2 },
  { midi: 65, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 2 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 2 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 2 },
  { midi: 60, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 69, beats: 1 },
  { midi: 69, beats: 1 },
  { midi: 67, beats: 2 },
  { midi: 65, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 2 },
]);

const ode = sequenceNotes([
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1.5 },
  { midi: 62, beats: 0.5 },
  { midi: 62, beats: 2 },
  { midi: 64, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 62, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 1.5 },
  { midi: 60, beats: 0.5 },
  { midi: 60, beats: 2 },
]);

const birthday = sequenceNotes([
  { midi: 60, beats: 0.75 },
  { midi: 60, beats: 0.25 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 2 },
  { midi: 60, beats: 0.75 },
  { midi: 60, beats: 0.25 },
  { midi: 62, beats: 1 },
  { midi: 60, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 2 },
  { midi: 60, beats: 0.75 },
  { midi: 60, beats: 0.25 },
  { midi: 72, beats: 1 },
  { midi: 69, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 64, beats: 1 },
  { midi: 62, beats: 2 },
  { midi: 70, beats: 0.75 },
  { midi: 70, beats: 0.25 },
  { midi: 69, beats: 1 },
  { midi: 65, beats: 1 },
  { midi: 67, beats: 1 },
  { midi: 65, beats: 2 },
]);

export const builtInSongs: readonly Song[] = [
  { id: "twinkle", title: "Twinkle Twinkle", bpm: 100, notes: twinkle },
  { id: "ode", title: "Ode to Joy", bpm: 112, notes: ode },
  { id: "birthday", title: "Happy Birthday", bpm: 100, notes: birthday },
];

export function songById(id: string, custom: Song | null): Song {
  if (id === "upload" && custom) return custom;
  return builtInSongs.find((song) => song.id === id) ?? builtInSongs[0];
}
