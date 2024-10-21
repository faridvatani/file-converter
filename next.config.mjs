/** @type {import('next').NextConfig} */

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '/';

const nextConfig = {
  output: 'export',
  basePath: prefix,
  assetPrefix: prefix,
};

export default nextConfig;
