/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img.youtube.com"],
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
