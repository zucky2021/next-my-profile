import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ページが見つかりません | My Profile',
  description: 'お探しのページが見つかりませんでした',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 mb-8">
            お探しのページは存在しないか、移動または削除された可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
          
          <div className="text-sm text-gray-500">
            または、以下のページをご確認ください：
          </div>
          
          <div className="flex flex-col space-y-2">
            <Link
              href="/career"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              経歴ページ
            </Link>
            <Link
              href="/hobbies"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              趣味ページ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 