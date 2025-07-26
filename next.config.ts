import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://gateway.pinata.cloud/ipfs/bafybeiepdsl75s4mmedwilueuqjfpk3ryoumkh2yham6wsb57xhjxzx3ra/**')],
  },
};

export default nextConfig;
