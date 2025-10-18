# Basic Design (基本設計)

- ユーザー視点でシステムの全体像を定義

## 画面

- トップページ
  - URL: `/`
  - Contents:
    - プロフィール
- 経歴ページ
  - URL: `/career`
  - Contents:
    - 職務要約
    - 転職歴
    - 業務実績
- 自己PRページ
  - URL: `/self-pr`
  - Contents:
    - 強み
    - ポートフォリオ
    - 資格
- 趣味ページ
  - URL: `/hobbies`
  - Contents:
    - 趣味一覧
    - 趣味の統計
    - 趣味と仕事の関係
- 管理者ページ
  - URL: `/admin`
  - Contents:
    - ダッシュボード
- スキルタグ編集ページ
  - URL: `/admin/skill-tags`
  - Contents:
    - タグCURD

## 技術スタック

- フレームワーク: [Next.js](https://nextjsjp.org/)
- 言語: [TypeScript](https://www.typescriptlang.org/)
- DB: [supabase](https://supabase.com/)

## クラウドプラットフォーム

- [Vercel](https://vercel.com/home)
