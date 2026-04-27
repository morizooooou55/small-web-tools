"use client";

import { useMemo, useState } from "react";
import { formatText, getTextFormatModeLabel, type TextFormatMode } from "@/lib/tools/textFormatter";
import { CopyButton } from "./CopyButton";
import { InputCard } from "./InputCard";
import { ResultCard } from "./ResultCard";
import { ResultItem } from "./ResultItem";
import { ToolField } from "./ToolField";

const modes: TextFormatMode[] = ["trim-lines", "remove-empty-lines", "remove-line-breaks", "normalize-spaces"];

export function TextFormatter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<TextFormatMode>("trim-lines");
  const formatting = useMemo(() => formatText({ text, mode }), [mode, text]);
  const modeError = formatting.ok ? undefined : formatting.errors.mode;
  const textError = formatting.ok ? undefined : formatting.errors.text;

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-2">
        <InputCard description="余計な空白、空行、改行を整えて、コピーしやすい文章にします。">
          <div className="space-y-4">
            <ToolField label="整形方法" error={modeError}>
              <select
                className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => setMode(event.target.value as TextFormatMode)}
                value={mode}
              >
                {modes.map((item) => (
                  <option key={item} value={item}>
                    {getTextFormatModeLabel(item)}
                  </option>
                ))}
              </select>
            </ToolField>
            <ToolField label="文章" error={textError}>
              <textarea
                className="min-h-72 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => setText(event.target.value)}
                placeholder="ここに文章を貼り付け"
                value={text}
              />
            </ToolField>
          </div>
        </InputCard>

        <ResultCard
          action={<CopyButton disabled={!formatting.ok} text={formatting.ok ? formatting.result.formatted : ""} />}
          title="整形結果"
        >
          {!text.trim() ? (
            <p className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              文章を入力すると、整形後のテキストが表示されます。
            </p>
          ) : !formatting.ok ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              入力内容を確認してください。
            </p>
          ) : (
            <div>
              <dl className="mb-4 grid gap-3 sm:grid-cols-2">
                <ResultItem label="整形方法" value={formatting.result.modeLabel} />
                <ResultItem label="文字数変化" value={`${formatting.result.beforeLength} → ${formatting.result.afterLength}`} />
              </dl>
              <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-50">
                {formatting.result.formatted}
              </pre>
            </div>
          )}
        </ResultCard>
      </div>
    </section>
  );
}
