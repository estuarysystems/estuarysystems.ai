"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  AI_SAVINGS_SHARE,
  BOOK_CALL_LABEL,
  CUSTOM_GROUP_TITLE,
  DEFAULT_COUNT,
  DEFAULT_HOURLY_WAGE,
  DEFAULT_MINUTES,
  auditGroups,
  cadenceOptions,
  formatAuditUsd,
  formatCount,
  rankByHours,
  savingsSentence,
  spendSentence,
  tallyTasks,
  type Cadence,
  type TaskDraft,
} from "@/lib/audit";

type TaskFields = {
  selected: boolean;
  minutes: string;
  count: string;
  cadence: Cadence;
};

type CustomTask = TaskFields & {
  id: string;
  label: string;
};

const emptyFields = (): TaskFields => ({
  selected: false,
  minutes: String(DEFAULT_MINUTES),
  count: String(DEFAULT_COUNT),
  cadence: "week",
});

function readNumber(value: string): number {
  const trimmed = value.trim();
  if (trimmed === "") return 0;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
}

function readWage(value: string): number | null {
  if (value.trim() === "") return null;
  return readNumber(value);
}

function draftFromFields(fields: TaskFields): TaskDraft {
  return {
    minutes: readNumber(fields.minutes),
    count: readNumber(fields.count),
    cadence: fields.cadence,
  };
}

