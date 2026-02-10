/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
};

export default nextConfig;
