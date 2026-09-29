// Exportação estática (compatível com GitHub Pages). Para publicar em subcaminho,
// defina NEXT_PUBLIC_BASE_PATH=/Matutos-Elegantes no build.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
