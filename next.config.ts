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

        destination: 'https://ai-code-reviewer-lake-zeta.vercel.app/api/v1/:path*', 
      },
    ];
  },
};

export default nextConfig;