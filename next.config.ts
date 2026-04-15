import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/v2/homepage.html" },
      { source: "/pricing", destination: "/v2/pricing.html" },
      { source: "/territory", destination: "/v2/territory.html" },
      { source: "/demo", destination: "/v2/demo.html" },
      { source: "/agent", destination: "/v2/dashboard-agent.html" },
      { source: "/manager", destination: "/v2/dashboard-manager.html" },
      { source: "/dashboard", destination: "/v2/dashboard-owner.html" },
      { source: "/rep", destination: "/v2/rep-portal.html" },
    ];
  },
};

export default nextConfig;
