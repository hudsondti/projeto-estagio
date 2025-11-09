import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Configurações específicas para Vercel
  trailingSlash: false,
  output: "standalone",
};

export default nextConfig;
