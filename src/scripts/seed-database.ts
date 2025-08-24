import { prisma } from "../lib/prisma";
import { careerSeedData } from "../dal/career/seed-data";
import { EmploymentType } from "@prisma/client";
// import { qualificationSeedData } from "../dal/qualification/seed-data";

async function main() {
  console.log("🌱 データベースのシードを開始します...");

  try {
    console.log("経歴を作成中...");
    for (const data of careerSeedData) {
      await prisma.career.create({
        data: {
          ...data,
          employmentType: data.employmentType as EmploymentType,
        },
      });
    }
    console.log(`✅ ${careerSeedData.length}件の経歴を作成しました`);

    // console.log("資格を作成中...");
    // for (const data of qualificationSeedData) {
    //   await prisma.qualification.create({ data });
    // }
    // console.log(`✅ ${qualificationSeedData.length}件の資格を作成しました`);

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
