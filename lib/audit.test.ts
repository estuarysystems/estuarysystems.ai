import assert from "node:assert/strict";
import test from "node:test";
import {
  AI_SAVINGS_SHARE,
  DEFAULT_HOURLY_WAGE,
  rankByHours,
  savingsSentence,
  spendSentence,
  tallyTasks,
  taskHoursPerWeek,
  taskHoursPerYear,
} from "./audit.ts";

test("1 hour each day is 260 hours a year and 6.5 work weeks", () => {
  const task = { minutes: 60, count: 1, cadence: "day" as const };
  assert.equal(taskHoursPerWeek(task), 5);
  assert.equal(taskHoursPerYear(task), 260);

  const tally = tallyTasks([task], DEFAULT_HOURLY_WAGE);
  assert.equal(tally.hoursPerWeek, 5);
  assert.equal(tally.hoursPerYear, 260);
  assert.equal(tally.workWeeksPerYear, 6.5);
  assert.equal(tally.dollarsPerYear, 7800);
  assert.equal(
    spendSentence(tally.hoursPerYear, tally.workWeeksPerYear),
    "You spend about 260 hours a year on this. That is about 6.5 work weeks.",
  );
});

test("80% AI savings is an estimate on the same year", () => {
  const tally = tallyTasks([{ minutes: 60, count: 1, cadence: "day" }], DEFAULT_HOURLY_WAGE);
  assert.equal(AI_SAVINGS_SHARE, 0.8);
  assert.equal(tally.savedHoursPerYear, 208);
  assert.equal(tally.savedWorkWeeksPerYear, 5.2);
  assert.equal(tally.savedDollarsPerYear, 6240);
  assert.equal(
    savingsSentence(tally.savedHoursPerYear, tally.savedWorkWeeksPerYear, tally.savedDollarsPerYear),
    "AI can give back about 208 hours a year. That is about 5.2 work weeks. That is about $6,240 a year. This is an estimate.",
  );
});

test("week, month, and a blank wage", () => {
  assert.equal(taskHoursPerYear({ minutes: 60, count: 1, cadence: "week" }), 52);
  assert.equal(taskHoursPerWeek({ minutes: 60, count: 1, cadence: "week" }), 1);
  assert.equal(taskHoursPerYear({ minutes: 60, count: 1, cadence: "month" }), 12);
  assert.equal(taskHoursPerYear({ minutes: 30, count: 2, cadence: "month" }), 12);

  const tally = tallyTasks([{ minutes: 60, count: 1, cadence: "week" }], null);
  assert.equal(tally.hoursPerYear, 52);
  assert.equal(tally.workWeeksPerYear, 1.3);
  assert.equal(tally.dollarsPerYear, null);
  assert.equal(tally.savedDollarsPerYear, null);
  assert.equal(
    savingsSentence(tally.savedHoursPerYear, tally.savedWorkWeeksPerYear, null),
    "AI can give back about 41.6 hours a year. That is about 1 work week. This is an estimate.",
  );
});

test("default 10 minutes once a week, and bad numbers count as zero", () => {
  assert.equal(taskHoursPerYear({ minutes: 10, count: 1, cadence: "week" }), 52 / 6);
  assert.equal(taskHoursPerYear({ minutes: -5, count: 4, cadence: "day" }), 0);
  assert.equal(taskHoursPerYear({ minutes: 10, count: Number.NaN, cadence: "week" }), 0);
  assert.equal(taskHoursPerYear({ minutes: Number.POSITIVE_INFINITY, count: 1, cadence: "day" }), 0);

  const tally = tallyTasks([], 30);
  assert.equal(tally.hoursPerYear, 0);
  assert.equal(tally.savedHoursPerYear, 0);
  assert.equal(tally.dollarsPerYear, 0);
});

test("tasks add up, and the breakdown lists the biggest first", () => {
  const tasks = [
    { id: "small", label: "Reports", minutes: 10, count: 1, cadence: "week" as const },
    { id: "big", label: "Invoices", minutes: 60, count: 1, cadence: "day" as const },
    { id: "tie-b", label: "Scheduling", minutes: 30, count: 1, cadence: "week" as const },
    { id: "tie-a", label: "Follow-up emails", minutes: 30, count: 1, cadence: "week" as const },
  ];
  const tally = tallyTasks(tasks, 0);
  assert.equal(tally.hoursPerYear, 260 + 52 / 6 + 26 + 26);
  assert.equal(tally.dollarsPerYear, 0);

  const ranked = rankByHours(tasks);
  assert.deepEqual(
    ranked.map((task) => task.label),
    ["Invoices", "Follow-up emails", "Scheduling", "Reports"],
  );
  assert.equal(ranked[0].hoursPerYear, 260);
});
