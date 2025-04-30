/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental:{
    //     appDir: true
    // },
    // env:{

    // },
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


