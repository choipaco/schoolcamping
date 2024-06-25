/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // logging:{
    //     fetches:{
    //         fullUrl: true,
    //     }
    // },
    headers: {
        'Cache-Control': 'no-store'
    },
  };
  
  export default nextConfig;
  