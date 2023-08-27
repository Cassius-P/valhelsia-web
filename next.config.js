/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crafatar.com',
                port: '',
                pathname: '/avatars/**',
            },
        ],
    },
}

const withTM = require("next-transpile-modules")([
    "@amcharts/amcharts4/core",
    "@amcharts/amcharts4/charts",
    "@amcharts/amcharts4/themes/animated"
]); // pass the modules you would like to see transpiled

module.exports = nextConfig
