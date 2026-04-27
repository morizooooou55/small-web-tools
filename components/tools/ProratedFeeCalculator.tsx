"use client";

import { useMemo, useState } from "react";
import {
  calculateProratedFee,
  formatYen,
  type ProratedFeeInput,
  type RoundingMode,
} from "@/lib/tools/proratedFee";
import { CopyButton } from "./CopyButton";
import { ResultItem } from "./ResultItem";
import { ToolField } from "./ToolField";

const initialInput: ProratedFeeInput = {
  monthlyFee: "",
  targetMonth: "",
  startDate: "",
  endDate: "",
  roundingMode: "round",
};

export function ProratedFeeCalculator() {
  const [input, setInput] = useState<ProratedFeeInput>(initialInput);
  const calculation = useMemo(() => calculateProratedFee(input), [input]);
  const hasAnyInput = Object.values(input).some((value) => value !== "" && value !== "round");
  const visibleErrors = hasAnyInput ? calculation.errors : {};

  function updateInput<Key extends keyof ProratedFeeInput>(key: Key, value: ProratedFeeInput[Key]) {
    setInput((current) => {
      if (key === "targetMonth" && typeof value === "string") {
        return {
          ...current,
          targetMonth: value,
          startDate: current.startDate.startsWith(value) ? current.startDate : "",
          endDate: current.endDate.startsWith(value) ? current.endDate : "",
        };
      }

      return { ...current, [key]: value };
    });
  }

  const monthMinMax = input.targetMonth
    ? {
        min: `${input.targetMonth}-01`,
        max: getMonthMaxDate(input.targetMonth),
      }
    : {};

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-950">入力</h2>
          <div className="mt-5 space-y-4">
            <ToolField label="月額料金" error={visibleErrors.monthlyFee}>
              <div className="relative">
                <input
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  inputMode="numeric"
                  onChange={(event) => updateInput("monthlyFee", event.target.value)}
                  placeholder="例：31000"
                  type="text"
                  value={input.monthlyFee}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  円
                </span>
              </div>
            </ToolField>

            <ToolField label="対象月" error={visibleErrors.targetMonth}>
              <input
                className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => updateInput("targetMonth", event.target.value)}
                type="month"
                value={input.targetMonth}
              />
            </ToolField>

            <div className="grid gap-4 sm:grid-cols-2">
              <ToolField label="開始日" error={visibleErrors.startDate}>
                <input
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  disabled={!input.targetMonth}
                  onChange={(event) => updateInput("startDate", event.target.value)}
                  type="date"
                  value={input.startDate}
                  {...monthMinMax}
                />
              </ToolField>
              <ToolField label="終了日" error={visibleErrors.endDate}>
                <input
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  disabled={!input.targetMonth}
                  onChange={(event) => updateInput("endDate", event.target.value)}
                  type="date"
                  value={input.endDate}
                  {...monthMinMax}
                />
              </ToolField>
            </div>

            <ToolField label="端数処理" error={visibleErrors.roundingMode}>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  ["round", "四捨五入"],
                  ["ceil", "切り上げ"],
                  ["floor", "切り捨て"],
                ].map(([value, label]) => (
                  <label
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-800"
                    key={value}
                  >
                    <input
                      checked={input.roundingMode === value}
                      className="h-4 w-4 accent-teal-700"
                      onChange={() => updateInput("roundingMode", value as RoundingMode)}
                      type="radio"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </ToolField>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-950">計算結果</h2>
            <CopyButton disabled={!calculation.ok} text={calculation.ok ? calculation.result.copyText : ""} />
          </div>

          {!hasAnyInput ? (
            <p className="mt-6 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              月額料金、対象月、開始日、終了日を入力すると、日割り金額が表示されます。
            </p>
          ) : !calculation.ok ? (
            <p className="mt-6 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              入力内容を確認してください。
            </p>
          ) : (
            <div className="mt-6">
              <div className="rounded-md bg-teal-50 p-5">
                <p className="text-sm font-semibold text-teal-800">日割り金額</p>
                <p className="mt-2 text-4xl font-bold tracking-normal text-teal-950">
                  {formatYen(calculation.result.proratedAmount)}
                </p>
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <ResultItem label="対象日数" value={`${calculation.result.targetDays}日`} />
                <ResultItem label="対象月の日数" value={`${calculation.result.daysInMonth}日`} />
                <ResultItem label="1日あたり" value={`約${formatYen(Math.round(calculation.result.dailyFee))}`} />
                <ResultItem label="端数処理" value={calculation.result.roundingLabel} />
              </dl>
              <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">計算式</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                  {calculation.result.formula}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getMonthMaxDate(targetMonth: string) {
  const [year, month] = targetMonth.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return `${targetMonth}-${String(lastDay).padStart(2, "0")}`;
}
