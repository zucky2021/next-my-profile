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
        { name: "GO", level: 80 },
        { name: "Gin", level: 80 },
        { name: "Laravel", level: 75 },
        { name: "PHP", level: 80 },
        { name: "MySQL", level: 75 },
        { name: "Ruby onRails", level: 80 },
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
    <section className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">技術スキル</h2>
      <div className="space-y-8">
        {skills.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
