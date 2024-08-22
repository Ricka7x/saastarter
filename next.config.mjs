import { withNextra } from 'nextra'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ]
  },
}

const withNextraConfig = withNextra({
  theme: 'nextra-theme-docs',
  themeConfig: './docs/theme.config.jsx',
})

export default withNextraConfig(nextConfig)