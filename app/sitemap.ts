import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kemstat.ru'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/results`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/schools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/game/programmer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/game/designer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/game/doctor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/game/entrepreneur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
