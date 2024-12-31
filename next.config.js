/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    isrMemoryCacheSize: 0,
  }
}

module.exports = nextConfig 