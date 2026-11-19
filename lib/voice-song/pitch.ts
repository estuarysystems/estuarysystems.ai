const MIN_HZ = 70;
const MAX_HZ = 1100;
const RMS_FLOOR = 0.012;
const YIN_THRESHOLD = 0.15;

export function detectPitch(samples: Float32Array, sampleRate: number): number | null {
  const size = samples.length;
  if (size < 64 || sampleRate <= 0) return null;

  let energy = 0;
  for (let i = 0; i < size; i += 1) energy += samples[i] * samples[i];
  if (Math.sqrt(energy / size) < RMS_FLOOR) return null;

  const maxLag = Math.min(size - 2, Math.floor(sampleRate / MIN_HZ));
  const minLag = Math.max(2, Math.floor(sampleRate / MAX_HZ));
  if (maxLag <= minLag) return null;

  const diff = new Float32Array(maxLag + 1);
  for (let lag = 1; lag <= maxLag; lag += 1) {
    let sum = 0;
    const limit = size - lag;
    for (let i = 0; i < limit; i += 1) {
      const delta = samples[i] - samples[i + lag];
      sum += delta * delta;
    }
    diff[lag] = sum;
  }

  const cmnd = new Float32Array(maxLag + 1);
  cmnd[0] = 1;
  let running = 0;
  for (let lag = 1; lag <= maxLag; lag += 1) {
    running += diff[lag];
    cmnd[lag] = running === 0 ? 1 : (diff[lag] * lag) / running;
  }

  let estimate = -1;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    if (cmnd[lag] >= YIN_THRESHOLD) continue;
    while (lag + 1 <= maxLag && cmnd[lag + 1] < cmnd[lag]) lag += 1;
    estimate = lag;
    break;
  }

  if (estimate < 0) {
    let best = minLag;
    for (let lag = minLag + 1; lag <= maxLag; lag += 1) {
      if (cmnd[lag] < cmnd[best]) best = lag;
    }
    if (cmnd[best] > 0.45) return null;
    estimate = best;
  }

  const tau = refineLag(cmnd, estimate);
  if (tau <= 0) return null;
  const hz = sampleRate / tau;
  if (hz < MIN_HZ || hz > MAX_HZ) return null;
  return hz;
}

function refineLag(cmnd: Float32Array, estimate: number): number {
  const prev = estimate > 0 ? cmnd[estimate - 1] : cmnd[estimate];
  const next = estimate + 1 < cmnd.length ? cmnd[estimate + 1] : cmnd[estimate];
  const denom = 2 * cmnd[estimate] - prev - next;
  if (denom === 0) return estimate;
  const shift = (prev - next) / (2 * denom);
  if (!Number.isFinite(shift) || shift < -1 || shift > 1) return estimate;
  return estimate + shift;
}

export function centsBetween(hz: number, targetHz: number): number {
  if (hz <= 0 || targetHz <= 0) return 0;
  return 1200 * Math.log2(hz / targetHz);
}

export function pitchWord(cents: number | null): string {
  if (cents == null || Number.isNaN(cents)) return "Sing the note.";
  if (Math.abs(cents) <= 35) return "In tune";
  return cents < 0 ? "Too low" : "Too high";
}
