import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export type AchievementListItem = Prisma.AchievementGetPayload<{
  select: typeof achievementSelect;
}>;

export const achievementSelect = {
  id: true,
  startDate: true,
  endDate: true,
  description: true,
  skills: { select: { id: true, name: true } },
};

/**
 * 業務実績一覧を取得する
 */
export const getAchievements = async (): Promise<AchievementListItem[]> => {
  return prisma.achievement.findMany({
    orderBy: { startDate: "desc" },
    select: achievementSelect,
  });
};
