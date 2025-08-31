-- CreateTable
CREATE TABLE "public"."achievements" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skill_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_AchievementToSkillTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AchievementToSkillTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "skill_tags_name_key" ON "public"."skill_tags"("name");

-- CreateIndex
CREATE INDEX "_AchievementToSkillTag_B_index" ON "public"."_AchievementToSkillTag"("B");

-- AddForeignKey
ALTER TABLE "public"."_AchievementToSkillTag" ADD CONSTRAINT "_AchievementToSkillTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AchievementToSkillTag" ADD CONSTRAINT "_AchievementToSkillTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."skill_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
