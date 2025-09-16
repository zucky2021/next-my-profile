import prisma from "@/shared/lib/prisma";
import { Hobby } from "@prisma/client";

/**
 * 趣味一覧を取得する
 * @returns 趣味一覧（表示順序でソート）
 */
export async function getHobbies(): Promise<Hobby[]> {
  const hobbies = await prisma.hobby.findMany();

  return hobbies;
}
