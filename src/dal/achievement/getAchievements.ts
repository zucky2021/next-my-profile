import { prisma } from "@/lib/prisma";

/**
 * 業務実績一覧を取得する
 * @returns Achievement[]
 */
export const getAchievements = async () => {
  return await prisma.achievement.findMany({
    orderBy: { startDate: "desc" },
    include: { skills: true },
  });
};
