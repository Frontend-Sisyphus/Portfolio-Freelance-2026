export const SITE_URL = "https://frontend-sisyphus.vercel.app";
export const SITE_NAME = "Frontend Sisyphus";
export const AUTHOR_NAME = "Boris Karabut";
export const AUTHOR_NAME_RU = "Борис Карабут";
export const TWITTER_HANDLE = "@frontendsisyphus";

export const SOCIAL_LINKS = [
  "https://github.com/RoastedPikachu",
  "https://t.me/SisyphusOfFrontend",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function localePath(locale: string) {
  return `/${locale}`;
}

export function canonicalUrl(locale: string) {
  return absoluteUrl(localePath(locale));
}

export function ogLocale(locale: string) {
  return locale === "en" ? "en_US" : "ru_RU";
}
