import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  // output: "standalone",
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
      {
        source: "/api-docs",
        destination: "http://localhost:3001/api-docs",
      },
    ];
  },
};

//export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);