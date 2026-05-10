import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import Script from "next/script";

import { NextIntlClientProvider } from 'next-intl';

import { getTranslations } from 'next-intl/server';

import { ThemeProvider } from "@/widgets/ThemeProvider";

import ViewProvider from "@/context/ViewProvider";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      "frontend",
      "react",
      "tech",
      "creative developer",
      "UI development",
      "frontend engineer",
      "developer portfolio",
      "creative development",
      "russia",
      "software",
      "software developer",
      "software engineer",
      "portfolio",
      "фронтенд",
      "реакт",
      "технологии",
      "креативный разработчик",
      "разработка интерфейсов",
      "фронтенд инженер",
      "портфолио разработчика",
      "креативная разработка",
      "россия",
      "программы",
      "разработка программ",
      "портфолио",
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "https://frontend-sisyphus.vercel.app",
      siteName: "frontend-sisyphus.vercel.app",
      images: [
        {
          url: "https://i.ibb.co/TMjF8P85/Open-Graph-Small.png",
          width: 1200,
          height: 630,
          alt: t('title'),
        },
        {
          url: "https://i.ibb.co/R4dPgKC9/Open-Graph-Extra-Small.png",
          width: 800,
          height: 800,
          alt: t('title'),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      creator: "@frontendsisyphus",
      images: ["https://i.ibb.co/TMjF8P85/Open-Graph-Small.png"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        "max-image-preview": "large",
      },
    },
    category: "technology",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="/static/metric.js" strategy="lazyOnload" />
        <Script src="/static/googleMetric.js" strategy="lazyOnload" />

        <NextIntlClientProvider>
          <ThemeProvider>
            <ViewProvider>
              {children}
            </ViewProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}