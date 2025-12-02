/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://avantedentalsolutions.cloud",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ["/app-api/*", "/api-docs", "/dashboard/*"],
};
