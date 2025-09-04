import { prisma } from "@/lib/prisma";

export const getCareers = async () => {
  // ビルド時はデータベース接続をスキップ
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    console.log("Skipping database connection during build");
    return [];
  }

  try {
    return await prisma.career.findMany({
      orderBy: { startDate: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch careers:", error);
    return [];
  }
};
