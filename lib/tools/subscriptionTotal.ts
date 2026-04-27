export type BillingCycle = "monthly" | "yearly" | "weekly";
export type UsageFrequency = "often" | "sometimes" | "rarely";

export type SubscriptionItemInput = {
  id: string;
  name: string;
  amount: string;
  billingCycle: BillingCycle;
  category: string;
  usageFrequency: UsageFrequency;
  isCancelCandidate: boolean;
};

export type SubscriptionTotalInput = {
  items: SubscriptionItemInput[];
};

export type SubscriptionTotalErrors = {
  items?: string;
  itemErrors: Record<string, string>;
};

export type SubscriptionItemResult = {
  id: string;
  name: string;
  amount: number;
  billingCycle: BillingCycle;
  category: string;
  usageFrequency: UsageFrequency;
  monthlyAmount: number;
  annualAmount: number;
  isCancelCandidate: boolean;
};

export type SubscriptionTotalResult = {
  items: SubscriptionItemResult[];
  monthlyTotal: number;
  annualTotal: number;
  cancelCandidateMonthlyTotal: number;
  cancelCandidateAnnualTotal: number;
  categoryTotals: Array<{ category: string; monthlyTotal: number; annualTotal: number }>;
  copyText: string;
};

export type SubscriptionTotalCalculation =
  | { ok: true; result: SubscriptionTotalResult; errors: SubscriptionTotalErrors }
  | { ok: false; result: null; errors: SubscriptionTotalErrors };

const CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: "月額",
  yearly: "年額",
  weekly: "週額",
};

export function calculateSubscriptionTotal(input: SubscriptionTotalInput): SubscriptionTotalCalculation {
  const errors = validateSubscriptionTotalInput(input);

  if (errors.items || Object.keys(errors.itemErrors).length > 0) {
    return { ok: false, result: null, errors };
  }

  const items = input.items
    .filter(isFilledItem)
    .map((item) => {
      const amount = parseAmount(item.amount);
      const monthlyAmount = convertToMonthlyAmount(amount, item.billingCycle);

      return {
        id: item.id,
        name: item.name.trim() || "名称未入力",
        amount,
        billingCycle: item.billingCycle,
        category: item.category.trim() || "未分類",
        usageFrequency: item.usageFrequency,
        monthlyAmount,
        annualAmount: monthlyAmount * 12,
        isCancelCandidate: item.isCancelCandidate,
      };
    });

  const monthlyTotal = roundYen(sum(items.map((item) => item.monthlyAmount)));
  const annualTotal = roundYen(sum(items.map((item) => item.annualAmount)));
  const cancelCandidateMonthlyTotal = roundYen(
    sum(items.filter((item) => item.isCancelCandidate).map((item) => item.monthlyAmount)),
  );
  const cancelCandidateAnnualTotal = roundYen(cancelCandidateMonthlyTotal * 12);
  const categoryTotals = buildCategoryTotals(items);
  const copyText = buildCopyText({
    items,
    monthlyTotal,
    annualTotal,
    cancelCandidateMonthlyTotal,
    cancelCandidateAnnualTotal,
    categoryTotals,
  });

  return {
    ok: true,
    errors: { itemErrors: {} },
    result: {
      items,
      monthlyTotal,
      annualTotal,
      cancelCandidateMonthlyTotal,
      cancelCandidateAnnualTotal,
      categoryTotals,
      copyText,
    },
  };
}

export function validateSubscriptionTotalInput(input: SubscriptionTotalInput): SubscriptionTotalErrors {
  const errors: SubscriptionTotalErrors = { itemErrors: {} };
  const filledItems = input.items.filter(isFilledItem);

  if (filledItems.length === 0) {
    errors.items = "サブスクを1件以上入力してください";
  }

  input.items.forEach((item) => {
    if (!isFilledItem(item)) {
      return;
    }

    const amount = parseAmount(item.amount);

    if (!Number.isInteger(amount) || amount < 1) {
      errors.itemErrors[`${item.id}.amount`] = "料金は1円以上の整数で入力してください";
    } else if (amount > 9999999) {
      errors.itemErrors[`${item.id}.amount`] = "料金は9,999,999円以下で入力してください";
    }

    if (!["monthly", "yearly", "weekly"].includes(item.billingCycle)) {
      errors.itemErrors[`${item.id}.billingCycle`] = "支払い周期を選択してください";
    }

    if (!["often", "sometimes", "rarely"].includes(item.usageFrequency)) {
      errors.itemErrors[`${item.id}.usageFrequency`] = "利用頻度を選択してください";
    }
  });

  return errors;
}

export function convertToMonthlyAmount(amount: number, billingCycle: BillingCycle) {
  if (billingCycle === "yearly") {
    return amount / 12;
  }

  if (billingCycle === "weekly") {
    return (amount * 52) / 12;
  }

  return amount;
}

export function formatYen(value: number) {
  return `${roundYen(value).toLocaleString("ja-JP")}円`;
}

function isFilledItem(item: SubscriptionItemInput) {
  return (
    item.name.trim() !== "" ||
    item.amount.trim() !== "" ||
    item.category.trim() !== "" ||
    item.isCancelCandidate
  );
}

function parseAmount(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!/^\d+$/.test(normalized)) {
    return Number.NaN;
  }

  return Number(normalized);
}

function roundYen(value: number) {
  return Math.round(value);
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function buildCategoryTotals(items: SubscriptionItemResult[]) {
  const totals = new Map<string, { category: string; monthlyTotal: number; annualTotal: number }>();

  items.forEach((item) => {
    const current = totals.get(item.category) ?? {
      category: item.category,
      monthlyTotal: 0,
      annualTotal: 0,
    };

    current.monthlyTotal += item.monthlyAmount;
    current.annualTotal += item.annualAmount;
    totals.set(item.category, current);
  });

  return Array.from(totals.values())
    .map((item) => ({
      ...item,
      monthlyTotal: roundYen(item.monthlyTotal),
      annualTotal: roundYen(item.annualTotal),
    }))
    .sort((a, b) => b.monthlyTotal - a.monthlyTotal);
}

function buildCopyText(result: Omit<SubscriptionTotalResult, "copyText">) {
  const lines = [
    "サブスク総額チェック結果",
    `月額合計：${formatYen(result.monthlyTotal)}`,
    `年額合計：${formatYen(result.annualTotal)}`,
    `解約候補の月額合計：${formatYen(result.cancelCandidateMonthlyTotal)}`,
    `解約候補の年額合計：${formatYen(result.cancelCandidateAnnualTotal)}`,
    "",
    "内訳",
    ...result.items.map(
      (item) =>
        `- ${item.name}：${formatYen(item.monthlyAmount)}/月（${CYCLE_LABELS[item.billingCycle]} ${formatYen(item.amount)}）`,
    ),
  ];

  return lines.join("\n");
}
