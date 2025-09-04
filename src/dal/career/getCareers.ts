import { prisma } from "@/lib/prisma";

export const getCareers = async () => {
  // ビルド時はデータベース接続をスキップ
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    console.log("Skipping database connection during build");
    return [];
  }

  // 開発環境でもデータベース接続エラー時はスキップ
  if (!process.env.DATABASE_URL) {
    console.log("No DATABASE_URL found, returning empty array");
    return [];
  }

  // Prismaクライアントが初期化されていない場合
  if (!prisma || !prisma.career) {
    console.log("Prisma client not initialized, returning empty array");
    return [];
  }

  try {
    return await prisma.career.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch careers:", error);
    return [];
  }
};
