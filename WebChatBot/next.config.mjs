/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Suppress turbopack source map warnings in development
  experimental: {
    // Turbopack specific options
  },
  
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
