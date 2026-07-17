// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/api\/v1$/, '') || 'http://10.10.28.81:5000'}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;