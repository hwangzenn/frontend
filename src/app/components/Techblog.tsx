import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string | null;
  published_at?: string | null;
  slug: string;
  tags?: { name: string; slug: string }[];
}

interface TechBlogProps {
  posts: Post[];
  lang: 'EN' | 'KR';
}

const t = {
  EN: {
    subtitle: 'From zero-defect manufacturing plugins to successful smartglass deployments.',
    viewMore: 'View more +',
    locale: 'en-US',
  },
  KR: {
    subtitle: '무결점 제조 솔루션부터 스마트글라스 도입 성공 사례까지.',
    viewMore: '더 보기 +',
    locale: 'ko-KR',
  },
};

const LANG_TAG: Record<'EN' | 'KR', string> = {
  EN: 'hash-lang-en',
  KR: 'hash-lang-kr',
};

export default function TechBlog({ posts, lang }: TechBlogProps) {
  const c = t[lang];
  const visiblePosts = posts
    .filter(post => post.tags?.some(tag => tag.slug === LANG_TAG[lang]))
    .slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-slate-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">Tech Blog</h2>
            <p className="text-gray-500 text-sm mt-2">{c.subtitle}</p>
          </div>
          <Link href="/blog">
            <button className="bg-slate-900 text-white text-xs px-5 py-3 rounded-full font-medium hover:bg-slate-800 transition">
              {c.viewMore}
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full group cursor-pointer hover:shadow-md transition">
                <div className="aspect-video bg-slate-100 relative overflow-hidden shrink-0">
                  {post.feature_image ? (
                    <img src={post.feature_image} alt={post.title} className="object-cover w-full h-full transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 min-h-0">
                  <div className="flex-1 min-h-0">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3 font-light min-h-[4.5em]">
                      {post.custom_excerpt || post.excerpt}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mt-6 font-medium shrink-0">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString(c.locale, { year: 'numeric', month: 'short', day: 'numeric' })
                      : ''}
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {visiblePosts.length === 0 && (
            <p className="col-span-3 text-center text-gray-400 py-16 text-sm">
              {lang === 'KR' ? '등록된 게시글이 없습니다.' : 'No articles found.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
