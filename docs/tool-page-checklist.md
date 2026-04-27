# Tool Page Checklist

## 基本

- [ ] URLが `/tools/{slug}` になっている
- [ ] 1ツール1ページになっている
- [ ] ログイン不要
- [ ] DB不要
- [ ] 広告スクリプトを入れていない
- [ ] `AdPlaceholder` を配置している

## UI

- [ ] PCで入力と結果が見やすい
- [ ] スマホで1カラムになっている
- [ ] 入力欄がタップしやすい
- [ ] エラーが入力欄の近くに出る
- [ ] 結果がコピーしやすい
- [ ] 未実装リンクは `planned`

## 実装

- [ ] 計算/変換ロジックが `lib/tools` にある
- [ ] UIからロジックが分離されている
- [ ] バリデーションがある
- [ ] 不正入力で計算しない
- [ ] `ToolField` を使っている
- [ ] `ResultItem` を使っている

## SEO

- [ ] `metadata.title` がある
- [ ] `metadata.description` がある
- [ ] `alternates.canonical` がある
- [ ] `openGraph` がある
- [ ] H1が自然
- [ ] FAQが3件以上ある
- [ ] `buildFaqJsonLd` を使っている

## テスト

- [ ] 正常系テストがある
- [ ] 境界値テストがある
- [ ] 不正入力テストがある
- [ ] `tests/runAll.ts` に追加している
- [ ] `npm.cmd run typecheck` が通る
- [ ] `npm.cmd run test` が通る
