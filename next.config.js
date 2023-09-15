/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'st.kp.yandex.net',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'imagetmdb.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
