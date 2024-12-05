/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*'
            },
            {
                source: '/auth/:path*',
                destination: 'http://localhost:8080/auth/:path*'
            },
            {
                source: '/user/:path*',
                destination: 'http://localhost:8080/user/:path*'
            }
        ];
    },
    images: {
        domains: ['findsport.ru'],
    },
};

export default nextConfig;
