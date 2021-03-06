/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/admin",
      },
    ]
  },
}
