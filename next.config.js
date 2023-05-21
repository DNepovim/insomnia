/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com"],
  },
  i18n: {
    locales: ["cs"],
    defaultLocale: "cs",
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/admin",
      },
    ]
  },
}
