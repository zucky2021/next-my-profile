import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export type SkillTagListItem = Prisma.SkillTagGetPayload<{
  select: typeof skillTagSelect;
}>;

export const skillTagSelect = {
  id: true,
  name: true,
};

/**
 * スキルタグ一覧を取得する
 */
export const getSkillTags = async () => {
  return await prisma.skillTag.findMany({
    orderBy: { name: "asc" },
    select: skillTagSelect,
  });
};
