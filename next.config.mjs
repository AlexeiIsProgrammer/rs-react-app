/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: './dist',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    experimental: {
        globalNotFound: true
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/main',
                permanent: true,
            },
        ]
    },

}

export default nextConfig