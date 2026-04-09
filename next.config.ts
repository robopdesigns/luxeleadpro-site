import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/v2/homepage.html" },
      { source: "/home", destination: "/v2/homepage.html" },
      { source: "/pricing", destination: "/v2/pricing.html" },
      { source: "/territory", destination: "/v2/territory.html" },
      { source: "/demo", destination: "/v2/demo.html" },
    ];
  },
};

export default nextConfig;
