import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? basePath : '',
  assetPrefix: isGithubPages ? basePath : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
