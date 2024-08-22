/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: 'https://saastarter-docs.vercel.app',
      },
      {
        source: '/docs/:path*',
        destination: 'https://saastarter-docs.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
