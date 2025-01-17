/** @type {import('next').NextConfig} */

const config = require('./config');
const nextConfig = {
  env: {
    SERVER_ORIGIN: config.serverOrigin,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
