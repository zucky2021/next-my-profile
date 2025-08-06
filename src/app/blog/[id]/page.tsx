import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  params: { id: string }
}

// ブログ記事の型定義
type BlogPost = {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  category: string
  readTime: string
  tags: string[]
  author: string
}

// サンプルブログ記事データ
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 14の新機能とベストプラクティス',
    excerpt: 'Next.js 14で導入された新機能について詳しく解説し、実際のプロジェクトでの活用方法を紹介します。',
    content: `
# はじめに

Next.js 14は、Reactアプリケーションの開発をより効率的にするための多くの新機能を導入しました。この記事では、主要な新機能とその活用方法について詳しく解説します。

## App Routerの改善

App Routerは、Next.js 13で導入された新しいルーティングシステムですが、14ではさらに改善されています。Server ComponentsとClient Componentsの使い分けがより明確になり、パフォーマンスが向上しました。

### Server Componentsの活用

Server Componentsを使用することで、サーバーサイドでレンダリングされるコンポーネントを作成できます。これにより、クライアントサイドのJavaScriptバンドルサイズを削減し、初期読み込み速度を向上させることができます。

\`\`\`javascript
// Server Componentの例
export default function ServerComponent() {
  const data = await fetchData() // サーバーサイドで実行
  return <div>{data}</div>
}
\`\`\`

## Turbopackの安定化

Turbopackは、Rustで書かれた高速なバンドラーで、Webpackの代替として開発されています。Next.js 14では、Turbopackがより安定し、多くのプロジェクトで使用できるようになりました。

### パフォーマンスの向上

Turbopackを使用することで、開発時のホットリロードが大幅に高速化されます。また、本番ビルドでもパフォーマンスが向上し、バンドルサイズが最適化されます。

## Partial Prerendering

Partial Prerenderingは、静的コンテンツと動的コンテンツを組み合わせて、最適なパフォーマンスを実現する機能です。

### 実装例

\`\`\`javascript
// 静的コンテンツと動的コンテンツの組み合わせ
export default function Page() {
  return (
    <div>
      <StaticHeader /> {/* 静的 */}
      <DynamicContent /> {/* 動的 */}
      <StaticFooter /> {/* 静的 */}
    </div>
  )
}
\`\`\`

## ベストプラクティス

Next.js 14を効果的に活用するためのベストプラクティスを紹介します。

### 1. Server Componentsを優先的に使用

可能な限りServer Componentsを使用し、クライアントサイドのJavaScriptを最小限に抑えましょう。

### 2. 適切なキャッシュ戦略

fetch APIを使用してデータを取得する際は、適切なキャッシュ戦略を設定しましょう。

### 3. 画像の最適化

next/imageコンポーネントを使用して、画像の最適化を行いましょう。

## まとめ

Next.js 14は、パフォーマンスと開発体験の両方を向上させる多くの新機能を提供しています。これらの機能を適切に活用することで、より高速で保守性の高いアプリケーションを構築できます。
    `,
    date: '2024-01-15',
    category: 'フロントエンド',
    readTime: '8分',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: '田中太郎'
  },
  {
    id: '2',
    title: 'TypeScriptで型安全なAPIクライアントを構築する',
    excerpt: 'TypeScriptを使用して型安全なAPIクライアントを構築する方法と、実際のプロジェクトでの活用例を紹介します。',
    content: `
# はじめに

TypeScriptを使用することで、APIクライアントの型安全性を確保し、開発時のエラーを減らすことができます。この記事では、型安全なAPIクライアントの構築方法について詳しく解説します。

## APIレスポンスの型定義

まず、APIレスポンスの型を定義することから始めましょう。

\`\`\`typescript
// APIレスポンスの型定義
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
\`\`\`

## APIクライアントの実装

型安全なAPIクライアントを実装します。

\`\`\`typescript
class ApiClient {
  private baseUrl: string
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`)
    return response.json()
  }
  
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }
}
\`\`\`

## 使用例

実装したAPIクライアントの使用例を紹介します。

\`\`\`typescript
const apiClient = new ApiClient('https://api.example.com')

// 型安全なAPI呼び出し
const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(\`/users/\${id}\`)
  return response.data
}

// 使用例
const user = await getUser(1)
console.log(user.name) // 型安全にアクセス可能
\`\`\`

## エラーハンドリング

型安全なエラーハンドリングも実装しましょう。

\`\`\`typescript
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// エラーハンドリング付きのAPIクライアント
async get<T>(endpoint: string): Promise<ApiResponse<T>> {
  const response = await fetch(\`\${this.baseUrl}\${endpoint}\`)
  
  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.statusText,
      await response.json()
    )
  }
  
  return response.json()
}
\`\`\`

## まとめ

TypeScriptを使用した型安全なAPIクライアントの構築により、開発時のエラーを減らし、保守性の高いコードを書くことができます。
    `,
    date: '2024-01-10',
    category: 'バックエンド',
    readTime: '12分',
    tags: ['TypeScript', 'API', 'バックエンド'],
    author: '田中太郎'
  }
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(post => post.id === params.id)
  
  if (!post) {
    return {
      title: '記事が見つかりません | My Profile',
    }
  }

  return {
    title: `${post.title} | My Profile`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(post => post.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* パンくずリスト */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              ブログ
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{post.title}</li>
        </ol>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600 mb-6">
          <span>著者: {post.author}</span>
          <span>•</span>
          <time>
            {new Date(post.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* タグ */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 記事本文 */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-800 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* シェアボタン */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">この記事をシェア</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Twitter
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Facebook
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            LinkedIn
          </button>
        </div>
      </div>

      {/* 関連記事 */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <article key={relatedPost.id} className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </Link>
                </h4>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{relatedPost.category}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </article>
            ))}
        </div>
      </div>

      {/* ブログ一覧に戻る */}
      <div className="mt-8 text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← ブログ一覧に戻る
        </Link>
      </div>
    </div>
  )
} 