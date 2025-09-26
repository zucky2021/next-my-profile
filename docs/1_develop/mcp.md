# MCP

## 概要

- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)について記述
- [Cursor - MCP](https://docs.cursor.com/ja/context/mcp)

## 設定箇所

- [mcp.json](../../.cursor/mcp.json)

## 各MCP

### [GitHub](https://docs.github.com/ja/copilot/how-tos/provide-context/use-mcp/use-the-github-mcp-server)

- トークン
  - GitHubのページからトークンを作成(or更新)しCLIで環境変数に設定する
  - [作成&更新画面](https://github.com/settings/personal-access-tokens)
  - 環境変数設定: `GITHUB_PERSONAL_ACCESS_TOKEN=github_pat_xxx`
  - 確認: `echo ${GITHUB_PERSONAL_ACCESS_TOKEN}`
- プロンプト: `issueを取得して`

### [Playwright](https://github.com/microsoft/playwright-mcp)

### [Context7](https://github.com/upstash/context7)

### [Serena](https://github.com/oraios/serena)

### [Supabase](https://supabase.com/blog/mcp-server)

- [トークン作成画面](https://supabase.com/dashboard/account/tokens)

```sh
# 環境変数に設定
SUPABASE_PERSONAL_ACCESS_TOKEN=sbp_...
# 確認
echo ${SUPABASE_PERSONAL_ACCESS_TOKEN}
```

### [Apidog](https://docs.apidog.com/jp/%E6%A6%82%E8%A6%81-881622m0)

- [トークン作成方法](https://docs.apidog.com/jp/generate-openapi-access-token-640857m0)

```sh
# 環境変数に設定
APIDOG_ACCESS_TOKEN=APS-...
# 確認
echo ${APIDOG_ACCESS_TOKEN}
```
