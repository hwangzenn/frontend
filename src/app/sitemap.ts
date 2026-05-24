import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/ghost';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://factorix.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts() as {
    slug: string;
    updated_at?: string | null;
    published_at?: string | null;
  }[];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at || post.published_at || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postUrls,
  ];
}
