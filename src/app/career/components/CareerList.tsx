"use client";

import { AchievementListItem } from "@/features/achievement/getAchievements";
import { SkillTagListItem } from "@/features/skill-tag/getSkillTags";
import React, { useState } from "react";
import { CareerFilter } from "./CareerFilter";

interface CareerListProps {
  achievements: AchievementListItem[];
}

export const CareerList = ({ achievements }: CareerListProps) => {
  const [filteredAchievements, setFilteredAchievements] =
    useState<AchievementListItem[]>(achievements);

  const handleFilterChange = (selectedSkills: SkillTagListItem[]) => {
    if (selectedSkills.length === 0) {
      setFilteredAchievements(achievements);
    } else {
      const skillIds = selectedSkills.map((skill) => skill.id);
      setFilteredAchievements(
        achievements.filter((achievement) =>
          achievement.skills.some((skill) => skillIds.includes(skill.id))
        )
      );
    }
  };

  /** 重複を除いたすべてのスキルタグを取得 */
  const allSkillTags = React.useMemo(() => {
    const skillMap = new Map<number, SkillTagListItem>();
    achievements.forEach((achievement) => {
      achievement.skills.forEach((skill) => {
        skillMap.set(skill.id, skill);
      });
    });
    return Array.from(skillMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [achievements]);

  return (
    <>
      <CareerFilter
        skillTags={allSkillTags}
        onFilterChange={handleFilterChange}
      />

      <ul className="space-y-6" aria-label="主要業務実績リスト">
        {filteredAchievements?.map((achievement) => (
          <li
            key={achievement.id}
            className="rounded-lg border-l-4 border-green-500 bg-white p-6 shadow-md"
            aria-label="主要業務実績"
          >
            <p className="mb-2 rounded-full text-gray-600">
              {achievement.startDate.toLocaleDateString("ja-JP")} -{" "}
              {achievement.endDate
                ? achievement.endDate.toLocaleDateString("ja-JP")
                : "現在"}
            </p>
            <p className="mb-4 text-gray-700">
              {achievement.description.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            {achievement.skills && (
              <ul
                className="flex flex-wrap gap-2"
                aria-label="スキルタグリスト"
              >
                {achievement.skills.map((skillTag) => (
                  <li
                    key={skillTag.id}
                    className="rounded bg-green-100 px-2 py-1 text-xs text-green-800"
                    aria-label="スキルタグ"
                  >
                    {skillTag.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {filteredAchievements.length === 0 && (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <p className="text-gray-500">該当する実績が見つかりませんでした。</p>
        </div>
      )}
    </>
  );
};
