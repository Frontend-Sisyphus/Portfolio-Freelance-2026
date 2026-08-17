import { renderOgImage, OG_SIZE } from "@/utils/renderOgImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Boris Karabut — software engineer. Frontend Sisyphus: AI, DevOps, testing, security, UX.";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderOgImage(locale);
}
