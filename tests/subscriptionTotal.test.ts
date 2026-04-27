import assert from "node:assert/strict";
import {
  calculateSubscriptionTotal,
  convertToMonthlyAmount,
} from "../lib/tools/subscriptionTotal.ts";

const tests: Array<[string, () => void]> = [];

function test(name: string, fn: () => void) {
  tests.push([name, fn]);
}

test("calculates monthly and annual totals", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "動画サービス",
        amount: "1000",
        billingCycle: "monthly",
        category: "動画",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
      {
        id: "item-2",
        name: "音楽サービス",
        amount: "12000",
        billingCycle: "yearly",
        category: "音楽",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, true);
  if (calculation.ok) {
    assert.equal(calculation.result.monthlyTotal, 2000);
    assert.equal(calculation.result.annualTotal, 24000);
  }
});

test("converts weekly payments to monthly estimates", () => {
  assert.equal(Math.round(convertToMonthlyAmount(500, "weekly")), 2167);
});

test("calculates cancel candidate totals", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "クラウド",
        amount: "800",
        billingCycle: "monthly",
        category: "仕事",
        usageFrequency: "rarely",
        isCancelCandidate: true,
      },
      {
        id: "item-2",
        name: "動画",
        amount: "1000",
        billingCycle: "monthly",
        category: "動画",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, true);
  if (calculation.ok) {
    assert.equal(calculation.result.cancelCandidateMonthlyTotal, 800);
    assert.equal(calculation.result.cancelCandidateAnnualTotal, 9600);
  }
});

test("groups category totals", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "動画A",
        amount: "1000",
        billingCycle: "monthly",
        category: "動画",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
      {
        id: "item-2",
        name: "動画B",
        amount: "500",
        billingCycle: "monthly",
        category: "動画",
        usageFrequency: "sometimes",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, true);
  if (calculation.ok) {
    assert.equal(calculation.result.categoryTotals[0].category, "動画");
    assert.equal(calculation.result.categoryTotals[0].monthlyTotal, 1500);
  }
});

test("ignores completely empty rows", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "",
        amount: "",
        billingCycle: "monthly",
        category: "",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
      {
        id: "item-2",
        name: "動画",
        amount: "1000",
        billingCycle: "monthly",
        category: "",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, true);
  if (calculation.ok) {
    assert.equal(calculation.result.items.length, 1);
    assert.equal(calculation.result.items[0].category, "未分類");
  }
});

test("returns validation errors for invalid amounts", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "動画",
        amount: "0",
        billingCycle: "monthly",
        category: "動画",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, false);
  assert.ok(calculation.errors.itemErrors["item-1.amount"]);
});

test("requires at least one filled subscription", () => {
  const calculation = calculateSubscriptionTotal({
    items: [
      {
        id: "item-1",
        name: "",
        amount: "",
        billingCycle: "monthly",
        category: "",
        usageFrequency: "often",
        isCancelCandidate: false,
      },
    ],
  });

  assert.equal(calculation.ok, false);
  assert.ok(calculation.errors.items);
});

let passed = 0;

for (const [name, fn] of tests) {
  fn();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

console.log(`${passed} subscription tests passed`);
