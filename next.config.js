const withPWA = require("next-pwa");
module.exports = withPWA({
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: []
  },
});
