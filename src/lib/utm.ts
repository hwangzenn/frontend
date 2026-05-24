export interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export function buildUTMUrl(baseUrl: string, params: UTMParams): string {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);
  if (params.content) url.searchParams.set('utm_content', params.content);
  if (params.term) url.searchParams.set('utm_term', params.term);
  return url.toString();
}

export function parseUTMFromUrl(searchParams: URLSearchParams): Partial<UTMParams> {
  return {
    source: searchParams.get('utm_source') ?? undefined,
    medium: searchParams.get('utm_medium') ?? undefined,
    campaign: searchParams.get('utm_campaign') ?? undefined,
    content: searchParams.get('utm_content') ?? undefined,
    term: searchParams.get('utm_term') ?? undefined,
  };
}

// 사전 정의된 UTM 링크 생성 헬퍼
export const utm = {
  newsletter: (slug: string) =>
    buildUTMUrl(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://factorix.com'}/blog/${slug}`, {
      source: 'newsletter',
      medium: 'email',
      campaign: 'blog-digest',
    }),
  social: (slug: string, platform: 'linkedin' | 'twitter' | 'facebook') =>
    buildUTMUrl(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://factorix.com'}/blog/${slug}`, {
      source: platform,
      medium: 'social',
      campaign: 'content-share',
    }),
  cta: (page: string, label: string) =>
    buildUTMUrl(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://factorix.com'}${page}`, {
      source: 'website',
      medium: 'cta',
      campaign: label,
    }),
};
