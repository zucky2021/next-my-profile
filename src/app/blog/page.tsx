import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ブログ | My Profile',
  description: '技術記事や開発日記',
}

// ブログ記事の型定義
type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  tags: string[]
}

// サンプルブログ記事データ
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 14の新機能とベストプラクティス',
    excerpt: 'Next.js 14で導入された新機能について詳しく解説し、実際のプロジェクトでの活用方法を紹介します。',
    date: '2024-01-15',
    category: 'フロントエンド',
    readTime: '8分',
    tags: ['Next.js', 'React', 'TypeScript']
  },
  {
    id: '2',
    title: 'TypeScriptで型安全なAPIクライアントを構築する',
    excerpt: 'TypeScriptを使用して型安全なAPIクライアントを構築する方法と、実際のプロジェクトでの活用例を紹介します。',
    date: '2024-01-10',
    category: 'バックエンド',
    readTime: '12分',
    tags: ['TypeScript', 'API', 'バックエンド']
  },
  {
    id: '3',
    title: 'Tailwind CSSでモダンなUIを構築する',
    excerpt: 'Tailwind CSSを使用した効率的なスタイリング手法と、デザインシステムの構築について解説します。',
    date: '2024-01-05',
    category: 'デザイン',
    readTime: '6分',
    tags: ['CSS', 'Tailwind', 'デザイン']
  },
  {
    id: '4',
    title: 'React Server Componentsの実践的な活用',
    excerpt: 'React Server Componentsの概念と実装方法、パフォーマンス向上のためのベストプラクティスを紹介します。',
    date: '2023-12-28',
    category: 'フロントエンド',
    readTime: '10分',
    tags: ['React', 'Server Components', 'パフォーマンス']
  },
  {
    id: '5',
    title: 'PrismaとNext.jsでデータベース設計',
    excerpt: 'Prisma ORMを使用した効率的なデータベース設計と、Next.jsとの連携について詳しく解説します。',
    date: '2023-12-20',
    category: 'バックエンド',
    readTime: '15分',
    tags: ['Prisma', 'データベース', 'Next.js']
  },
  {
    id: '6',
    title: 'モダンな認証システムの実装',
    excerpt: 'Clerkを使用した認証システムの構築と、セキュリティベストプラクティスについて紹介します。',
    date: '2023-12-15',
    category: 'セキュリティ',
    readTime: '9分',
    tags: ['認証', 'Clerk', 'セキュリティ']
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ブログ</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          技術記事や開発日記、学んだことや気づきを共有しています
        </p>
      </div>

      {/* カテゴリフィルター */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
            すべて
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            フロントエンド
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            バックエンド
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            デザイン
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">
            セキュリティ
          </button>
        </div>
      </div>

      {/* ブログ記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* カテゴリと日付 */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>

              {/* タイトル */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>

              {/* 概要 */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* タグ */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 日付とリンク */}
              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  続きを読む →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ページネーション */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            前へ
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
          <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            次へ
          </button>
        </nav>
      </div>

      {/* ニュースレター登録 */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">最新記事をお見逃しなく</h3>
        <p className="text-blue-100 mb-6 max-w-md mx-auto">
          新しい記事が公開されたら、メールでお知らせします。技術の最新情報をお届けします。
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="メールアドレスを入力"
            className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
            登録
          </button>
        </div>
      </div>
    </div>
  )
} 