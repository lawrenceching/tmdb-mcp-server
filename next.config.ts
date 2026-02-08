import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/3/:path*',
        destination: '/api/3/:path*',
      },
    ];
  },
};

export default nextConfig;
