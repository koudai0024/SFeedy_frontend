module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    "/server-sitemap.xml",
    "/new",
    "/login",
    "/dashboard",
    "/mypage",
    "/profile",
  ], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
};
