"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const AdminHeader = ({
  title,
  showBackButton = false,
  backUrl = "/admin",
}: AdminHeaderProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  /**
   * ログアウト処理
   */
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white shadow" aria-label="管理者ヘッダー">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => router.push(backUrl)}
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                ← 管理者ダッシュボードに戻る
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              ようこそ、{session?.user?.name}さん
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
  );
};

export default AdminHeader;
