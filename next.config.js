const withPWA = require("next-pwa");
module.exports = withPWA({
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public", // swの出力ディレクトリ
    runtimeCaching: [
      {
        urlPattern: "/",
        handler: "NetworkFirst",
        options: {
          cacheName: "start-url",
        },
      },
    ],
    cleanupOutdatedCaches: true,
    sw: "service-worker.js",
    register: true,
  },
});
