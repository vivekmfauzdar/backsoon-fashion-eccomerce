/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode : false,

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'rukminim2.flixcart.com',
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
          },
       
        ],
       
      },

   
}

module.exports = nextConfig