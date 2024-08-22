const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  basePath: '/docs',
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index',
      },
      {
        source: '/',
        destination: 'http://localhost:3000/',
      },
    ];
  },
});
