import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const BASE_URL = "https://kemstat.ru";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "КемСтать — профориентация для школьников 13–17 лет",
    template: "%s — КемСтать",
  },
  description:
    "Пройди тест RIASEC за 10 минут, получи AI-анализ своих сильных сторон и попробуй профессии через мини-игры. Бесплатно для школьников.",
  keywords: [
    "профориентация", "школьники", "профессии", "тест RIASEC",
    "куда поступать", "выбор профессии", "13-17 лет", "ИИ анализ",
  ],
  authors: [{ name: "КемСтать" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: BASE_URL,
    siteName: "КемСтать",
    title: "КемСтать — узнай свою профессию за 10 минут",
    description:
      "Тест профориентации RIASEC + AI-анализ + мини-игры по профессиям. Для школьников 13–17 лет. Бесплатно.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "КемСтать" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "КемСтать — профориентация для школьников",
    description: "Тест RIASEC + AI + мини-игры. Узнай свою профессию бесплатно.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
