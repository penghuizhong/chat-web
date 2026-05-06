// next.config.ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  output: "standalone",
  // experimental: {
  //   serverComponentsExternalPackages: [],
  // },
  async rewrites() {

    if (!isDev) {
      return [];
    }

    return [
      {
        source: '/api/agent/:path*',
        destination: 'http://127.0.0.1:8001/api/agent/:path*'
      }
      // 如果还有 courses 服务，继续往这里加
    ];
  },
};

export default nextConfig;