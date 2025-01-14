import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        search: '',
      },
    ]
  }
};

export default nextConfig;
