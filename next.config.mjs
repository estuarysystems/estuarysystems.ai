/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 16.3 + Vercel's injected adapter skips next-server.js.nft.json;
  // standalone finalize then ENOENTs (vercel/next.js#96646). Cloud Run
  // Docker builds do not set VERCEL, so they still get standalone.
  output: process.env.VERCEL ? undefined : "standalone",
  async redirects() {
    const parked = [
      "/about",
      "/alexandria",
      "/tools",
      "/tools/:path*",
      "/pricing",
      "/capabilities",
      "/blog",
    ];

    return parked.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
