import prisma from "@/shared/lib/prisma";

export const getCareers = async () => {
  return await prisma?.career.findMany({
    orderBy: { startDate: "desc" },
  });
};
