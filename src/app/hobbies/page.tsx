import { Metadata } from "next";

export const metadata: Metadata = {
  title: "趣味 | My Profile",
  description: "私の趣味や興味のあること",
  openGraph: {
    title: "趣味 | My Profile",
    description: "私の趣味や興味のあること",
    type: "website",
  },
  alternates: {
    canonical: "/hobbies",
  },
};

// 趣味の型定義
type Hobby = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  details: string[];
  relatedSkills: string[];
};

// 趣味データ
const hobbies: Hobby[] = [
  {
    id: "1",
    title: "プログラミング",
    description:
      "新しい技術を学び、個人プロジェクトを開発することが大好きです。",
    icon: "💻",
    category: "技術",
    details: [
      "新しいフレームワークやライブラリの学習",
      "オープンソースプロジェクトへの貢献",
      "個人アプリケーションの開発",
      "技術ブログの執筆",
    ],
    relatedSkills: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    title: "読書",
    description: "技術書から小説まで、幅広いジャンルの本を読むことが好きです。",
    icon: "📚",
    category: "学習",
    details: [
      "技術書（プログラミング、デザイン、アーキテクチャ）",
      "ビジネス書（リーダーシップ、マネジメント）",
      "小説（SF、ミステリー、ファンタジー）",
      "自己啓発書",
    ],
    relatedSkills: ["知識習得", "思考力", "文章理解力"],
  },
  {
    id: "3",
    title: "写真撮影",
    description:
      "風景や街並みを撮影することが好きで、新しい視点を見つけることを楽しんでいます。",
    icon: "📷",
    category: "アート",
    details: [
      "風景写真（自然、都市、建築）",
      "ストリートフォトグラフィ",
      "ポートレート撮影",
      "写真編集・加工",
    ],
    relatedSkills: ["構図", "ライティング", "Adobe Lightroom", "Photoshop"],
  },
  {
    id: "4",
    title: "旅行",
    description:
      "新しい場所を訪れ、異なる文化や人々との出会いを楽しんでいます。",
    icon: "✈️",
    category: "体験",
    details: [
      "国内旅行（温泉、観光地、グルメ）",
      "海外旅行（アジア、ヨーロッパ）",
      "一人旅",
      "写真撮影を兼ねた旅行",
    ],
    relatedSkills: ["計画力", "適応力", "コミュニケーション", "英語"],
  },
  {
    id: "5",
    title: "料理",
    description:
      "新しいレシピに挑戦し、家族や友人に料理を振る舞うことが好きです。",
    icon: "👨‍🍳",
    category: "生活",
    details: [
      "和食（定番料理から創作料理まで）",
      "イタリアン、フレンチ",
      "アジア料理（タイ、ベトナム、韓国）",
      "パン・お菓子作り",
    ],
    relatedSkills: ["創造力", "段取り力", "味覚", "衛生管理"],
  },
  {
    id: "6",
    title: "音楽",
    description:
      "様々なジャンルの音楽を聴くことが好きで、時には楽器演奏も楽しみます。",
    icon: "🎵",
    category: "エンターテインメント",
    details: [
      "ロック、ポップス、ジャズ",
      "クラシック音楽",
      "ギター演奏（アコースティック）",
      "音楽イベント参加",
    ],
    relatedSkills: ["リズム感", "集中力", "表現力"],
  },
];

export default function HobbiesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">趣味</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          仕事以外の時間で楽しんでいることや、興味を持っていることを紹介します
        </p>
      </div>

      {/* 趣味一覧 */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <div
            key={hobby.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              {/* アイコンとタイトル */}
              <div className="mb-4 flex items-center">
                <span className="mr-3 text-3xl" aria-hidden="true">
                  {hobby.icon}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {hobby.title}
                  </h2>
                  <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-600">
                    {hobby.category}
                  </span>
                </div>
              </div>

              {/* 説明 */}
              <p className="mb-4 text-gray-600">{hobby.description}</p>

              {/* 詳細 */}
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

              {/* 関連スキル */}
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
          </div>
        ))}
      </div>

      {/* 趣味の統計 */}
      <section className="mb-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <h2 className="mb-6 text-center text-2xl font-bold">趣味の統計</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">6</div>
            <div className="text-blue-100">主要な趣味</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">4</div>
            <div className="text-blue-100">カテゴリ</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">20+</div>
            <div className="text-blue-100">関連スキル</div>
          </div>
        </div>
      </section>

      {/* 趣味と仕事の関係 */}
      <section className="mb-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          趣味と仕事の関係
        </h2>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
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
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
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

      {/* 今後の目標 */}
      <section className="rounded-lg bg-gray-50 p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          今後の目標
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              短期目標（3ヶ月）
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 新しいプログラミング言語の習得</li>
              <li>• 写真撮影技術の向上</li>
              <li>• 料理レパートリーの拡大</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
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
