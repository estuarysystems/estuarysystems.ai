/**
 * Recurring retainer is banded on each weekly hour, then billed monthly
 * at about four weeks.
 *
 * Hours 1–4 of H: $200 each.
 * Hours 5–10: $175 each.
 * Hours 11–20: $150 each.
 *
 * 2 hr/wk → 2×200 = $400/wk → $1,600/mo.
 * 10 hr/wk → 4×200 + 6×175 = $1,850/wk → $7,400/mo.
 * 20 hr/wk → that ten-hour total + 10×150 = $3,350/wk → $13,400/mo.
 */
const HOUR_BANDS = [
  { through: 4, rate: 200 },
  { through: 10, rate: 175 },
  { through: 20, rate: 150 },
] as const;

export const ADVISORY_MONTHLY = 500;
export const RETAINER_HOURS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] as const;
export const RECURRING_MAX = RETAINER_HOURS.length;

export function weeklyDollars(hours: number) {
  if (!Number.isInteger(hours) || hours < 1 || hours > 20) {
    throw new Error(`Weekly hours must be an integer from 1 to 20, got ${hours}`);
  }

  let total = 0;
  for (let hour = 1; hour <= hours; hour += 1) {
    const band = HOUR_BANDS.find((item) => hour <= item.through);
    if (!band) throw new Error(`No rate for hour ${hour}`);
    total += band.rate;
  }
  return total;
}

export function monthlyDollars(hours: number) {
  return weeklyDollars(hours) * 4;
}

export function blendedHourly(hours: number) {
  return weeklyDollars(hours) / hours;
}

export function formatUsd(amount: number) {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

export type RecurringStop = {
  label: string;
  monthly: number;
  detail: string;
  blended: string | null;
  mailtoSubject: string;
  valueText: string;
};

export function recurringStop(index: number): RecurringStop {
  if (index <= 0) {
    const monthly = formatUsd(ADVISORY_MONTHLY);
    return {
      label: "Advisory",
      monthly: ADVISORY_MONTHLY,
      detail: "Two working sessions a month.",
      blended: null,
      mailtoSubject: "Advisory",
      valueText: `Advisory, ${monthly} per month, two working sessions a month`,
    };
  }

  const hours = RETAINER_HOURS[Math.min(index, RETAINER_HOURS.length) - 1];
  const monthly = monthlyDollars(hours);
  const blended = formatUsd(blendedHourly(hours));
  const price = formatUsd(monthly);
  return {
    label: "Long-term retainer",
    monthly,
    detail: `${hours} hours / week`,
    blended: `Blended ${blended} / hour`,
    mailtoSubject: `Long-term retainer, ${hours} hours / week`,
    valueText: `Long-term retainer, ${price} per month, ${hours} hours per week, blended ${blended} per hour`,
  };
}

export const oneTimeOffers = [
  {
    id: "fixed-scope-project",
    heading: "Fixed-scope project",
    line: "A defined SI build with a clear finish line. Not ongoing advisory.",
    mailtoSubject: "Project specs",
  },
  {
    id: "si-employee-install",
    heading: "SI employee install",
    line: "Bots with prompts.",
    mailtoSubject: "SI employee install",
  },
  {
    id: "si-training",
    heading: "SI training",
    line: "SI know-how for you and your top people.",
    mailtoSubject: "SI training",
  },
] as const;

export const offersPage = {
  title: "Offers",
  description:
    "Recurring advisory at $500 / month, or a long-term retainer priced from weekly hours. One-time fixed-scope project, SI employee install, or SI training.",
} as const;

function assertPricing() {
  const expected: Record<number, number> = {
    2: 1600,
    4: 3200,
    6: 4600,
    10: 7400,
    20: 13400,
  };
  for (const [hours, monthly] of Object.entries(expected)) {
    const got = monthlyDollars(Number(hours));
    if (got !== monthly) {
      throw new Error(`${hours} hr/wk should be $${monthly}/mo, got $${got}`);
    }
  }
  if (blendedHourly(2) !== 200 || blendedHourly(10) !== 185 || blendedHourly(20) !== 167.5) {
    throw new Error("Blended hourly rates drifted from the hour bands");
  }
}

assertPricing();
