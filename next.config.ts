import type { NextConfig } from "next";
import path from "node:path";

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.resolve("."),
  },
  experimental: {
    optimizePackageImports: ["@deemlol/next-icons", "motion"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
