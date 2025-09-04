import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

// ビルド時はPrismaクライアントの初期化を完全にスキップ
if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE === "phase-production-build"
) {
  // 本番ビルド時のみダミークライアントを返す
  prisma = {} as PrismaClient;
} else {
  // 開発環境と本番実行時はPrismaクライアントを初期化
  try {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      });
    }
    prisma = globalForPrisma.prisma;
  } catch (error) {
    console.error("Failed to initialize Prisma client:", error);
    // フォールバック用のダミークライアント
    prisma = {} as PrismaClient;
  }
}

export { prisma };
export default prisma;
