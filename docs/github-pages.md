# GitHub Pages公開手順

このプロジェクトは Next.js の静的エクスポートで GitHub Pages に公開します。

## GitHub側の設定

1. GitHub リポジトリの `Settings` を開く
2. `Pages` を開く
3. `Build and deployment` の `Source` を `GitHub Actions` にする
4. `main` ブランチへ push する

## URL

ユーザー/組織ページの場合:

```text
https://{owner}.github.io/
```

通常のプロジェクトページの場合:

```text
https://{owner}.github.io/{repo}/
```

GitHub Actions では、リポジトリ名に応じて `NEXT_PUBLIC_BASE_PATH` と `NEXT_PUBLIC_SITE_URL` を自動設定します。
`robots.txt` と `sitemap.xml` は GitHub Pages の公開URLに合わせて `public/` 配下の静的ファイルとして配置しています。

## ローカル確認

通常の確認:

```text
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

プロジェクトページ相当の確認:

```text
$env:NEXT_PUBLIC_BASE_PATH="/repo-name"
$env:NEXT_PUBLIC_SITE_URL="https://owner.github.io/repo-name"
npm.cmd run build
```

## 注意

- `out/` が GitHub Pages の公開対象です
- `output: "export"` を使うため、サーバー専用機能は使いません
- 画像最適化は `images.unoptimized = true` にしています
- `trailingSlash = true` にしているため、直接アクセスやリロード時も静的ファイルとして解決しやすくしています
