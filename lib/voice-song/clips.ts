export type VoiceClip = {
  midi: number;
  hz: number;
  sampleRate: number;
  samples: Float32Array;
};

export function normalizePeak(samples: Float32Array, peakTarget = 0.9): Float32Array {
  let peak = 0;
  for (let i = 0; i < samples.length; i += 1) peak = Math.max(peak, Math.abs(samples[i]));
  if (peak < 0.001 || peak >= peakTarget) return samples;
  const gain = peakTarget / peak;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i += 1) out[i] = samples[i] * gain;
  return out;
}

export function upsertClip(clips: VoiceClip[], clip: VoiceClip): VoiceClip[] {
  return [...clips.filter((item) => item.midi !== clip.midi), clip].sort((a, b) => a.midi - b.midi);
}

export function mergeClips(stored: VoiceClip[], current: VoiceClip[]): VoiceClip[] {
  const map = new Map<number, VoiceClip>();
  for (const clip of stored) map.set(clip.midi, clip);
  for (const clip of current) map.set(clip.midi, clip);
  return [...map.values()].sort((a, b) => a.midi - b.midi);
}

export function nearestClip(clips: readonly VoiceClip[], midi: number): VoiceClip | null {
  let best: VoiceClip | null = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const clip of clips) {
    if (clip.samples.length < 8 || clip.sampleRate <= 0) continue;
    const dist = Math.abs(clip.midi - midi);
    if (!best || dist < bestDist || (dist === bestDist && clip.midi < best.midi)) {
      best = clip;
      bestDist = dist;
    }
  }
  return best;
}

export function pitchRate(fromMidi: number, toMidi: number): number {
  return 2 ** ((toMidi - fromMidi) / 12);
}

export function asClip(value: unknown): VoiceClip | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<VoiceClip>;
  if (typeof row.midi !== "number" || typeof row.sampleRate !== "number" || row.sampleRate <= 0) return null;
  if (!(row.samples instanceof Float32Array) || row.samples.length < 8) return null;
  const hz = typeof row.hz === "number" && row.hz > 0 ? row.hz : 440 * 2 ** ((row.midi - 69) / 12);
  return { midi: row.midi, hz, sampleRate: row.sampleRate, samples: row.samples };
}
