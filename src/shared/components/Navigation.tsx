"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "ホーム", href: "/" },
    { name: "経歴", href: "/career" },
    { name: "自己PR", href: "/self-pr" },
    { name: "趣味", href: "/hobbies" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm"
      id="header-navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <Link
            href="/"
            className="flex items-center font-serif text-xl font-bold text-gray-900"
            id="header-logo"
          >
            鈴木 宏尭
          </Link>

          <ul
            className="hidden items-center space-x-8 md:flex"
            aria-label="デスクトップナビゲーション"
          >
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "モバイルメニューを閉じる" : "モバイルメニューを開く"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset md:hidden"
          >
            <div className="relative h-6 w-6">
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "translate-y-2 rotate-45" : "translate-y-0"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : "translate-y-2 opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "translate-y-2 -rotate-45" : "translate-y-4"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`absolute right-0 left-0 z-50 overflow-hidden border-t border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "max-h-64 translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
        aria-label="モバイルメニュー"
      >
        <ul className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item, index) => (
            <li
              key={item.name}
              className={`transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "translate-x-0 opacity-100 delay-75"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${(index + 1) * 50}ms` : "0ms",
              }}
            >
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
