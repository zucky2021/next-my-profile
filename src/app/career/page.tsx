import { getAchievements } from "@/features/achievement/getAchievements";
import { getCareers } from "@/features/career/getCareers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "経歴 | My Profile",
  description: "転職歴と業務実績の詳細",
};

const CareerPage = async () => {
  const [careers, achievements] = await Promise.all([
    getCareers(),
    getAchievements(),
  ]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">経歴</h1>

      <section className="mb-12">
        <h2 className="mb-6 border-b-2 border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
          転職歴
        </h2>

        <div className="space-y-8">
          {careers?.map((career) => (
            <div
              key={career.id}
              className="rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {career.company}
                  </h3>
                  <p className="text-gray-600">{career.description}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                  {career.startDate.toLocaleDateString("ja-JP")} -{" "}
                  {career.endDate
                    ? career.endDate.toLocaleDateString("ja-JP")
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
        <h2 className="mb-6 border-b-2 border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
          主要業務実績
        </h2>

        <div className="space-y-6">
          {achievements?.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-lg border-l-4 border-green-500 bg-white p-6 shadow-md"
            >
              <p className="mb-2 rounded-full text-gray-600">
                {achievement.startDate.toLocaleDateString()} -{" "}
                {achievement.endDate
                  ? achievement.endDate.toLocaleDateString()
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
                <div className="flex flex-wrap gap-2">
                  {achievement.skills.map((skillTag) => (
                    <span
                      key={skillTag.id}
                      className="rounded bg-green-100 px-2 py-1 text-xs text-green-800"
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
        <h2 className="mb-6 border-b-2 border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
          技術スキル
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              フロントエンド
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">React / Next.js</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">TypeScript</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Vue.js</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              バックエンド
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Node.js</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-600"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Java / Spring</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-600"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Python</span>
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-600"
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
