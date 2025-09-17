# Prisma

## 概要

- Prismaの操作方法など記載

## 操作

### 整形

```sh
npx prisma format
```

### マイグレーション

- Local

1. Edit [schema](../../../prisma/schema.prisma)
2. Create migration file: `npx prisma migrate dev`
3. Generate Prisma Client: `npx prisma generate`
4. (Restart IDE)

- Production

```sh
vercel env pull .env.production
npx dotenv -e .env.production -- npx prisma migrate deploy
```

### 初期データ登録

- Local

```sh
npx prisma db seed
```

- Production

```sh
vercel env pull .env.production
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
