/** @type {import('next').NextConfig} */
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const nextConfig = {
  basePath: isProduction ? '/file-converter' : '',
  assetPrefix: isProduction ? '/file-converter' : '',
  trailingSlash: true,
};

export default nextConfig;
