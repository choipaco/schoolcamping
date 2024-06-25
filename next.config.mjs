/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // logging:{
    //     fetches:{
    //         fullUrl: true,
    //     }
    // },
    headers: async () => {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  