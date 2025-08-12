import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/**')],
  },
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://192.168.1.28:3000',
    'http://192.168.1.28:3001'
  ],
  // Skip tests during build for production
  experimental: {
    skipTrailingSlashRedirect: true,
  },
};

export default nextConfig;
