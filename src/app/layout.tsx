import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/shared/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "鈴木宏尭 | Official Site",
  description:
    "三重県出身の鈴木宏尭のプロフィールサイト。Go、Laravel、React、TypeScriptを駆使したWebアプリケーション開発を得意としています。",
  keywords: [
    "鈴木宏尭",
    "フルスタックエンジニア",
    "React",
    "TypeScript",
    "Go",
    "Laravel",
    "Webアプリケーション開発",
    "三重県",
    "SE",
  ],
  authors: [{ name: "鈴木宏尭" }],
  creator: "鈴木宏尭",
  publisher: "鈴木宏尭",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://next-my-profile-three.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "鈴木宏尭 | SE",
    description:
      "鈴木宏尭のプロフィールサイト。三重県出身でGo、Laravel、React、TypeScriptを駆使したWebアプリケーション開発を得意としています。",
    url: "https://next-my-profile-three.vercel.app/",
    siteName: "鈴木宏尭のプロフィールサイト",
    images: [
      {
        url: "/main.jpg",
        width: 400,
        height: 400,
        alt: "鈴木宏尭のプロフィール写真",
      },
    ],
    locale: "ja_JP",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "鈴木宏尭 | SE",
    description:
      "鈴木宏尭のプロフィールサイト。三重県出身でGo、Laravel、React、TypeScriptを駆使したWebアプリケーション開発を得意としています。",
    images: ["/main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "鈴木宏尭",
    jobTitle: "SE",
    description:
      "三重県出身のSE。Go、Laravel、React、TypeScriptを駆使したWebアプリケーション開発を得意としています。",
    url: "https://next-my-profile-three.vercel.app",
    image: "https://next-my-profile-three.vercel.app/main.jpg",
    knowsAbout: [
      "React",
      "Go",
      "Laravel",
      "TypeScript",
      "SE",
      "Webアプリケーション開発",
    ],
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased`}
        suppressHydrationWarning
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
