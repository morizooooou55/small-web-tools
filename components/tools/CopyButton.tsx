"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  disabled?: boolean;
};

export function CopyButton({ text, disabled = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleCopy() {
    if (disabled || !text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
      window.setTimeout(() => setFailed(false), 1800);
    }
  }

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      disabled={disabled}
      onClick={handleCopy}
      type="button"
    >
      {failed ? "コピーできませんでした" : copied ? "コピーしました" : "結果をコピー"}
    </button>
  );
}
