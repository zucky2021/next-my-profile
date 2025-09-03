# Supabase

## 概要

- こちらのプロジェクトの DB は **Supabase** で管理
- Supabaseに関するドキュメントを管理

## Project

- [Profile Project](https://supabase.com/dashboard/project/hiyuwgtjkyvipekkatqf)

## Local

- Check status

```sh
npx supabase status
```

- Run local supabase

```sh
npx supabase start
```

- Stop

```sh
npx supabase stop
```

- Run Migration

```sh
npx dotenv -e .env.local -- prisma migrate dev
```
