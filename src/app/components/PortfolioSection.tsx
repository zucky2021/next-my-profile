"use client";

import { useCallback, useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface PortfolioData {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
}

export function PortfolioSection() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    repositories: [],
    loading: true,
    error: null,
  });

  const apiBaseUrl = process.env.NEXT_PUBLIC_GITHUB_API_BASE ?? "";
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "";
  const sort = "updated";
  const direction = "desc";
  /** 1ページあたりの取得件数(max: 100) */
  const perPage = 20;

  const fetchPortfolioData = useCallback(async () => {
    try {
      setPortfolioData((prev) => ({ ...prev, loading: true, error: null }));

      if (!apiBaseUrl || !username) {
        throw new Error("GITHUB_API_BASE or GITHUB_USERNAME is not set");
      }

      const response = await fetch(
        `${apiBaseUrl}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${perPage}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const data = await response.json();

      setPortfolioData({
        repositories: data,
        loading: false,
        error: null,
      });
    } catch (e) {
      console.error(e);
      setPortfolioData({
        repositories: [],
        loading: false,
        error: "ポートフォリオの取得に失敗しました",
      });
    }
  }, [apiBaseUrl, username, sort, direction, perPage]);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (portfolioData.loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ポートフォリオ
        </h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (portfolioData.error) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ポートフォリオ
        </h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{portfolioData.error}</p>
          <button
            onClick={fetchPortfolioData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            再試行
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ポートフォリオ</h2>
      <div className="grid gap-6">
        {portfolioData.repositories.map((repo) => (
          <div
            key={repo.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {repo.name}
                </a>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                {repo.language && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>

            {repo.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {repo.topics.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="text-sm text-gray-500">
              最終更新: {formatDate(repo.updated_at)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
