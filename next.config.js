/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        unoptimized : true,
    },
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true,
    },
};

module.exports = nextConfig;
