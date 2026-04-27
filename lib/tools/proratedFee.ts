export type RoundingMode = "round" | "ceil" | "floor";

export type ProratedFeeInput = {
  monthlyFee: string;
  targetMonth: string;
  startDate: string;
  endDate: string;
  roundingMode: RoundingMode;
};

export type ProratedFeeErrors = Partial<Record<keyof ProratedFeeInput, string>>;

export type ProratedFeeResult = {
  monthlyFee: number;
  year: number;
  month: number;
  startDay: number;
  endDay: number;
  daysInMonth: number;
  targetDays: number;
  dailyFee: number;
  rawAmount: number;
  proratedAmount: number;
  roundingLabel: string;
  formula: string;
  periodLabel: string;
  copyText: string;
};

export type ProratedFeeCalculation =
  | { ok: true; result: ProratedFeeResult; errors: ProratedFeeErrors }
  | { ok: false; result: null; errors: ProratedFeeErrors };

const ROUNDING_LABELS: Record<RoundingMode, string> = {
  round: "四捨五入",
  ceil: "切り上げ",
  floor: "切り捨て",
};

export function calculateProratedFee(input: ProratedFeeInput): ProratedFeeCalculation {
  const errors = validateProratedFeeInput(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, result: null, errors };
  }

  const monthlyFee = parseFee(input.monthlyFee);
  const { year, month } = parseTargetMonth(input.targetMonth)!;
  const start = parseDateParts(input.startDate)!;
  const end = parseDateParts(input.endDate)!;
  const daysInMonth = getDaysInMonth(year, month);
  const targetDays = end.day - start.day + 1;
  const rawAmount = (monthlyFee / daysInMonth) * targetDays;
  const proratedAmount = applyRounding(rawAmount, input.roundingMode);
  const dailyFee = monthlyFee / daysInMonth;
  const roundingLabel = ROUNDING_LABELS[input.roundingMode];
  const periodLabel = `${year}年${month}月${start.day}日〜${year}年${month}月${end.day}日`;
  const formula = `${formatYen(monthlyFee)} ÷ ${daysInMonth}日 × ${targetDays}日 = ${formatYen(proratedAmount)}`;
  const copyText = [
    "日割り計算結果",
    `月額料金：${formatYen(monthlyFee)}`,
    `対象期間：${periodLabel}`,
    `対象日数：${targetDays}日`,
    `1日あたり：約${formatYen(Math.round(dailyFee))}`,
    `日割り金額：${formatYen(proratedAmount)}`,
    `計算式：${formula}`,
    `端数処理：${roundingLabel}`,
  ].join("\n");

  return {
    ok: true,
    errors: {},
    result: {
      monthlyFee,
      year,
      month,
      startDay: start.day,
      endDay: end.day,
      daysInMonth,
      targetDays,
      dailyFee,
      rawAmount,
      proratedAmount,
      roundingLabel,
      formula,
      periodLabel,
      copyText,
    },
  };
}

export function validateProratedFeeInput(input: ProratedFeeInput): ProratedFeeErrors {
  const errors: ProratedFeeErrors = {};
  const monthlyFee = parseFee(input.monthlyFee);
  const targetMonth = parseTargetMonth(input.targetMonth);
  const start = parseDateParts(input.startDate);
  const end = parseDateParts(input.endDate);

  if (input.monthlyFee.trim() === "") {
    errors.monthlyFee = "月額料金を入力してください";
  } else if (!Number.isInteger(monthlyFee) || monthlyFee < 1) {
    errors.monthlyFee = "月額料金は1円以上の整数で入力してください";
  } else if (monthlyFee > 9999999) {
    errors.monthlyFee = "月額料金は9,999,999円以下で入力してください";
  }

  if (!targetMonth) {
    errors.targetMonth = "対象月を選択してください";
  }

  if (!start) {
    errors.startDate = "開始日を選択してください";
  }

  if (!end) {
    errors.endDate = "終了日を選択してください";
  }

  if (targetMonth && start && !isDateInMonth(start, targetMonth)) {
    errors.startDate = "開始日は対象月内の日付を選択してください";
  }

  if (targetMonth && end && !isDateInMonth(end, targetMonth)) {
    errors.endDate = "終了日は対象月内の日付を選択してください";
  }

  if (start && end && toDayNumber(start) > toDayNumber(end)) {
    errors.endDate = "終了日は開始日以降の日付を選択してください";
  }

  if (!ROUNDING_LABELS[input.roundingMode]) {
    errors.roundingMode = "端数処理を選択してください";
  }

  return errors;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function formatYen(value: number) {
  return `${value.toLocaleString("ja-JP")}円`;
}

function parseFee(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!/^\d+$/.test(normalized)) {
    return Number.NaN;
  }

  return Number(normalized);
}

function parseTargetMonth(value: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (month < 1 || month > 12) {
    return null;
  }

  return { year, month };
}

function parseDateParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const daysInMonth = getDaysInMonth(year, month);

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
    return null;
  }

  return { year, month, day };
}

function isDateInMonth(date: { year: number; month: number }, month: { year: number; month: number }) {
  return date.year === month.year && date.month === month.month;
}

function toDayNumber(date: { year: number; month: number; day: number }) {
  return date.year * 10000 + date.month * 100 + date.day;
}

function applyRounding(value: number, roundingMode: RoundingMode) {
  if (roundingMode === "ceil") {
    return Math.ceil(value);
  }

  if (roundingMode === "floor") {
    return Math.floor(value);
  }

  return Math.round(value);
}
