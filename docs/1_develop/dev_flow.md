# Develop flow

## 概要

- 開発フローについて記述

## 機能開発フロー

### 基本的な開発フロー

```mermaid
graph TD
    A[main] --> B[feature/機能名]
    B --> C[開発・コミット]
    C --> D[PR作成]
    D --> E[コードレビュー]
    E --> F[CI通過]
    F --> G[mainにマージ]
    G --> H[デプロイ]
```

### 緊急修正フロー

```mermaid
graph TD
    A[main] --> B[hotfix/緊急修正]
    B --> C[緊急修正・コミット]
    C --> D[PR作成]
    D --> E[緊急レビュー]
    E --> F[CI通過]
    F --> G[mainにマージ]
    G --> H[緊急デプロイ]
```

## ブランチ戦略

### GitHub Flow

- このプロジェクトでは、**GitHub Flow**をベースとしたシンプルで効率的なブランチ戦略を採用しています。

#### ブランチのライフサイクル

```mermaid
gitGraph
    commit id: "Initial commit"
    
    branch feature/35-display-env
    checkout feature/35-display-env
    commit id: "Add env display"
    
    checkout main
    merge feature/35-display-env
    commit id: "v1.1.0"
    
    branch feature/36-user-profile
    checkout feature/36-user-profile
    commit id: "Add profile component"
    
    checkout main
    branch hotfix/37-critical-bug
    checkout hotfix/37-critical-bug
    commit id: "Fix critical bug"
    
    checkout main
    merge hotfix/37-critical-bug
    commit id: "v1.1.1"
    
    merge feature/36-user-profile
    commit id: "v1.2.0"
```

## ブランチ命名規則

| プレフィックス | 用途 | 例 |
| -- | -- | -- |
| **feature/** | 新機能開発 | feature/36-user-profile |
| **hotfix/** | 緊急修正 | hotfix/38-critical-bug |
| **docs/** | ドキュメント更新 | docs/40-api-docs |
| **refactor/** | リファクタリング | refactor/41-component-structure |
