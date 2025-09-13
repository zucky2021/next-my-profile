import prisma from "@/shared/lib/prisma";

export const getCareers = async () => {
  return await prisma.career.findMany({
    orderBy: { startDate: "desc" },
    select: {
      id: true,
      company: true,
      description: true,
      endDate: true,
      startDate: true,
      url: true,
      employmentType: true,
    },
  });
};
