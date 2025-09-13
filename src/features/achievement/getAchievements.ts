import prisma from "@/shared/lib/prisma";

/**
 * 業務実績一覧を取得する
 * @returns Achievement[]
 */
export const getAchievements = async () => {
  return await prisma.achievement.findMany({
    orderBy: { startDate: "desc" },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      description: true,
      skills: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
