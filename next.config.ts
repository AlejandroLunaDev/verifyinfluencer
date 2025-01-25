import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Agrega el dominio aquí
  },
  /* config options here */
};

export default nextConfig;
