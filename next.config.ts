import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.thecatapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
