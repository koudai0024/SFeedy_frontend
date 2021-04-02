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
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/new", "/login", "/dashboard", "/mypage", "/profile"],
      },
    ],
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
  },
};
