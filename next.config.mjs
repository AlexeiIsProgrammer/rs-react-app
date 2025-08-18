/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: './dist',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    experimental: {
        globalNotFound: true
    }
}

export default nextConfig