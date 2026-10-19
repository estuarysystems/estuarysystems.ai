export const AUDIT_TITLE = "Intake time";

export const AUDIT_INTRO =
  "Select the intake tasks your staff do. Enter the minutes and the count. See the hours.";

export const CUSTOM_GROUP_TITLE = "Other tasks";

export const BOOK_CALL_LABEL = "Book a call";

/** 5 work days each week. 52 weeks each year. 40 hours is 1 work week. */
export const DAYS_PER_WEEK = 5;
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;
export const HOURS_PER_WORK_WEEK = 40;

/** Share of hand work the estimate says AI can take. */
export const AI_SAVINGS_SHARE = 0.8;

export const DEFAULT_MINUTES = 10;
export const DEFAULT_COUNT = 1;
export const DEFAULT_HOURLY_WAGE = 30;

export type Cadence = "day" | "week" | "month";

export type TaskDraft = {
  minutes: number;
  count: number;
  cadence: Cadence;
};

export const auditGroups = [
  {
    id: "calls",
    title: "Calls and intake",
    tasks: [
      { id: "answer-calls", label: "Answer a new call" },
      { id: "intake-notes", label: "Write intake notes" },
      { id: "send-portal", label: "Send the intake portal link" },
      { id: "book-consult", label: "Book a consult" },
    ],
  },
  {
    id: "documents",
    title: "Documents and follow-up",
    tasks: [
      { id: "follow-up", label: "Follow up with a lead" },
      { id: "save-documents", label: "Save photos and reports" },
      { id: "case-system", label: "Move data into the case management system" },
      { id: "draft", label: "Prepare a document draft" },
    ],
  },
] as const;

export const cadenceOptions: { value: Cadence; label: string }[] = [
  { value: "day", label: "Each day" },
  { value: "week", label: "Each week" },
  { value: "month", label: "Each month" },
];

function nonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

/** Hours in a year for one task. Day uses 5 days × 52 weeks. Month uses 12 months. */
export function taskHoursPerYear(task: TaskDraft): number {
  const hoursEach = nonNegative(task.minutes) / 60;
  const count = nonNegative(task.count);
  if (task.cadence === "day") return hoursEach * count * DAYS_PER_WEEK * WEEKS_PER_YEAR;
  if (task.cadence === "week") return hoursEach * count * WEEKS_PER_YEAR;
  if (task.cadence === "month") return hoursEach * count * MONTHS_PER_YEAR;
  return 0;
}

export function taskHoursPerWeek(task: TaskDraft): number {
  return taskHoursPerYear(task) / WEEKS_PER_YEAR;
}

export type Tally = {
  hoursPerWeek: number;
  hoursPerYear: number;
  workWeeksPerYear: number;
  dollarsPerYear: number | null;
  savedHoursPerYear: number;
  savedWorkWeeksPerYear: number;
  savedDollarsPerYear: number | null;
};

export function tallyTasks(tasks: TaskDraft[], hourlyWage: number | null): Tally {
  const hoursPerYear = tasks.reduce((sum, task) => sum + taskHoursPerYear(task), 0);
  const hoursPerWeek = hoursPerYear / WEEKS_PER_YEAR;
  const workWeeksPerYear = hoursPerYear / HOURS_PER_WORK_WEEK;
  const wage = hourlyWage === null ? null : nonNegative(hourlyWage);
  const dollarsPerYear = wage === null ? null : hoursPerYear * wage;

  return {
    hoursPerWeek,
    hoursPerYear,
    workWeeksPerYear,
    dollarsPerYear,
    savedHoursPerYear: hoursPerYear * AI_SAVINGS_SHARE,
    savedWorkWeeksPerYear: workWeeksPerYear * AI_SAVINGS_SHARE,
    savedDollarsPerYear: dollarsPerYear === null ? null : dollarsPerYear * AI_SAVINGS_SHARE,
  };
}

export type RankedTask = {
  id: string;
  label: string;
  hoursPerYear: number;
};

export function rankByHours(
  tasks: Array<TaskDraft & { id: string; label: string }>,
): RankedTask[] {
  return tasks
    .map((task) => ({
      id: task.id,
      label: task.label,
      hoursPerYear: taskHoursPerYear(task),
    }))
    .sort((a, b) => b.hoursPerYear - a.hoursPerYear || a.label.localeCompare(b.label));
}

export function formatCount(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "0";
  const factor = 10 ** digits;
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(digits);
}

export function formatAuditUsd(amount: number): string {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

function hoursPhrase(value: number): string {
  const text = formatCount(value);
  return text === "1" ? "1 hour" : `${text} hours`;
}

function workWeeksPhrase(value: number): string {
  const text = formatCount(value);
  return text === "1" ? "1 work week" : `${text} work weeks`;
}

export function spendSentence(hoursPerYear: number, workWeeks: number): string {
  return `You spend about ${hoursPhrase(hoursPerYear)} a year on this. That is about ${workWeeksPhrase(workWeeks)}.`;
}

export function savingsSentence(
  savedHours: number,
  savedWeeks: number,
  savedDollars: number | null,
): string {
  const time = `AI can give back about ${hoursPhrase(savedHours)} a year. That is about ${workWeeksPhrase(savedWeeks)}.`;
  if (savedDollars === null) return `${time} This is an estimate.`;
  return `${time} That is about ${formatAuditUsd(savedDollars)} a year. This is an estimate.`;
}
