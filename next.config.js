/** @type {import('next').NextConfig} */
const nextConfig = {
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
      }
    ]
  }
}

module.exports = nextConfig
