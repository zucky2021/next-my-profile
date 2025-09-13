import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export type CareerListItem = Prisma.CareerGetPayload<{
  select: typeof careerSelect;
}>;

export const careerSelect = {
  id: true,
  company: true,
  description: true,
  endDate: true,
  startDate: true,
  url: true,
  employmentType: true,
};

export const getCareers = async () => {
  return await prisma.career.findMany({
    orderBy: { startDate: "desc" },
    select: careerSelect,
  });
};
