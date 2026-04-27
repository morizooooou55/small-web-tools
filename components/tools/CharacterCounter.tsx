"use client";

import { useMemo, useState } from "react";
import { countCharacters } from "@/lib/tools/characterCounter";
import { CopyButton } from "./CopyButton";
import { InputCard } from "./InputCard";
import { ResultCard } from "./ResultCard";
import { ResultItem } from "./ResultItem";
import { ToolField } from "./ToolField";

export function CharacterCounter() {
  const [text, setText] = useState("");
  const result = useMemo(() => countCharacters({ text }), [text]);

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-2">
        <InputCard description="文章を貼り付けると、文字数・行数・段落数をすぐ確認できます。">
          <ToolField label="文章">
            <textarea
              className="min-h-72 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              onChange={(event) => setText(event.target.value)}
              placeholder="ここに文章を貼り付け"
              value={text}
            />
          </ToolField>
        </InputCard>

        <ResultCard action={<CopyButton disabled={text.length === 0} text={result.copyText} />} title="カウント結果">
          {text.length === 0 ? (
            <p className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              文章を入力すると、文字数や行数が表示されます。
            </p>
          ) : (
            <dl className="grid gap-3 sm:grid-cols-2">
              <ResultItem label="文字数" value={`${result.characters}`} />
              <ResultItem label="空白なし" value={`${result.charactersWithoutSpaces}`} />
              <ResultItem label="行数" value={`${result.lines}`} />
              <ResultItem label="段落数" value={`${result.paragraphs}`} />
              <ResultItem label="単語・文字要素" value={`${result.words}`} />
              <ResultItem label="原稿用紙換算" value={`${result.manuscriptPages}枚`} />
            </dl>
          )}
        </ResultCard>
      </div>
    </section>
  );
}
