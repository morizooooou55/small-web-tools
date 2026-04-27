"use client";

import { useMemo, useState } from "react";
import {
  calculateSubscriptionTotal,
  formatYen,
  type BillingCycle,
  type SubscriptionItemInput,
  type UsageFrequency,
} from "@/lib/tools/subscriptionTotal";
import { CopyButton } from "./CopyButton";
import { ResultItem } from "./ResultItem";
import { ToolField } from "./ToolField";

const initialItems: SubscriptionItemInput[] = [
  createItem("item-1"),
  createItem("item-2"),
  createItem("item-3"),
];

const cycleOptions: Array<{ value: BillingCycle; label: string }> = [
  { value: "monthly", label: "月額" },
  { value: "yearly", label: "年額" },
  { value: "weekly", label: "週額" },
];

const frequencyOptions: Array<{ value: UsageFrequency; label: string }> = [
  { value: "often", label: "よく使う" },
  { value: "sometimes", label: "たまに使う" },
  { value: "rarely", label: "あまり使わない" },
];

export function SubscriptionTotalChecker() {
  const [items, setItems] = useState<SubscriptionItemInput[]>(initialItems);
  const calculation = useMemo(() => calculateSubscriptionTotal({ items }), [items]);
  const hasAnyInput = items.some(
    (item) =>
      item.name.trim() !== "" ||
      item.amount.trim() !== "" ||
      item.category.trim() !== "" ||
      item.isCancelCandidate,
  );
  const visibleErrors = hasAnyInput ? calculation.errors : { itemErrors: {} };

  function updateItem<Key extends keyof SubscriptionItemInput>(
    id: string,
    key: Key,
    value: SubscriptionItemInput[Key],
  ) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  }

  function addItem() {
    setItems((current) => [...current, createItem(`item-${Date.now()}`)]);
  }

  function removeItem(id: string) {
    setItems((current) => (current.length <= 1 ? current : current.filter((item) => item.id !== id)));
  }

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-950">入力</h2>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
              onClick={addItem}
              type="button"
            >
              行を追加
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {items.map((item, index) => (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-800">サブスク {index + 1}</p>
                  <button
                    className="text-sm font-semibold text-slate-500 hover:text-rose-700 disabled:cursor-not-allowed disabled:text-slate-300"
                    disabled={items.length <= 1}
                    onClick={() => removeItem(item.id)}
                    type="button"
                  >
                    削除
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ToolField label="サービス名">
                    <input
                      className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      onChange={(event) => updateItem(item.id, "name", event.target.value)}
                      placeholder="例：動画サービス"
                      type="text"
                      value={item.name}
                    />
                  </ToolField>

                  <ToolField
                    error={visibleErrors.itemErrors?.[`${item.id}.amount`]}
                    label="料金"
                  >
                    <div className="relative">
                      <input
                        className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        inputMode="numeric"
                        onChange={(event) => updateItem(item.id, "amount", event.target.value)}
                        placeholder="例：1200"
                        type="text"
                        value={item.amount}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        円
                      </span>
                    </div>
                  </ToolField>

                  <ToolField label="支払い周期">
                    <select
                      className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      onChange={(event) => updateItem(item.id, "billingCycle", event.target.value as BillingCycle)}
                      value={item.billingCycle}
                    >
                      {cycleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </ToolField>

                  <ToolField label="カテゴリ">
                    <input
                      className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      onChange={(event) => updateItem(item.id, "category", event.target.value)}
                      placeholder="例：動画・音楽"
                      type="text"
                      value={item.category}
                    />
                  </ToolField>

                  <ToolField label="利用頻度">
                    <select
                      className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                      onChange={(event) => updateItem(item.id, "usageFrequency", event.target.value as UsageFrequency)}
                      value={item.usageFrequency}
                    >
                      {frequencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </ToolField>

                  <label className="flex min-h-12 items-center gap-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                    <input
                      checked={item.isCancelCandidate}
                      className="h-4 w-4 accent-teal-700"
                      onChange={(event) => updateItem(item.id, "isCancelCandidate", event.target.checked)}
                      type="checkbox"
                    />
                    解約候補にする
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-950">チェック結果</h2>
            <CopyButton disabled={!calculation.ok} text={calculation.ok ? calculation.result.copyText : ""} />
          </div>

          {!hasAnyInput ? (
            <p className="mt-6 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              サービス名と料金を入力すると、月額合計と年額合計が表示されます。
            </p>
          ) : !calculation.ok ? (
            <p className="mt-6 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              入力内容を確認してください。
            </p>
          ) : (
            <div className="mt-6">
              <div className="rounded-md bg-teal-50 p-5">
                <p className="text-sm font-semibold text-teal-800">月額合計</p>
                <p className="mt-2 text-4xl font-bold tracking-normal text-teal-950">
                  {formatYen(calculation.result.monthlyTotal)}
                </p>
                <p className="mt-2 text-sm font-semibold text-teal-800">
                  年額では {formatYen(calculation.result.annualTotal)}
                </p>
              </div>

              <dl className="mt-5 grid gap-3">
                <ResultItem label="入力件数" value={`${calculation.result.items.length}件`} />
                <ResultItem
                  label="解約候補の月額合計"
                  value={formatYen(calculation.result.cancelCandidateMonthlyTotal)}
                />
                <ResultItem
                  label="解約候補の年額合計"
                  value={formatYen(calculation.result.cancelCandidateAnnualTotal)}
                />
              </dl>

              {calculation.result.categoryTotals.length > 0 ? (
                <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">カテゴリ別</p>
                  <ul className="mt-3 space-y-2">
                    {calculation.result.categoryTotals.map((category) => (
                      <li className="flex justify-between gap-3 text-sm" key={category.category}>
                        <span className="font-semibold text-slate-700">{category.category}</span>
                        <span className="font-bold text-slate-950">{formatYen(category.monthlyTotal)}/月</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function createItem(id: string): SubscriptionItemInput {
  return {
    id,
    name: "",
    amount: "",
    billingCycle: "monthly",
    category: "",
    usageFrequency: "often",
    isCancelCandidate: false,
  };
}
