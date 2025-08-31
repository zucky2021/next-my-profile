# Prisma

## 概要

- Prismaの操作方法など記載

## 操作

### マイグレーション

1. Edit [schema](../../../prisma/schema.prisma)
2. Create migration file
   1. `npm run db:migrate`
3. Generate Prisma Client
   1. `npm run db:generate`
4. (Restart IDE)

### リセット

```sh
rm -rf prisma/migrations

npx prisma db push --force-reset

npm run db:migrate

npm run db:seed

npm run dev
```
