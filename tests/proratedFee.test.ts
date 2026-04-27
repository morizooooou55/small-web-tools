import assert from "node:assert/strict";
import { calculateProratedFee, getDaysInMonth } from "../lib/tools/proratedFee.ts";

const tests: Array<[string, () => void]> = [];

function test(name: string, fn: () => void) {
  tests.push([name, fn]);
}

test("calculates the full amount for a 31-day month", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "31000",
      targetMonth: "2026-01",
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, true);
    if (calculation.ok) {
      assert.equal(calculation.result.proratedAmount, 31000);
      assert.equal(calculation.result.targetDays, 31);
    }
});

test("calculates a partial period in a 30-day month", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "30000",
      targetMonth: "2026-04",
      startDate: "2026-04-10",
      endDate: "2026-04-20",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, true);
    if (calculation.ok) {
      assert.equal(calculation.result.proratedAmount, 11000);
      assert.equal(calculation.result.targetDays, 11);
    }
});

test("supports February in common years", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "28000",
      targetMonth: "2025-02",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, true);
    if (calculation.ok) {
      assert.equal(calculation.result.daysInMonth, 28);
      assert.equal(calculation.result.proratedAmount, 28000);
    }
});

test("supports leap years", () => {
    assert.equal(getDaysInMonth(2024, 2), 29);

    const calculation = calculateProratedFee({
      monthlyFee: "29000",
      targetMonth: "2024-02",
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, true);
    if (calculation.ok) {
      assert.equal(calculation.result.proratedAmount, 29000);
    }
});

test("counts the same start and end date as one day", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "31000",
      targetMonth: "2026-01",
      startDate: "2026-01-15",
      endDate: "2026-01-15",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, true);
    if (calculation.ok) {
      assert.equal(calculation.result.proratedAmount, 1000);
      assert.equal(calculation.result.targetDays, 1);
    }
});

test("applies rounding modes", () => {
    const base = {
      monthlyFee: "10000",
      targetMonth: "2026-01",
      startDate: "2026-01-01",
      endDate: "2026-01-01",
    };

    const rounded = calculateProratedFee({ ...base, roundingMode: "round" });
    const ceiled = calculateProratedFee({ ...base, roundingMode: "ceil" });
    const floored = calculateProratedFee({ ...base, roundingMode: "floor" });

    assert.equal(rounded.ok && rounded.result.proratedAmount, 323);
    assert.equal(ceiled.ok && ceiled.result.proratedAmount, 323);
    assert.equal(floored.ok && floored.result.proratedAmount, 322);
});

test("returns validation errors for invalid values", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "0",
      targetMonth: "2026-04",
      startDate: "2026-04-20",
      endDate: "2026-04-10",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, false);
    assert.ok(calculation.errors.monthlyFee);
    assert.ok(calculation.errors.endDate);
});

test("rejects dates outside the target month", () => {
    const calculation = calculateProratedFee({
      monthlyFee: "30000",
      targetMonth: "2026-04",
      startDate: "2026-03-31",
      endDate: "2026-04-10",
      roundingMode: "round",
    });

    assert.equal(calculation.ok, false);
    assert.ok(calculation.errors.startDate);
});

let passed = 0;

for (const [name, fn] of tests) {
  fn();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

console.log(`${passed} tests passed`);
