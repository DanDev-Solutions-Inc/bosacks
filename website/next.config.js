/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    CONSTANT_CONTACT_BASE_URL: process.env.CONSTANT_CONTACT_BASE_URL,
    CONSTANT_CONTACT_API_KEY: process.env.CONSTANT_CONTACT_API_KEY,
    CONSTANT_CONTACT_ACCESS_TOKEN: process.env.CONSTANT_CONTACT_ACCESS_TOKEN,
    CONSTANT_CONTACT_LIST_ID: process.env.CONSTANT_CONTACT_LIST_ID,
  },
};

module.exports = { ...nextConfig };
