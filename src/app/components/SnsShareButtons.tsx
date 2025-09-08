"use client";

import Link from "next/link";
import { useState } from "react";

const SnsShareButtons = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const twitterUrl = "https://x.com/kanbaru2024";

  const instagramUrl = "https://www.instagram.com/zucky_2025/";

  /**
   * URLをクリップボードにコピー
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("URLのコピーに失敗しました:", err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Link
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-800"
        aria-label="Xでシェア"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm">X</span>
      </Link>

      {/* Instagram シェアボタン */}
      <Link
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600"
        aria-label="Instagramで開く"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 8.002.01 6.78.048 2.979.206.206 2.979.048 6.78.01 8.002 0 8.396 0 12.017c0 3.623.01 4.017.048 5.238.158 3.801 2.931 6.574 6.732 6.732 1.221.038 1.615.048 5.238.048 3.623 0 4.017-.01 5.238-.048 3.801-.158 6.574-2.931 6.732-6.732.038-1.221.048-1.615.048-5.238 0-3.623-.01-4.017-.048-5.238C23.832 2.979 21.059.206 17.258.048 16.037.01 15.643 0 12.017 0zm0 2.165c3.557 0 3.97.01 5.185.047 2.705.124 4.37 1.789 4.494 4.494.037 1.215.047 1.628.047 5.185 0 3.557-.01 3.97-.047 5.185-.124 2.705-1.789 4.37-4.494 4.494-1.215.037-1.628.047-5.185.047-3.557 0-3.97-.01-5.185-.047-2.705-.124-4.37-1.789-4.494-4.494-.037-1.215-.047-1.628-.047-5.185 0-3.557.01-3.97.047-5.185.124-2.705 1.789-4.37 4.494-4.494 1.215-.037 1.628-.047 5.185-.047zm0 3.68a6.172 6.172 0 1 0 0 12.344 6.172 6.172 0 0 0 0-12.344zm0 10.179a4.007 4.007 0 1 1 0-8.014 4.007 4.007 0 0 1 0 8.014zm7.846-10.405a1.441 1.441 0 1 1-2.883 0 1.441 1.441 0 0 1 2.883 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm">Instagram</span>
      </Link>

      {/* URLコピーボタン */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300"
        aria-label="URLをコピー"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm">
          {copiedUrl ? "コピー済み!" : "URLコピー"}
        </span>
      </button>
    </div>
  );
};

export default SnsShareButtons;
