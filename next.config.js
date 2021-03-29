const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public", // swの出力ディレクトリ
    runtimeCaching,
    //   runtimeCaching: [
    //     {
    //       urlPattern: "/",
    //       handler: "NetworkFirst",
    //       options: {
    //         cacheName: "start-url",
    //       },
    //     },
    //   ],
    //   cleanupOutdatedCaches: true,
    //   sw: "service-worker.js",
    //   register: true,
  },
});
