/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Optional if you're using static images from /public
  },
  output: 'standalone',
};

module.exports = nextConfig;
