import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://frstudies.vercel.app';
  const routes = [
    '/',
    '/about',
    '/quiz',
    '/linguistics',
    '/literature',
    '/exams',
    '/commentaire-compose',
    '/dissertation',
    '/essai',
    '/sign-in',
    '/sign-up',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}