/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Isso permite qualquer imagem externa (útil para desenvolvimento)
      },
    ],
  },
};
export default nextConfig;
