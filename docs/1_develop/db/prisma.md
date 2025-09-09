# Prisma

## 概要

- Prismaの操作方法など記載

## 操作

### マイグレーション

1. Edit [schema](../../../prisma/schema.prisma)
2. Create migration file: `npx prisma migrate dev`
3. Generate Prisma Client: `npx prisma generate`
4. (Restart IDE)

### 初期データ登録

#### Local

```sh
npx prisma db seed
```

#### Production

```sh
# 本番環境の環境変数を取得
vercel env pull .env.production

# 本番環境でseed実行
npx dotenv -e .env.production -- npx prisma db seed
```

### リセット

```sh
rm -rf prisma/migrations

npx prisma db push --force-reset

npx prisma migrate dev

npx prisma db seed

npm run dev
```
