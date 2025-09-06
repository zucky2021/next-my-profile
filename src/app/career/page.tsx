import { getAchievements } from "@/dal/achievement/getAchievements";
import { getCareers } from "@/dal/career/getCareers";
import { SkillTag } from "@prisma/client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経歴 | My Profile",
  description: "転職歴と業務実績の詳細",
};

const CareerPage = async () => {
  const careers = await getCareers();
  const achievements = await getAchievements();

  // FIXME: ログ出力
  console.log("env: ", process.env.DATABASE_URL);
  console.log("env: ", process.env.DIRECT_URL);
  console.log(careers);
  console.log(achievements);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">経歴</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          転職歴
        </h2>

        <div className="space-y-8">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {career.company}
                  </h3>
                  <p className="text-gray-600">{career.description}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {career.startDate.toLocaleDateString()} -{" "}
                  {career.endDate
                    ? career.endDate.toLocaleDateString()
                    : "現在"}
                </span>
              </div>
              <a
                href={career.url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                企業情報
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          主要業務実績
        </h2>

        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
            >
              <p className="text-gray-600 mb-2 rounded-full">
                {achievement.startDate.toLocaleDateString()} -{" "}
                {achievement.endDate
                  ? achievement.endDate.toLocaleDateString()
                  : "現在"}
              </p>
              <p className="text-gray-700 mb-4">
                {achievement.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              {achievement.skills && (
                <div className="flex flex-wrap gap-2">
                  {achievement.skills.map((skillTag: SkillTag) => (
                    <span
                      key={skillTag.id}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {skillTag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* スキルセクション */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          技術スキル
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              フロントエンド
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">React / Next.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">TypeScript</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Vue.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              バックエンド
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Node.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Java / Spring</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Python</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
