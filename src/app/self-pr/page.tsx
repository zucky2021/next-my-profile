import { PortfolioSection } from "@/app/components/PortfolioSection";
import { SkillsSection } from "@/app/components/SkillsSection";

export default function SelfPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">自己PR</h1>
          <p className="text-xl text-gray-600">
            エンジニアとしての成長と実績をご紹介します
          </p>
        </header>

        <div className="space-y-12">
          <SkillsSection />

          <PortfolioSection />

          <article className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">PR文</h2>

            <section className="mb-4 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                情報収集とメンバーの知識向上のための共有
              </h3>
              <p>
                私は常に最新の技術やトレンドを把握するため、IT関連のメルマガを購読し、日々情報収集を行っており、
                <br />
                「Connpass」や「AWS Summit
                Japan」、エンジニアイベントにも積極的に参加し、友人から得た情報も活用して、新しい技術のキャッチアップを続けています。
                <br />
                プログラミングスクールやUdemyなどのコミュニティを通じて、仲間と共に学び、成長しています。
                <br />
                直近の個人開発では、業務アプリの改善に取り組んでおり、クリーンアーキテクチャやDDD設計を基に、Laravel、Vite、React、TypeScript、Sass、Dockerを使用した開発を行っています。
                <br />
                設定値最高レベルの静的解析、コードの自動フォーマット、自動ソースレビュー、自動テストなどを可読性と品質を高めたコードを実現しています。
                <br />
                また、Next.js、Go、Djangoにも触れており、これらの技術を今後さらに深めて実務に活かしていきたいと考えています。
                <br />
                社内のLT会への参加や、AtCoderのコンテスト及び社内の部活にも積極的に参加し、職場を超えた仲間との知識共有にも力を入れています。
                <br />
                こうして得た知識や経験は、技術ブログや社内の技術チャンネル、LTなどで共有し、チーム全体の知識向上に貢献しています。
                <br />
                今後も可能であれば御社でこのような取り組みを継続し、技術力の向上に努めていきたいです。
              </p>
            </section>

            <section className="mb-4 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                業務を進める上での責任感
              </h3>
              <p>
                私は、これまで一度も納期に遅れたことがありません。
                <br />
                業務の進行にあたり、個人的にNotion、Jira、を使用してタスクの洗い出しと進捗管理を行ってきました。
                <br />
                タスクボードやタイムラインを活用することで、進捗状況を明確に把握し、もし遅延の可能性が生じた際には、リーダーやメンバーにすぐに共有し、チーム全体での可視化を図ってきました。
                <br />
                そのため、仕様変更や追加実装などが発生した場合でも柔軟に対応することが可能です。
              </p>
            </section>

            <section className="mb-4 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                サービス拡大のための開発力
              </h3>
              <p>
                サービスの稼働開始後も、単なる運用にとどまらず、日々改善に取り組んでいます。ユーザー視点に立って自らサービスを利用し、ユーザーの利便性向上を図っています。
                <br />
                さらに、「あるべき姿」を超える「ありたい姿」を上司に提案し、ボトムアップによる改善活動にも努めています。これにより、サービスの品質向上とユーザー満足度の向上に貢献してきました。
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
