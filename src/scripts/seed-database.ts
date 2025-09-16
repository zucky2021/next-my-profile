import prisma from "../shared/lib/prisma";
import { careerSeedData } from "../features/career/seed-data";
import { achievementSeedData } from "../features/achievement/seed-data";
import { skillTagSeedData } from "../features/skill-tag/seed-data";
import { qualificationSeedData } from "../features/qualification/seed-data";
import { hobbiesSeedData } from "../features/hobby/seed-data";
import { EmploymentType } from "@prisma/client";

/**
 * データベースの初期化
 */
const clearDatabase = async () => {
  console.log("🗑️  既存データをクリア中...");

  await prisma.$executeRaw`
    TRUNCATE TABLE "achievements", "skill_tags", "qualifications", "careers", "hobbies" 
    RESTART IDENTITY CASCADE
  `;

  console.log("✅ データベースをクリアしました");
};

/**
 * 経歴データの作成
 */
const seedCareers = async () => {
  console.log("💼 経歴データを作成中...");

  const result = await prisma.career.createMany({
    data: careerSeedData.map((career) => ({
      ...career,
      employmentType: career.employmentType as EmploymentType,
    })),
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count}件の経歴を作成しました`);
  return result;
};

/**
 * スキルタグデータの作成
 */
const seedSkillTags = async () => {
  console.log("🏷️  スキルタグを作成中...");

  const result = await prisma.skillTag.createMany({
    data: skillTagSeedData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count}件のスキルタグを作成しました`);
  return result;
};

/**
 * 資格データの作成
 */
const seedQualifications = async () => {
  console.log("🎓 資格データを作成中...");

  const result = await prisma.qualification.createMany({
    data: qualificationSeedData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count}件の資格を作成しました`);
  return result;
};

/**
 * 趣味データの作成
 */
const seedHobbies = async () => {
  console.log("🎨 趣味データを作成中...");

  const result = await prisma.hobby.createMany({
    data: hobbiesSeedData,
    skipDuplicates: true,
  });

  console.log(`✅ ${result.count}件の趣味を作成しました`);
  return result;
};

/**
 * 実績データの作成（スキルタグとのリレーション含む）
 */
const seedAchievements = async () => {
  console.log("🏆 実績データを作成中...");

  let count = 0;

  for (const achievement of achievementSeedData) {
    await prisma.achievement.create({
      data: {
        startDate: achievement.startDate,
        endDate: achievement.endDate,
        description: achievement.description,
        skills: {
          connect: achievement.skills.map((skillName: string) => ({
            name: skillName,
          })),
        },
      },
    });
    count++;
  }

  console.log(`✅ ${count}件の実績を作成しました`);
  return { count };
};

/**
 * 全体の進捗表示
 */
const displaySummary = (results: {
  careers: number;
  skillTags: number;
  qualifications: number;
  hobbies: number;
  achievements: number;
}) => {
  console.log("\n📊 シード結果サマリー:");
  console.log(`   経歴: ${results.careers}件`);
  console.log(`   スキルタグ: ${results.skillTags}件`);
  console.log(`   資格: ${results.qualifications}件`);
  console.log(`   趣味: ${results.hobbies}件`);
  console.log(`   実績: ${results.achievements}件`);
  console.log("\n🎉 データベースのシードが完了しました！");
};

/**
 * メイン処理
 */
const main = async () => {
  console.log("🌱 データベースのシードを開始します...\n");

  try {
    await clearDatabase();

    const [careerResult, skillTagResult, qualificationResult, hobbiesResult] =
      await Promise.all([
        seedCareers(),
        seedSkillTags(),
        seedQualifications(),
        seedHobbies(),
      ]);

    const achievementResult = await seedAchievements();

    displaySummary({
      careers: careerResult.count,
      skillTags: skillTagResult.count,
      qualifications: qualificationResult.count,
      hobbies: hobbiesResult.count,
      achievements: achievementResult.count,
    });
  } catch (error) {
    console.error("\n❌ シード処理中にエラーが発生しました:");
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
