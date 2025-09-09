# Continuous Integration

## 概要

- 継続的インテグレーション関連のドキュメント管理
- それぞれのプロセスを体系的に記述

## プロセス

### Commit

- *Git Hook - pre-commit*でソースコードの品質を担保
  - [husky](https://www.npmjs.com/package/husky)で下記を実装
    - 整形
    - 静的解析

### Push

- Coming soon...

### Pull Request

- [GitHub](https://github.com/zucky2021/next-my-profile/pulls)にてPRを作成
- PR作成・更新時に古い依存関係の確認が実行
  - **実行タイミング**:
    - `opened`: PR作成時
    - `reopened`: クローズしたPRを再オープン時
    - `synchronize`: 新しいコミットをPRに追加時
  - [dependency-check](../../../.github/workflows/dependency-check.yml)
  - 古い依存関係が検出された場合はワークフローが失敗
  - 失敗した際には`npm-check-updates`を使用(詳細はCIのメッセージより)

### Source Review

- PR作成後にCodeRabbitにより自動ソースレビューが自動的に実行
  - [設定ファイル](../../../.coderabbit.yaml)をプロジェクトでバージョン管理
