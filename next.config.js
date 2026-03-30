/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/supa-proxy/:path*',
        destination: 'https://kihrduzknogrclvliewh.supabase.co/:path*',
      },
    ]
  },
}

module.exports = nextConfig
