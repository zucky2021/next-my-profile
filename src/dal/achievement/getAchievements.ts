import { prisma } from "@/lib/prisma";

/**
 * 業務実績一覧を取得する
 * @returns Achievement[]
 */
export const getAchievements = async () => {
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
  if (!prisma || !prisma.achievement) {
    console.log("Prisma client not initialized, returning empty array");
    return [];
  }

  try {
    return await prisma.achievement.findMany({
      orderBy: { startDate: "desc" },
      include: { skills: true },
    });
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
    return [];
  }
};
