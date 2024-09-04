const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  buildExcludes: [/middleware-manifest.json$/],
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    skipWaiting: true,
  }
});



module.exports = withPWA({
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storeror01.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
});





/*
module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storeror01.blob.core.windows.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
    }

    */