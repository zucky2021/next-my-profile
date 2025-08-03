import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '経歴 | My Profile',
  description: '転職歴と業務実績の詳細',
}

export default function CareerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">経歴</h1>
      
      {/* 転職歴セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          転職歴
        </h2>
        
        <div className="space-y-8">
          {/* 現在の職務 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">株式会社テックソリューション</h3>
                <p className="text-gray-600">シニアエンジニア</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                2022年4月 - 現在
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              フルスタックエンジニアとして、Webアプリケーションの設計・開発・運用を担当。
              React、Next.js、TypeScriptを使用したモダンな開発を推進。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
            </div>
          </div>

          {/* 前職 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">スタートアップ株式会社</h3>
                <p className="text-gray-600">フロントエンドエンジニア</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                2020年4月 - 2022年3月
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              スタートアップ企業でフロントエンド開発を担当。ユーザー体験の向上とパフォーマンス最適化に注力。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vue.js</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">JavaScript</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">CSS3</span>
            </div>
          </div>

          {/* 初職 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">IT企業株式会社</h3>
                <p className="text-gray-600">プログラマー</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                2018年4月 - 2020年3月
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              新卒として入社し、Javaを使用したバックエンド開発を担当。データベース設計からAPI開発まで幅広く経験。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Java</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Spring Boot</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">MySQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 業務実績セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          主要業務実績
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ECサイトのリニューアルプロジェクト
            </h3>
            <p className="text-gray-600 mb-2">2023年1月 - 2023年6月</p>
            <p className="text-gray-700 mb-4">
              既存のECサイトをNext.jsとTypeScriptを使用して完全リニューアル。
              パフォーマンスを50%向上させ、ユーザー体験を大幅に改善。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Next.js</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Tailwind CSS</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              社内管理システムの構築
            </h3>
            <p className="text-gray-600 mb-2">2022年7月 - 2022年12月</p>
            <p className="text-gray-700 mb-4">
              従業員100名規模の企業向け管理システムを設計・開発。
              認証機能、権限管理、データ分析機能を実装。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">React</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Node.js</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">PostgreSQL</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              モバイルアプリの開発
            </h3>
            <p className="text-gray-600 mb-2">2021年4月 - 2021年9月</p>
            <p className="text-gray-700 mb-4">
              React Nativeを使用したモバイルアプリを開発。
              iOS・Android両プラットフォームに対応し、10万ダウンロードを達成。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">React Native</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Firebase</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Redux</span>
            </div>
          </div>
        </div>
      </section>

      {/* スキルセクション */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
          技術スキル
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">フロントエンド</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">React / Next.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">TypeScript</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Vue.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">バックエンド</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Node.js</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Java / Spring</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Python</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 