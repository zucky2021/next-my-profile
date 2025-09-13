import prisma from "../shared/lib/prisma";
import { careerSeedData } from "../features/career/seed-data";
import { EmploymentType } from "@prisma/client";
import { achievementSeedData } from "@/features/achievement/seed-data";
import { skillTagSeedData } from "@/features/skill-tag/seed-data";
import { qualificationSeedData } from "../features/qualification/seed-data";

async function main() {
  console.log("🌱 データベースのシードを開始します...");

  try {
    console.log("既存データをTRUNCATEで削除及びIDリセット中...");
    await prisma.$executeRaw`TRUNCATE TABLE "achievements", "skill_tags", "qualifications", "careers" RESTART IDENTITY CASCADE`;
    console.log("既存データのTRUNCATEが完了しました");

    console.log("経歴データを作成中...");
    for (const [index, data] of careerSeedData.entries()) {
      console.log(`処理中 ${index + 1}/${careerSeedData.length}:`, {
        company: data.company,
        employmentType: data.employmentType,
        startDate: data.startDate,
        endDate: data.endDate,
      });

      try {
        await prisma.career.create({
          data: {
            company: data.company,
            url: data.url,
            employmentType: data.employmentType as EmploymentType,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description,
          },
        });
        console.log(`✅ ${data.company} の経歴を作成しました`);
      } catch (error) {
        console.error(`❌ ${data.company} の経歴作成でエラー:`, error);
        throw error;
      }
    }
    console.log(`✅ ${careerSeedData.length}件の経歴を作成しました`);

    console.log("スキルタグデータを作成中...");
    for (const data of skillTagSeedData) {
      await prisma.skillTag.create({
        data: {
          name: data.name,
        },
      });
    }
    console.log(`✅ ${skillTagSeedData.length}件のスキルタグを作成しました`);

    console.log("実績データを作成中...");
    for (const data of achievementSeedData) {
      await prisma.achievement.create({
        data: {
          startDate: data.startDate,
          endDate: data.endDate,
          description: data.description,
          skills: {
            connect: data.skills.map((name: string) => ({ name })),
          },
        },
      });
    }
    console.log(`✅ ${achievementSeedData.length}件の実績を作成しました`);

    console.log("資格データを作成中...");
    for (const data of qualificationSeedData) {
      await prisma.qualification.create({
        data: {
          name: data.name,
          acquiredAt: data.acquiredAt,
        },
      });
    }
    console.log(`✅ ${qualificationSeedData.length}件の資格を作成しました`);

    console.log("データベースのシードが完了しました！");
  } catch (error) {
    console.error("❌ シード中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
