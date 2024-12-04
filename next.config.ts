import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack5: true,

  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
      tls: false,
      net: false,
    };

    return config;
  },
};

export default nextConfig;
