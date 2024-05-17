/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'kz', 'ru'],
    defaultLocale: 'kz',
    localeDetection: false,
  },
};

module.exports = nextConfig;
