import { Prisma } from "@prisma/client";

export const hobbiesSeedData: Prisma.HobbyCreateManyInput[] = [
  {
    title: "プログラミング",
    description:
      "新しい技術を学び、個人プロジェクトを開発することが大好きです。",
    icon: "💻",
    details: [
      "新しいフレームワークやライブラリの学習",
      "個人アプリケーションの開発",
      "技術ブログの執筆",
    ],
    relatedSkills: ["Obsidian", "Cursor", "Markdown"],
  },
  {
    title: "読書",
    description: "技術書から小説まで、幅広いジャンルの本を読むことが好きです。",
    icon: "📚",
    details: [
      "技術書（プログラミング、アーキテクチャ）",
      "小説（SF、ミステリー、ファンタジー、恋愛）",
      "自己啓発書",
    ],
    relatedSkills: ["知識習得", "思考力", "文章理解力"],
  },
  {
    title: "写真撮影",
    description:
      "風景や街並みを撮影することが好きで、新しい視点を見つけることを楽しんでいます。",
    icon: "📷",
    details: ["風景写真（自然、都市、建築）", "写真編集・加工"],
    relatedSkills: ["構図", "ライティング", "Google Photos"],
  },
  {
    title: "旅行",
    description:
      "新しい場所を訪れ、異なる文化や人々との出会いを楽しんでいます。",
    icon: "✈️",
    details: [
      "国内旅行（温泉、観光地、グルメ）",
      "一人旅",
      "写真撮影を兼ねた旅行",
    ],
    relatedSkills: ["計画力", "適応力", "コミュニケーション", "英語"],
  },
  {
    title: "料理",
    description: "新しいレシピに挑戦することが好きです。",
    icon: "👨‍🍳",
    details: ["和食（定番料理から創作料理まで）", "イタリアン"],
    relatedSkills: ["創造力", "段取り力", "味覚", "衛生管理"],
  },
  {
    title: "カフェ巡り",
    description: "空いた時間にカフェでゆっくりと過ごしています。",
    icon: "🍵",
    details: ["モダンカフェ", "喫茶店"],
    relatedSkills: [],
  },
  {
    title: "食べ歩き",
    description: "仕事帰りや休みの日にネットで見つけたお店を訪れています。",
    icon: "🍜",
    details: ["イタリアン", "フレンチ", "和食", "居酒屋", "バー", "韓国料理"],
    relatedSkills: [],
  },
  {
    title: "筋トレ",
    description: "健康維持と気分転換のために筋トレや有酸素運動をしています。",
    icon: "💪",
    details: ["筋肉を鍛える", "健康維持", "気分転換", "有酸素運動"],
    relatedSkills: ["筋肉", "健康", "ストレス解消"],
  },
  {
    title: "温泉・サウナ・岩盤浴",
    description: "健康維持と気分転換のために温泉・サウナ・岩盤浴をしています。",
    icon: "🌊",
    details: ["温泉", "サウナ", "岩盤浴"],
    relatedSkills: ["健康", "ストレス解消"],
  },
  {
    title: "ダーツ",
    description: "2次会などでよくダーツをしています。",
    icon: "🎯",
    details: ["01", "CRICKET", "COUNT UP"],
    relatedSkills: ["集中力", "計算力"],
  },
  {
    title: "麻雀",
    description: "エンジニア仲間や友達と嗜む程度に麻雀をしています。",
    icon: "🀄️",
    details: [],
    relatedSkills: ["コミュニケーション", "集中力"],
  },
  {
    title: "音楽",
    description: "様々なジャンルの音楽を聴くことが好きです。",
    icon: "🎵",
    details: ["邦楽", "ロック、ジャズ", "クラシック音楽"],
    relatedSkills: ["リズム感", "集中力"],
  },
];
