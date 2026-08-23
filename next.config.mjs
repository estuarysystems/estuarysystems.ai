/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/connect",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
