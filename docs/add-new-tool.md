# 新規ツール追加手順書

小型Webツールを同じ型で量産するための標準手順です。仕様書を渡されたら、この順番で追加します。

## 1. 新規ツール追加の流れ

1. 仕様書から `toolConfig` を作る
2. `lib/tools/{toolName}.ts` にロジック関数を作る
3. `components/tools/{ToolName}.tsx` にツール本体UIを作る
4. `app/tools/{slug}/page.tsx` にページを作る
5. `tests/{toolName}.test.ts` にロジックテストを追加する
6. `tests/runAll.ts` にテストを import する
7. `lib/tools/catalog.ts` に一覧用データを追加する
8. 関連ツールの `status` を更新する
9. `typecheck`、`test`、`build` を実行する

## 2. 作成するファイル

```text
app/tools/{slug}/page.tsx
components/tools/{ToolName}.tsx
lib/tools/{toolName}.ts
tests/{toolName}.test.ts
```

文章テンプレート系で既存の `SimpleTemplateGenerator` を使える場合でも、ページから呼ぶ薄い専用コンポーネントは作ります。

## 3. 更新するファイル

```text
tests/runAll.ts
lib/tools/catalog.ts
app/page.tsx
app/tools/{related-tool}/page.tsx
```

関連ツールが実装済みになった場合は、既存ページ側の `relatedTools` を `planned` から `available` に変更します。

## 4. toolConfigの書き方

```ts
import type { ToolConfig } from "@/lib/tools/toolConfig";

const toolConfig: ToolConfig = {
  title: "ツール名",
  slug: "tool-slug",
  category: "productivity",
  description: "ツールの短い説明",
  h1: "ツール名",
  faq: faqItems,
  relatedTools,
  disclaimer: "注意書き",
  metadata: {
    title: "SEOタイトル",
    description: "SEO description",
    alternates: { canonical: "/tools/tool-slug" },
    openGraph: {
      title: "OGPタイトル",
      description: "OGP説明",
      type: "website",
    },
  },
};
```

## 5. ロジック関数の作り方

ロジックは必ずUIから分離します。

```ts
export type ToolInput = {};
export type ToolErrors = {};
export type ToolResult = {};

export type ToolCalculation =
  | { ok: true; result: ToolResult; errors: ToolErrors }
  | { ok: false; result: null; errors: ToolErrors };

export function calculateTool(input: ToolInput): ToolCalculation {
  const errors = validateToolInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false, result: null, errors };
  }
  return { ok: true, result: {}, errors: {} };
}
```

文章生成系は `generateXxxTemplate` の名前にして、戻り値の形は同じにします。

## 6. UIコンポーネントの使い方

固定する共通部品:

- `ToolPageLayout`
- `ToolHeader`
- `InputCard`
- `ResultCard`
- `FAQSection`
- `RelatedTools`
- `Disclaimer`
- `CopyButton`
- `AdPlaceholder`
- `ToolField`
- `ResultItem`
- `SimpleTemplateGenerator`

基本形:

```tsx
<ToolPageLayout>
  <main>
    <ToolHero />
    <ToolSpecificComponent />
    <AdPlaceholder label="広告枠（準備中）" />
    <InfoSection title="使い方" />
    <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
    <FAQSection items={toolConfig.faq} />
    <RelatedTools tools={toolConfig.relatedTools} />
  </main>
</ToolPageLayout>
```

文章テンプレート系は `SimpleTemplateGenerator` を使えます。

## 7. metadataの設定方法

```ts
export const metadata: Metadata = toolConfig.metadata;
```

必須:

- `title`
- `description`
- `alternates.canonical`
- `openGraph.title`
- `openGraph.description`
- `openGraph.type`

## 8. FAQの追加方法

FAQは3件以上にします。

```ts
const faqItems = [
  { question: "質問", answer: "回答" },
];
```

FAQ構造化データは `buildFaqJsonLd(toolConfig.faq)` を使います。

## 9. 関連ツールの追加方法

```ts
const relatedTools = [
  {
    title: "関連ツール",
    description: "短い説明",
    href: "/tools/example",
    status: "available" as const,
  },
];
```

実装済みは `available`、未実装は `planned` にします。

## 10. テストの追加方法

`tests/{toolName}.test.ts` を作り、`tests/runAll.ts` に import します。

最低限:

- 正常系
- 空入力
- 不正入力
- 境界値
- 出力テキストに主要項目が含まれること

## 11. ビルド・型チェック手順

```text
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

この環境では Next.js の内部子プロセス起動が `spawn EPERM` で止まることがあります。その場合でも、`typecheck` と `test` は必ず通します。

## 12. 完了チェックリスト

- [ ] `/tools/{slug}` にページがある
- [ ] `toolConfig` がある
- [ ] `metadata` が設定されている
- [ ] `ToolPageLayout` を使っている
- [ ] `InputCard` または `SimpleTemplateGenerator` を使っている
- [ ] `ResultCard` または `SimpleTemplateGenerator` を使っている
- [ ] `CopyButton` がある
- [ ] `AdPlaceholder` がある
- [ ] `FAQSection` がある
- [ ] `RelatedTools` がある
- [ ] `Disclaimer` がある
- [ ] `lib/tools/catalog.ts` に追加されている
- [ ] カテゴリページに表示される
- [ ] ロジックが `lib/tools` に分離されている
- [ ] テストが追加されている
- [ ] `tests/runAll.ts` に追加されている
- [ ] `npm.cmd run typecheck` が通る
- [ ] `npm.cmd run test` が通る

## 13. やってはいけないこと

- AI API連携を勝手に追加しない
- ログイン機能を追加しない
- DBや保存機能を追加しない
- 広告スクリプトを入れない
- 1ツールだけのために大きな抽象化を作らない
- 汎用フォームエンジンを作らない
- ロジックをUIコンポーネントに直接書かない
- 未実装ページへ通常リンクで遷移させない
- FAQやmetadataを空のままにしない
- 法律、医療、投資などで断定的な表現をしない
