"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);
  if (status === "unauthenticated") return null;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                管理者ダッシュボード
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                ようこそ、{session.user?.name}さん
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex h-96 items-center justify-center rounded-lg border-4 border-dashed border-gray-200">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                管理者機能
              </h2>
              <p className="mb-6 text-gray-600">
                コンテンツの編集機能はこちらに実装されます
              </p>
              <div className="mx-auto grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    経歴編集
                  </h3>
                  <p className="text-sm text-gray-600">
                    職歴情報の追加・編集・削除
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    趣味編集
                  </h3>
                  <p className="text-sm text-gray-600">
                    趣味情報の追加・編集・削除
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    スキル編集
                  </h3>
                  <p className="text-sm text-gray-600">
                    スキル情報の追加・編集・削除
                  </p>
                </div>
                <div className="rounded-lg border bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    実績編集
                  </h3>
                  <p className="text-sm text-gray-600">
                    実績情報の追加・編集・削除
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
