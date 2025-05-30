import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://frstudies.vercel.app";
  
  const staticRoutes = [
    "",
    "/about",
    "/linguistics",
    "/literature",
    "/quiz",
    "/exams",
    "/articles",
    "/commentaire-compose",
    "/dissertation",
    "/essai",
    "/sign-in",
    "/sign-up",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (
      route === "" || 
      route === "/articles" || 
      route === "/linguistics" || 
      route === "/literature"
    ) ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}