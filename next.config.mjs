/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    headers: {
        'Cache-Control': 'no-store'
    }
};

export default nextConfig;
