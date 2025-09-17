import { Metadata } from "next";
import { getHobbies } from "@/features/hobby/getHobbies";

export const metadata: Metadata = {
  title: "趣味 | 鈴木宏尭",
  description: "私の趣味や興味のあること",
  openGraph: {
    title: "趣味 | 鈴木宏尭",
    description: "私の趣味や興味のあること",
    type: "website",
  },
  alternates: {
    canonical: "/hobbies",
  },
};

export default async function HobbiesPage() {
  const hobbies = await getHobbies();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">趣味</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          仕事以外の時間で楽しんでいることや、興味を持っていることを紹介します
        </p>
      </div>

      <ul
        className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        id="hobbies"
        aria-label="趣味一覧"
      >
        {hobbies.map((hobby) => (
          <li
            key={hobby.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            aria-label="趣味カード"
          >
            <div className="p-6">
              <div className="mb-4 flex items-center">
                <span className="mr-3 text-3xl" aria-hidden="true">
                  {hobby.icon}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {hobby.title}
                  </h2>
                </div>
              </div>

              <p className="mb-4 text-gray-600">{hobby.description}</p>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  具体的な活動
                </h3>
                <ul className="space-y-1">
                  {hobby.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <span className="mr-2 text-blue-500">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  関連スキル
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobby.relatedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section
        className="mb-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
        aria-label="趣味の統計"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">趣味の統計</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold" aria-label="主要な趣味数">
              {hobbies.length}
            </div>
            <div className="text-blue-100">主要な趣味</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold" aria-label="関連スキル数">
              {
                [...new Set(hobbies.flatMap((hobby) => hobby.relatedSkills))]
                  .length
              }
            </div>
            <div className="text-blue-100">関連スキル</div>
          </div>
        </div>
      </section>

      <section className="mb-12" aria-label="趣味と仕事の関係">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          趣味と仕事の関係
        </h2>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3
                className="mb-4 text-lg font-semibold text-gray-900"
                aria-label="趣味から得られるスキル"
              >
                趣味から得られるスキル
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 text-green-500">✓</span>
                  <div>
                    <span className="font-medium">創造性</span>
                    <p className="text-sm text-gray-600">
                      写真撮影や料理から得られる創造的思考
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-500">✓</span>
                  <div>
                    <span className="font-medium">問題解決力</span>
                    <p className="text-sm text-gray-600">
                      プログラミングや旅行計画から得られる論理的思考
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-500">✓</span>
                  <div>
                    <span className="font-medium">コミュニケーション</span>
                    <p className="text-sm text-gray-600">
                      旅行や料理を通じた人との交流
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-500">✓</span>
                  <div>
                    <span className="font-medium">継続学習</span>
                    <p className="text-sm text-gray-600">
                      読書や新しい技術の学習から得られる習慣
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className="mb-4 text-lg font-semibold text-gray-900"
                aria-label="仕事への活かし方"
              >
                仕事への活かし方
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-500">→</span>
                  <div>
                    <span className="font-medium">UI/UXデザイン</span>
                    <p className="text-sm text-gray-600">
                      写真撮影の構図感覚を活かしたデザイン
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-500">→</span>
                  <div>
                    <span className="font-medium">プロジェクト管理</span>
                    <p className="text-sm text-gray-600">
                      旅行計画の段取り力を活かした計画立案
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-500">→</span>
                  <div>
                    <span className="font-medium">チームワーク</span>
                    <p className="text-sm text-gray-600">
                      料理の協調性を活かしたチーム開発
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-500">→</span>
                  <div>
                    <span className="font-medium">技術向上</span>
                    <p className="text-sm text-gray-600">
                      継続的な学習習慣による技術力向上
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8" aria-label="今後の目標">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          今後の目標
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3
              className="mb-3 text-lg font-semibold text-gray-900"
              aria-label="短期目標"
            >
              短期目標（3ヶ月）
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 新しいプログラミング言語の習得</li>
              <li>• 写真撮影技術の向上</li>
              <li>• 料理レパートリーの拡大</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3
              className="mb-3 text-lg font-semibold text-gray-900"
              aria-label="長期目標"
            >
              長期目標（1年）
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 個人アプリケーションのリリース</li>
              <li>• 写真展の開催</li>
              <li>• 海外旅行での異文化交流</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
