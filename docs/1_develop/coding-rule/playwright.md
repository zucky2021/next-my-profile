# Playwright

## 概要

- Playwrightのコーディング規約を管理

## コーディング規約

### Web標準準拠

- [MDN Web Docs](https://developer.mozilla.org/ja/)のセレクター標準に従ったテスト実装
- セマンティックHTML要素を適切に識別するテスト
- アクセシビリティ属性（`aria-label`等）を活用したセレクター

### ディレクトリ

- **/tests/**に配置

### ファイル命名

- <ページ名>.spec.ts

### セレクター優先順位

1. getByRole（name オプション必須）
2. getByLabel / getByPlaceholder / getByText
3. ID / Class name
4. data-testid（やむを得ない場合の最終手段）
