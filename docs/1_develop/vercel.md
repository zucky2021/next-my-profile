# Vercel

## 概要

- Vercelに関するドキュメントの管理

## コマンド

### Vercelに保存されている環境変数をダウンロード

```sh
vercel env pull .env.production
```

- 逆にpushすることはできないため個別に`vercel env add`を使用する
