# Add Tool Guide

3個目以降の小型Webツールを追加するときの標準手順です。

## 1. 追加するファイル

`{slug}` と `{ToolName}` を決めて、次の4種類を追加します。

```text
app/tools/{slug}/page.tsx
components/tools/{ToolName}.tsx
lib/tools/{toolName}.ts
tests/{toolName}.test.ts
```

## 2. 再利用する共通コンポーネント

ページ側では次を使います。

```tsx
<ToolPageLayout>
  <main>
    <ToolHero />
    <ToolSpecificComponent />
    <AdPlaceholder label="広告枠（準備中）" />
    <InfoSection title="使い方" />
    <InfoSection title="注意書き" />
    <FaqSection items={faqItems} />
    <RelatedTools tools={relatedTools} />
  </main>
</ToolPageLayout>
```

ツール本体では必要に応じて次を使います。

```tsx
<ToolField label="入力項目" error={error}>...</ToolField>
<ResultItem label="結果項目" value="..." />
<CopyButton text={copyText} />
```

## 3. ロジックの標準形

計算や変換はコンポーネントに直接書かず、`lib/tools` に分離します。

```ts
export type ToolInput = {};
export type ToolErrors = {};
export type ToolResult = {};

export function calculateTool(input: ToolInput) {
  const errors = validateToolInput(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, result: null, errors };
  }

  return { ok: true, result: {}, errors: {} };
}

export function validateToolInput(input: ToolInput) {
  return {};
}
```

## 4. SEO と FAQ

各ページに `metadata` を置きます。

```ts
export const metadata = {
  title: "{ツール名}｜主要キーワードを含める",
  description: "入力すると何が分かるかを自然に説明する。",
  alternates: {
    canonical: "/tools/{slug}",
  },
  openGraph: {
    title: "{ツール名}",
    description: "短い説明文",
    type: "website",
  },
};
```

FAQ構造化データは `buildFaqJsonLd(faqItems)` を使います。

## 5. テスト

ロジックの正常系、境界値、不正入力をテストします。
追加したテストファイルは `tests/runAll.ts` に import します。

```ts
import "./newTool.test.ts";
```

## 6. 実行確認

```text
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

この環境では Next.js の内部子プロセス起動が `spawn EPERM` で止まることがあります。
その場合でも `typecheck` と `test` は必ず通します。
