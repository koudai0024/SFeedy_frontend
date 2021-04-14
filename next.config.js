const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
  images: {
    domains: [
      "lh5.googleusercontent.com",
      "sfeedy-img.s3.ap-northeast-1.amazonaws.com",
    ],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    swSrc: "service-worker.js",
  },
});
