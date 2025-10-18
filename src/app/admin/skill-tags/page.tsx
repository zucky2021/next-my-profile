"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminHeader from "../components/AdminHeader";

interface SkillTag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface SkillTagFormData {
  name: string;
}

const SkillTagPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  const [skillTags, setSkillTags] = useState<SkillTag[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<SkillTagFormData>({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  /**
   * スキルタグ一覧を取得する
   */
  const fetchSkillTags = async () => {
    try {
      setDataLoading(true);
      const response = await fetch("/api/skill-tags");
      if (!response.ok) {
        throw new Error("Failed to fetch skill tags");
      }
      const data = await response.json();
      setSkillTags(data);
    } catch (error) {
      console.error("Error fetching skill tags:", error);
      setError("スキルタグの取得に失敗しました");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchSkillTags();
    }
  }, [session]);

  /**
   * フォームのリセット
   */
  const resetForm = () => {
    setFormData({ name: "" });
    setEditingId(null);
    setError(null);
  };

  /**
   * スキルタグの作成
   */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/skill-tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create skill tag");
      }

      const newSkillTag = await response.json();
      setSkillTags([...skillTags, newSkillTag]);
      resetForm();
    } catch (error) {
      console.error("Error creating skill tag:", error);
      setError(
        error instanceof Error
          ? error.message
          : "スキルタグの作成に失敗しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * スキルタグの更新
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !editingId) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/skill-tags/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update skill tag");
      }

      const updatedSkillTag = await response.json();
      setSkillTags(
        skillTags.map((tag) => (tag.id === editingId ? updatedSkillTag : tag))
      );
      resetForm();
    } catch (error) {
      console.error("Error updating skill tag:", error);
      setError(
        error instanceof Error
          ? error.message
          : "スキルタグの更新に失敗しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * スキルタグの削除
   */
  const handleDelete = async (id: number) => {
    if (!confirm("このスキルタグを削除しますか？")) return;

    try {
      const response = await fetch(`/api/skill-tags/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete skill tag");
      }

      setSkillTags(skillTags.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error("Error deleting skill tag:", error);
      setError(
        error instanceof Error
          ? error.message
          : "スキルタグの削除に失敗しました"
      );
    }
  };

  const startEdit = (skillTag: SkillTag) => {
    setFormData({ name: skillTag.name });
    setEditingId(skillTag.id);
    setError(null);
  };

  const cancelEdit = () => {
    resetForm();
  };

  if (loading || status === "unauthenticated") {
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
      <AdminHeader
        title="スキルタグ管理"
        showBackButton={true}
        backUrl="/admin"
      />

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                スキルタグ管理
              </h2>
              <p className="text-gray-600">
                スキルタグの追加・編集・削除を行います
              </p>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <div className="text-red-800">{error}</div>
              </div>
            )}

            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {editingId ? "スキルタグを編集" : "新しいスキルタグを追加"}
              </h3>

              <form
                onSubmit={editingId ? handleUpdate : handleCreate}
                className="space-y-4"
                aria-label="スキルタグフォーム"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    スキルタグ名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="スキルタグ名"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="例: React, TypeScript, Docker"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    name={editingId ? "更新" : "追加"}
                    disabled={isSubmitting || !formData.name.trim()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "処理中..." : editingId ? "更新" : "追加"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                    >
                      キャンセル
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* スキルタグ一覧 */}
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  スキルタグ一覧
                </h3>
              </div>

              <ul
                className="divide-y divide-gray-200"
                aria-label="スキルタグ一覧"
              >
                {dataLoading ? (
                  <li className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                  </li>
                ) : skillTags.length === 0 ? (
                  <li className="px-6 py-8 text-center text-gray-500">
                    スキルタグがありません
                  </li>
                ) : (
                  skillTags.map((skillTag) => (
                    <li
                      key={skillTag.id}
                      className="flex items-center justify-between px-6 py-4"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {skillTag.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          作成日:{" "}
                          {new Date(skillTag.createdAt).toLocaleDateString(
                            "ja-JP"
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(skillTag)}
                          className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                          aria-label={`${skillTag.name} 編集`}
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDelete(skillTag.id)}
                          className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                          aria-label={`${skillTag.name} 削除`}
                        >
                          削除
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillTagPage;
