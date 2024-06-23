/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    MODE: process.env.MODE,
    INSTANCE: process.env.INSTANCE,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};
