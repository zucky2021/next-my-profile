# Playwright

## 概要

- End-to-End テストの[Playwright](https://playwright.dev/)に関するドキュメントを管理

## 前提

- 初回はブラウザのインストールが必要

```sh
npx playwright install --with-deps
```

## よく使用するコマンド

### 通常実行

```sh
npx playwright test
```

### UI付きテスト実行

```sh
npx playwright test --ui
```

### テスト箇所を指定

```sh
npx playwright test --ui home.spec.ts
```
