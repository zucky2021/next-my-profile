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
        `${apiBaseUrl}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${perPage}`
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
      <section className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          ポートフォリオ
        </h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-3 w-3/4 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (portfolioData.error) {
    return (
      <section className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          ポートフォリオ
        </h2>
        <div className="py-8 text-center">
          <p className="mb-4 text-red-600">{portfolioData.error}</p>
          <button
            onClick={fetchPortfolioData}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            再試行
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">ポートフォリオ</h2>
      <div className="grid gap-6">
        {portfolioData.repositories.map((repo) => (
          <div
            key={repo.id}
            className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  {repo.name}
                </a>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                {repo.language && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>

            {repo.description && (
              <p className="mb-4 line-clamp-2 text-gray-600">
                {repo.description}
              </p>
            )}

            <div className="mb-3 flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
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
