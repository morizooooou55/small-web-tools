"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";
import { InputCard } from "./InputCard";
import { ResultCard } from "./ResultCard";
import { ToolField } from "./ToolField";

type FieldOption = {
  value: string;
  label: string;
};

type FieldConfig = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "textarea" | "select";
  options?: FieldOption[];
};

type TemplateResult = {
  title: string;
  output: string;
  summary?: string;
};

type TemplateGeneration =
  | { ok: true; result: TemplateResult; errors: Record<string, string> }
  | { ok: false; result: null; errors: Record<string, string> };

type SimpleTemplateGeneratorProps = {
  inputTitle?: string;
  inputDescription: string;
  resultTitle?: string;
  fields: FieldConfig[];
  initialInput: Record<string, string>;
  generate: (input: Record<string, string>) => TemplateGeneration;
};

export function SimpleTemplateGenerator({
  inputTitle = "入力",
  inputDescription,
  resultTitle = "生成結果",
  fields,
  initialInput,
  generate,
}: SimpleTemplateGeneratorProps) {
  const [input, setInput] = useState(initialInput);
  const generation = useMemo(() => generate(input), [generate, input]);
  const hasAnyInput = Object.entries(input).some(([key, value]) => value !== initialInput[key]);
  const visibleErrors = hasAnyInput ? generation.errors : {};

  function updateInput(key: string, value: string) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <InputCard description={inputDescription} title={inputTitle}>
          <div className="space-y-4">
            {fields.map((field) => (
              <ToolField error={visibleErrors[field.key]} key={field.key} label={field.label}>
                {field.type === "textarea" ? (
                  <textarea
                    className="min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    onChange={(event) => updateInput(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    value={input[field.key] ?? ""}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    onChange={(event) => updateInput(field.key, event.target.value)}
                    value={input[field.key] ?? ""}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    onChange={(event) => updateInput(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    type={field.type ?? "text"}
                    value={input[field.key] ?? ""}
                  />
                )}
              </ToolField>
            ))}
          </div>
        </InputCard>

        <ResultCard
          action={<CopyButton disabled={!generation.ok} text={generation.ok ? generation.result.output : ""} />}
          title={resultTitle}
        >
          {!hasAnyInput ? (
            <p className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              入力すると、コピーしやすいテンプレートが表示されます。
            </p>
          ) : !generation.ok ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              入力内容を確認してください。
            </p>
          ) : (
            <div>
              <div className="rounded-md bg-teal-50 p-4">
                <p className="text-sm font-semibold text-teal-800">{generation.result.title}</p>
                {generation.result.summary ? (
                  <p className="mt-1 text-sm text-teal-800">{generation.result.summary}</p>
                ) : null}
              </div>
              <pre className="mt-5 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-50">
                {generation.result.output}
              </pre>
            </div>
          )}
        </ResultCard>
      </div>
    </section>
  );
}
