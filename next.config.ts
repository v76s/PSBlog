import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  target: 'serverless',
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during build
  },
  // Your other Next.js config options here
}

export default nextConfig;