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
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            pathname: '/**',
          },
        ],
      },
    
};

export default nextConfig;


