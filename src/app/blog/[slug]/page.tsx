import { getSinglePost, getPosts } from "@/lib/ghost";
import Navbar from "../../components/Navbar";
import BlogSubNavWrapper from "../../components/BlogSubNavWrapper";
import NewsletterPopup from "../../components/NewsletterPopup";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string | null;
  published_at?: string | null;
  slug: string;
  tags?: { name: string; slug: string }[];
  html?: string;
  updated_at?: string | null;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getSinglePost(params.slug),
    getPosts(),
  ]);

  if (!post) return (
    <div>
      <Navbar />
      <div className="p-24 text-center text-gray-400">Post not found.</div>
    </div>
  );

  const postTags = post.tags?.map((t: { slug: string }) => t.slug) || [];
  const validSlugs = ["case-study", "manufacturing-trends", "awards-patents"];
  const defaultCategory = postTags.find((t: string) => validSlugs.includes(t)) || "all";

  // 관련 글: 같은 태그를 가진 다른 글 3개
  const relatedPosts = (allPosts as Post[])
    .filter((p) => p.slug !== params.slug)
    .filter((p) => p.tags?.some((t) => postTags.includes(t.slug)))
    .slice(0, 3);

  // 관련 글이 3개 미만이면 최신 글로 채움
  if (relatedPosts.length < 3) {
    const fallbackPosts = (allPosts as Post[])
      .filter((p) => p.slug !== params.slug && !relatedPosts.find((r) => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...fallbackPosts);
  }

  return (
    <div>
      <Navbar />
      <BlogSubNavWrapper defaultCategory={defaultCategory} />
      <main className="max-w-3xl mx-auto px-6 pt-10 pb-24">
        {post.feature_image && (
          <img src={post.feature_image} alt={post.title} className="w-full rounded-2xl mb-10 object-cover max-h-[400px]" />
        )}
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 mb-4">{post.title}</h1>
        <div className="text-xs text-gray-400 mb-10">
          {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
        </div>
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html || '' }}
        />

        {/* 목록 이동 버튼 */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-slate-900 transition"
          >
            <ArrowLeft size={16} />
            목록으로 이동
          </Link>
        </div>

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6">관련 글</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link href={`/blog/${related.slug}`} key={related.id}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer h-full">
                    <div className="aspect-video bg-slate-100 relative overflow-hidden">
                      {related.feature_image && (
                        <img src={related.feature_image} alt={related.title} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-slate-900 line-clamp-2">{related.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {related.published_at
                          ? new Date(related.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : ''}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 뉴스레터 구독 팝업 */}
      <NewsletterPopup />
    </div>
  );
}
