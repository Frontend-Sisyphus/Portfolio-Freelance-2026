import type { Metadata, Viewport } from "next";

import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

import Script from "next/script";

import { NextIntlClientProvider } from "next-intl";

import { getTranslations } from "next-intl/server";

import { ThemeProvider } from "@/widgets/ThemeProvider";

import ViewProvider from "@/context/ViewProvider";
import LoaderProvider from "@/context/LoaderProvider";

import JsonLd from "@/shared/JsonLd";

import { routing } from "@/i18n/routing";
import {
  AUTHOR_NAME,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  canonicalUrl,
  ogLocale,
} from "@/utils/site";

import "@/app/globals.css";

interface PageParams {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSans = localFont({
  src: "../fonts/NotoSans-VariableFont.ttf",
  variable: "--font-noto-sans",
  display: "swap",
  weight: "100 900",
  preload: true,
});

const play = localFont({
  src: [
    {
      path: "../fonts/Play-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Play-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-play",
  display: "swap",
});

const syne = localFont({
  src: "../fonts/Syne-VariableFont.ttf",
  variable: "--font-syne",
  display: "swap",
  weight: "400 800",
});

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = canonicalUrl(locale);
  const keywords = t.raw("keywords") as string[];
  const languageAlternates = Object.fromEntries(
    routing.locales.map((item) => [item, canonicalUrl(item)])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: t("applicationName"),
    authors: [{ name: t("author"), url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: SITE_NAME,
    keywords,
    category: "technology",
    classification: "Portfolio",
    referrer: "origin-when-cross-origin",
    generator: "Next.js",
    alternates: {
      canonical: url,
      languages: {
        ...languageAlternates,
        "x-default": canonicalUrl(routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => ogLocale(item)),
      url,
      siteName: t("ogSiteName"),
      title: t("ogTitle"),
      description: t("ogDescription"),
      countryName: "Russia",
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png" }],
      apple: [{ url: "/apple-icon", type: "image/png" }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    other: {
      "geo.region": "RU-MOW",
      "geo.placename": t("location"),
      "theme-color": "#050505",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistMono.variable} ${notoSans.variable} ${play.variable} ${syne.variable}`}
    >
      <body className="antialiased">
        <JsonLd
          locale={locale}
          title={t("title")}
          description={t("description")}
          jobTitle={t("jobTitle")}
        />
        <Script src="/static/metric.js" strategy="lazyOnload" />
        <Script src="/static/googleMetric.js" strategy="lazyOnload" />

        <NextIntlClientProvider>
          <ThemeProvider>
            <LoaderProvider>
              <ViewProvider>
                {children}
              </ViewProvider>
            </LoaderProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}