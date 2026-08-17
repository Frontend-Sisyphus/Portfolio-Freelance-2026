import { renderOgImage } from "@/utils/renderOgImage";

export const alt =
  "Boris Karabut — software engineer. Frontend Sisyphus: AI, DevOps, testing, security, UX.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderOgImage(locale);
}
