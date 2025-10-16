"use client";

import { SkillTagListItem } from "@/features/skill-tag/getSkillTags";
import { useState, useMemo } from "react";

interface CareerFilterProps {
  skillTags: SkillTagListItem[];
  onFilterChange: (selectedSkills: SkillTagListItem[]) => void;
}

export const CareerFilter = ({
  skillTags,
  onFilterChange,
}: CareerFilterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<SkillTagListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /** 入力値に基づいてフィルタリングされたスキルタグ */
  const filteredSkills = useMemo(() => {
    if (!inputValue.trim()) return skillTags;
    return skillTags.filter((skill) =>
      skill.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [skillTags, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleSkillSelect = (skill: SkillTagListItem) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      const newSelectedSkills = [...selectedSkills, skill];
      setSelectedSkills(newSelectedSkills);
      onFilterChange(newSelectedSkills);
    }
    setInputValue("");
    setIsOpen(false);
  };

  const handleSkillRemove = (skillId: number) => {
    const newSelectedSkills = selectedSkills.filter((s) => s.id !== skillId);
    setSelectedSkills(newSelectedSkills);
    onFilterChange(newSelectedSkills);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // 少し遅延させてクリックイベントを処理
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="skill-filter"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        スキルでフィルタ
      </label>

      {selectedSkills.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => handleSkillRemove(skill.id)}
                className="ml-1 text-blue-600 hover:text-blue-800"
                aria-label={`${skill.name}を削除`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          id="skill-filter"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="スキル名を入力..."
          className="w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />

        {isOpen && filteredSkills.length > 0 && (
          <div className="absolute z-10 mt-1 w-full max-w-xs rounded-md border border-gray-300 bg-white shadow-lg">
            <ul className="max-h-60 overflow-auto">
              {filteredSkills.map((skill) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    onClick={() => handleSkillSelect(skill)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    disabled={selectedSkills.some((s) => s.id === skill.id)}
                  >
                    {skill.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isOpen && inputValue.trim() && filteredSkills.length === 0 && (
          <div className="absolute z-10 mt-1 w-full max-w-xs rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-500 shadow-lg">
            該当するスキルが見つかりませんでした
          </div>
        )}
      </div>
    </div>
  );
};
