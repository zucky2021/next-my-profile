import prisma from "../lib/prisma";
import { careerSeedData } from "../dal/career/seed-data";
import { EmploymentType } from "@prisma/client";
import { achievementSeedData } from "@/dal/achievement/seed-data";
import { skillTagSeedData } from "@/dal/skill-tag/seed-data";
import { qualificationSeedData } from "../dal/qualification/seed-data";

async function main() {
  console.log("🌱 データベースのシードを開始します...");

  try {
    console.log("既存データを削除中...");
    await prisma?.$transaction([
      prisma.achievement.deleteMany(),
      prisma.skillTag.deleteMany(),
      prisma.qualification.deleteMany(),
      prisma.career.deleteMany(),
    ]);
    console.log("既存データを削除しました");

    console.log("経歴データを作成中...");
    for (const data of careerSeedData) {
      await prisma?.career.create({
        data: {
          ...data,
          employmentType: data.employmentType as EmploymentType,
        },
      });
    }
    console.log(`✅ ${careerSeedData.length}件の経歴を作成しました`);

    console.log("スキルタグデータを作成中...");
    for (const data of skillTagSeedData) {
      await prisma?.skillTag.create({ data });
    }

    console.log("実績データを作成中...");
    for (const data of achievementSeedData) {
      await prisma?.achievement.create({
        data: {
          ...data,
          skills: {
            connect: data.skills.map((name: string) => ({ name })),
          },
        },
      });
    }
    console.log(`✅ ${achievementSeedData.length}件の実績を作成しました`);

    console.log("資格データを作成中...");
    for (const data of qualificationSeedData) {
      await prisma?.qualification.create({ data });
    }
    console.log(`✅ ${qualificationSeedData.length}件の資格を作成しました`);

    console.log("データベースのシードが完了しました！");
  } catch (error) {
    console.error("❌ シード中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma?.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
