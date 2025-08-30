# Continuous Integration

## 概要

- 継続的インテグレーション関連のドキュメント管理
- それぞれのプロセスを体系的に記述

## プロセス

### Commit

- *Git Hook - pre-commit*でソースコードの品質を担保
- 整形
- 静的解析

### Push

### Pull Request

- [GitHub](https://github.com/zucky2021/next-my-profile/pulls)にてPRを作成

### Source Review

- PR作成後にCodeRabbitにより自動ソースレビューが自動的に実行
  - [設定ファイル](../../../.coderabbit.yaml)をプロジェクトでバージョン管理
