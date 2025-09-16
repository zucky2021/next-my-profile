import Image from "next/image";
import SnsBtn from "./components/SnsBtn";
import Link from "next/link";

export default function Home() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* プロフィール画像とメインコンテンツ */}
        <div className="mx-auto max-w-4xl">
          {/* プロフィール画像セクション */}
          <div className="mb-8 text-center" id="key-visual">
            <div className="relative inline-block">
              <Image
                src="/main.jpg"
                alt="プロフィール写真"
                width={400}
                height={400}
                priority
                className="rounded-full border-4 border-white object-cover shadow-xl"
                style={{
                  aspectRatio: "1/1",
                }}
              />
            </div>
          </div>

          {/* 名前とタイトル */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">鈴木 宏尭</h1>
            <p className="mb-4 text-xl text-gray-600">フルスタックエンジニア</p>
            <div className="mx-auto h-1 w-24 rounded-full bg-blue-600"></div>
          </div>

          <section
            className="mb-8 rounded-xl bg-white p-8 shadow-lg"
            id="self-introduction"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900">はじめに</h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              ご覧いただきありがとうございます。三重県出身のフルスタックエンジニアの鈴木宏尭と申します。
              <br />
              <strong>「ものづくりへの情熱」</strong>
              を胸に製造業からITエンジニアへの挑戦を決意し、現在はものづくりの最前線で活躍しています。
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              トヨタグループで4年間チームマネジメントと継続的改善活動を通じて組織全体の生産性向上に貢献しました。
              <br />
              学生時代の野球・弓道部で培った
              <strong>チームワークと粘り強さ</strong>
              が、この成果の原動力となっています。
            </p>
            <p className="mb-6 leading-relaxed text-gray-700">
              その後、プログラミングスクールで基礎を学び、現在は
              <strong>React、Go、Laravel</strong>
              を駆使した Webアプリケーション開発を得意としています。
              <br />
              トヨタグループで身につけた
              <strong>品質管理と効率化のマインド</strong>
              を活かし、
              ユーザー体験を最優先に考えた高品質なソフトウェア開発に取り組んでいます。
            </p>

            <div className="border-t border-gray-200 pt-6">
              <SnsBtn />
            </div>
          </section>

          <section
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            id="navigation-cards"
          >
            <Link
              href="/career"
              className="group rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">経歴</h3>
              <p className="text-sm text-gray-600">
                これまでの職歴と実績をご覧いただけます
              </p>
            </Link>

            <Link
              href="/hobbies"
              className="group rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a4 4 0 011-7.914 3 3 0 10-6.172 0A4.002 4.002 0 019 10zm2.5 5a3.5 3.5 0 10-7 0v.5h7v-.5z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">趣味</h3>
              <p className="text-sm text-gray-600">
                プライベートでの活動や興味のあることについて
              </p>
            </Link>

            <Link
              href="/self-pr"
              className="group rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                自己PR
              </h3>
              <p className="text-sm text-gray-600">
                強みやスキル、これまでの取り組みについて
              </p>
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
