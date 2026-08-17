import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_URL } from "@/utils/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Boris Karabut`,
    short_name: "FS",
    description:
      "Portfolio of software engineer Boris Karabut: AI, DevOps, testing, cybersecurity, and UX.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#d7ff3f",
    lang: "ru",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: SITE_URL,
  };
}
