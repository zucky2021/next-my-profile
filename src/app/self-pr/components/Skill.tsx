import React from "react";

export function SkillsSection() {
  const skills = [
    {
      category: "フロントエンド",
      skills: [
        { name: "HTML/CSS/JS", level: 90 },
        { name: "Sass", level: 75 },
        { name: "TypeScript", level: 80 },
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 75 },
      ],
    },
    {
      category: "バックエンド",
      skills: [
        { name: "Go", level: 80 },
        { name: "Gin", level: 80 },
        { name: "Laravel", level: 75 },
        { name: "PHP", level: 80 },
        { name: "MySQL", level: 75 },
        { name: "Ruby on Rails", level: 80 },
        { name: "Prisma", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Supabase", level: 80 },
      ],
    },
    {
      category: "その他",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Vercel", level: 80 },
      ],
    },
  ];

  return (
    <section className="rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">技術スキル</h2>
      <div className="space-y-8">
        {skills.map((category) => (
          <div key={category.category}>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
