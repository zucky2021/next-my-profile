import { prisma } from "@/lib/prisma";

/**
 * 業務実績一覧を取得する
 * @returns Achievement[]
 */
export const getAchievements = async () => {
  // ビルド時はデータベース接続をスキップ
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    console.log("Skipping database connection during build");
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
