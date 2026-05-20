import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acharyatutorials.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://acharyatutorials.vercel.app/admin',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
    },
  ];
}
