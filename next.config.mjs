import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bts.pythonanywhere.com",
        pathname: "/media/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop/products",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/shop/products",
        has: [
          {
            type: "cookie",
            key: "auth_token",
          },
        ],
        permanent: false,
      },
    ];
  },
};

export default withPWA(nextConfig);
