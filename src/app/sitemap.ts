import type { MetadataRoute } from "next";

const BASE_URL = "https://www.islam-religion.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "/blog",
    "/hajj-guide",
    "/umrah-guide",
    "/travel-tips",
    "/ziyaraat-guide",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/blog" ? 0.9 : 0.8,
  }));
}