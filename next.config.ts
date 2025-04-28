import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['beije.co', 'static.beije.co'],
  },
};

export default nextConfig;
