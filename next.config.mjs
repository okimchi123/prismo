/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      JWT_SECRET: process.env.JWT_SECRET,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  };
  
  export default nextConfig;
  