'use client';
import { useState, useEffect, Suspense } from "react";
import { getPosts } from "@/lib/ghost";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import BlogSubNav from "../components/BlogSubNav";
import NewsletterPopup from "../components/NewsletterPopup";
import { useSearchParams } from "next/navigation";
import { useLang } from "../components/LangProvider";

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

const LANG_TAG: Record<'EN' | 'KR', string> = {
  EN: 'hash-lang-en',
  KR: 'hash-lang-kr',
};

const t = {
  EN: {
    heading: 'Stay ahead of the factory floor.',
    subtitle: 'From industry trends to Factorix webinars and product updates — delivered straight to your inbox.',
    subscribe: 'Subscribe',
    empty: 'No articles found.',
    locale: 'en-US',
  },
  KR: {
    heading: '공장 현장을 앞서가세요.',
    subtitle: '업계 트렌드, Factorix 웨비나, 제품 업데이트를 받아보세요.',
    subscribe: '구독하기',
    empty: '등록된 게시글이 없습니다.',
    locale: 'ko-KR',
  },
};

function BlogContent() {
  const { lang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category") || "all";
  const defaultSearch = searchParams.get("search") || "";

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    getPosts().then((data) => setAllPosts(data as Post[]));
  }, []);

  const langPosts = allPosts.filter(p => p.tags?.some(tag => tag.slug === LANG_TAG[lang]));
  const c = t[lang];

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Tech Blog</p>
          <div className="flex items-center justify-between gap-6 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {c.heading}
            </h1>
            <button
              onClick={() => setPopupOpen(true)}
              className="shrink-0 bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition"
            >
              {c.subscribe}
            </button>
          </div>
          <p className="text-gray-500 text-base max-w-xl">{c.subtitle}</p>
        </div>

        <BlogSubNav
          posts={langPosts}
          lang={lang}
          onFilter={setFiltered}
          defaultCategory={defaultCategory}
          defaultSearch={defaultSearch}
        />
        <NewsletterPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-24">{c.empty}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <a
                href={`/blog/${post.slug}`}
                key={post.id}
                className="flex"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/blog/${post.slug}`);
                }}
              >
                <article className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                  <div className="aspect-video bg-slate-100 relative overflow-hidden shrink-0">
                    {post.feature_image && (
                      <img src={post.feature_image} alt={post.title} className="object-cover w-full h-full" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-lg text-slate-900 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-3 flex-1">{post.custom_excerpt || post.excerpt}</p>
                    <div className="text-xs text-gray-400 mt-4 shrink-0">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(c.locale, { year: 'numeric', month: 'short', day: 'numeric' })
                        : ''}
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function BlogPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div className="h-14 bg-white border-b border-gray-100" />}>
        <BlogContent />
      </Suspense>
    </div>
  );
}