export function AuditCalculator({ scheduleHref }: { scheduleHref: string }) {
  const wageId = useId();
  const customNameId = useId();
  const [presets, setPresets] = useState<Record<string, TaskFields>>({});
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([]);
  const [customName, setCustomName] = useState("");
  const [wage, setWage] = useState(String(DEFAULT_HOURLY_WAGE));

  function fieldsFor(id: string): TaskFields {
    return presets[id] ?? emptyFields();
  }

  function updatePreset(id: string, patch: Partial<TaskFields>) {
    setPresets((current) => ({
      ...current,
      [id]: { ...emptyFields(), ...current[id], ...patch },
    }));
  }

  function addCustomTask(name: string) {
    const label = name.trim();
    if (!label) return;
    setCustomTasks((current) => [
      ...current,
      {
        id: `custom-${crypto.randomUUID()}`,
        label,
        selected: true,
        minutes: String(DEFAULT_MINUTES),
        count: String(DEFAULT_COUNT),
        cadence: "week",
      },
    ]);
    setCustomName("");
  }

  const selected = [
    ...auditGroups.flatMap((group) =>
      group.tasks.flatMap((task) => {
        const fields = presets[task.id];
        if (!fields?.selected) return [];
        return [{ id: task.id, label: task.label, ...draftFromFields(fields) }];
      }),
    ),
    ...customTasks.flatMap((task) => {
      if (!task.selected) return [];
      return [{ id: task.id, label: task.label, ...draftFromFields(task) }];
    }),
  ];

  const hourlyWage = readWage(wage);
  const tally = tallyTasks(selected, hourlyWage);
  const ranked = rankByHours(selected);
  const hasSelection = selected.length > 0;
  const savingsPercent = Math.round(AI_SAVINGS_SHARE * 100);

  return (
    <>
    <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)] lg:gap-12">
      <div className="min-w-0 space-y-8">
        {auditGroups.map((group) => (
          <section key={group.id} className="min-w-0 border border-line bg-slot" aria-labelledby={`${group.id}-heading`}>
            <h2
              id={`${group.id}-heading`}
              className="px-5 pt-6 text-2xl font-medium tracking-tight md:px-6 md:text-3xl"
            >
              {group.title}
            </h2>
            <ul className="mt-4 divide-y divide-line border-t border-line">
              {group.tasks.map((task) => (
                <li key={task.id}>
                  <TaskEditor
                    id={task.id}
                    label={task.label}
                    fields={fieldsFor(task.id)}
                    onChange={(patch) => updatePreset(task.id, patch)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="min-w-0 border border-line bg-slot" aria-labelledby="custom-heading">
          <h2
            id="custom-heading"
            className="px-5 pt-6 text-2xl font-medium tracking-tight md:px-6 md:text-3xl"
          >
            {CUSTOM_GROUP_TITLE}
          </h2>
          <p className="px-5 pt-3 text-sm leading-relaxed text-muted md:px-6">
            Add a task that is not in the lists above.
          </p>
          <form
            className="flex flex-col gap-3 px-5 py-5 sm:flex-row md:px-6"
            onSubmit={(event) => {
              event.preventDefault();
              addCustomTask(customName);
            }}
          >
            <label htmlFor={customNameId} className="sr-only">
              Task name
            </label>
            <input
              id={customNameId}
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
              placeholder="Task name"
              autoComplete="off"
              className="min-h-12 w-full border border-line bg-paper px-4 text-base text-ink"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 shrink-0 items-center justify-center border border-ink px-5 text-sm font-medium text-ink hover:bg-ink hover:text-paper"
            >
              Add task
            </button>
          </form>
          {customTasks.length > 0 ? (
            <ul className="divide-y divide-line border-t border-line">
              {customTasks.map((task) => (
                <li key={task.id}>
                  <TaskEditor
                    id={task.id}
                    label={task.label}
                    fields={task}
                    onChange={(patch) =>
                      setCustomTasks((current) =>
                        current.map((item) => (item.id === task.id ? { ...item, ...patch } : item)),
                      )
                    }
                    onRemove={() =>
                      setCustomTasks((current) => current.filter((item) => item.id !== task.id))
                    }
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      <aside className="min-w-0 lg:sticky lg:top-24">
        <section className="border border-line bg-slot px-5 py-6 md:px-6 md:py-8" aria-labelledby="tally-heading">
          <h2
            id="tally-heading"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            Your time
          </h2>
          <div className="mt-5" aria-live="polite" aria-atomic="true">
            {hasSelection ? (
              <>
                <p className="text-lg leading-relaxed">
                  {spendSentence(tally.hoursPerYear, tally.workWeeksPerYear)}
                </p>
                <p className="mt-3 text-lg leading-relaxed">
                  {savingsSentence(
                    tally.savedHoursPerYear,
                    tally.savedWorkWeeksPerYear,
                    tally.savedDollarsPerYear,
                  )}
                </p>
              </>
            ) : (
              <p className="text-lg leading-relaxed text-muted">Select a task. The hours show here.</p>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={scheduleHref}
              className="inline-flex min-h-12 w-full items-center justify-center bg-signal px-6 py-3 text-center text-sm font-medium text-paper no-underline hover:bg-ink"
            >
              {BOOK_CALL_LABEL}
            </Link>
            <p className="mt-3 text-sm text-muted">We can look at these tasks with you.</p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
            <Stat label="Hours each week" value={formatCount(tally.hoursPerWeek)} />
            <Stat label="Hours each year" value={formatCount(tally.hoursPerYear)} />
            <Stat label="Work weeks each year" value={formatCount(tally.workWeeksPerYear)} />
            <Stat
              label="Dollars each year"
              value={tally.dollarsPerYear === null ? "—" : formatAuditUsd(tally.dollarsPerYear)}
            />
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            We use 5 days each week and 52 weeks each year. 40 hours is 1 work week.
          </p>

          <div className="mt-6 border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Estimate · {savingsPercent}% savings
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              <Stat label="Hours you can get back" value={formatCount(tally.savedHoursPerYear)} />
              <Stat
                label="Dollars you can get back"
                value={
                  tally.savedDollarsPerYear === null
                    ? "—"
                    : formatAuditUsd(tally.savedDollarsPerYear)
                }
              />
            </dl>
          </div>

          <div className="mt-6">
            <label htmlFor={wageId} className="block text-sm font-medium">
              Pay per hour ($)
            </label>
            <input
              id={wageId}
              inputMode="decimal"
              min={0}
              step="0.01"
              value={wage}
              onChange={(event) => setWage(event.target.value)}
              className="mt-2 min-h-12 w-full border border-line bg-paper px-4 text-base text-ink tabular-nums"
            />
            <p className="mt-2 text-sm text-muted">Optional. Clear this to hide the dollars.</p>
          </div>
        </section>

        <section className="mt-6 border border-line px-5 py-6 md:px-6" aria-labelledby="breakdown-heading">
          <h2 id="breakdown-heading" className="text-xl font-medium tracking-tight">
            Time by task
          </h2>
          {ranked.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Select a task to see the list.</p>
          ) : (
            <ol className="mt-4 space-y-3">
              {ranked.map((task, index) => (
                <li key={task.id} className="flex items-baseline justify-between gap-4 text-sm">
                  <span>
                    <span className="font-mono text-muted">{index + 1}. </span>
                    {task.label}
                  </span>
                  <span className="shrink-0 text-right tabular-nums">
                    {formatCount(task.hoursPerYear)} hours a year
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </aside>
    </div>
    <p
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 py-3 text-sm backdrop-blur lg:hidden"
      aria-hidden="true"
    >
      {hasSelection ? `About ${formatCount(tally.hoursPerYear)} hours a year` : "Select a task"}
    </p>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm leading-snug text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-medium tracking-tight tabular-nums">{value}</dd>
    </div>
  );
}

function TaskEditor({
  id,
  label,
  fields,
  onChange,
  onRemove,
}: {
  id: string;
  label: string;
  fields: TaskFields;
  onChange: (patch: Partial<TaskFields>) => void;
  onRemove?: () => void;
}) {
  const minutesId = `${id}-minutes`;
  const countId = `${id}-count`;
  const cadenceName = `${id}-cadence`;

  return (
    <div className="px-5 py-4 md:px-6">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={fields.selected}
          onChange={(event) => onChange({ selected: event.target.checked })}
          className="mt-1 size-5 shrink-0 accent-signal"
        />
        <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer text-base leading-snug">
          {label}
        </label>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
            className="min-h-11 shrink-0 px-1 text-sm text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Remove
          </button>
        ) : null}
      </div>

      {fields.selected ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={minutesId} className="block text-sm text-muted">
              Minutes each time
            </label>
            <input
              id={minutesId}
              inputMode="decimal"
              min={0}
              step="1"
              value={fields.minutes}
              onChange={(event) => onChange({ minutes: event.target.value })}
              className="mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink tabular-nums"
            />
          </div>
          <div>
            <label htmlFor={countId} className="block text-sm text-muted">
              How many
            </label>
            <input
              id={countId}
              inputMode="numeric"
              min={0}
              step="1"
              value={fields.count}
              onChange={(event) => onChange({ count: event.target.value })}
              className="mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink tabular-nums"
            />
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm text-muted">How often</legend>
            <div className="mt-2 grid grid-cols-3 border border-line">
              {cadenceOptions.map((option) => {
                const optionId = `${id}-${option.value}`;
                const checked = fields.cadence === option.value;
                return (
                  <label
                    key={option.value}
                    htmlFor={optionId}
                    className={`flex min-h-12 cursor-pointer items-center justify-center border-line px-2 text-center text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-signal ${
                      checked ? "bg-ink text-paper" : "text-ink hover:bg-paper"
                    } ${option.value === "day" ? "" : "border-l"}`}
                  >
                    <input
                      id={optionId}
                      type="radio"
                      name={cadenceName}
                      value={option.value}
                      checked={checked}
                      onChange={() => onChange({ cadence: option.value })}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      ) : null}
    </div>
  );
}
