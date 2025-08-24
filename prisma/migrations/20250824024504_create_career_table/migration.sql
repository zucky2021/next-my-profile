-- CreateEnum
CREATE TYPE "public"."EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERN');

-- CreateTable
CREATE TABLE "public"."careers" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "employmentType" "public"."EmploymentType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);
