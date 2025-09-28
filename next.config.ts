import type { NextConfig } from "next";

// Read base path and asset prefix from env (set by GitHub Actions for project pages)
const basePath = process.env.NEXT_BASE_PATH || ""
const assetPrefix = process.env.NEXT_ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix,
};

export default nextConfig;
