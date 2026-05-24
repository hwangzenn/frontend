'use client';
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const categories = [
  { label: "All", labelKr: "전체", slug: "all" },
  { label: "Case Study", labelKr: "도입사례", slug: "case-study" },
  { label: "Manufacturing Trends", labelKr: "제조트렌드", slug: "manufacturing-trends" },
  { label: "Awards & Patents", labelKr: "인증·특허", slug: "awards-patents" },
];

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

interface Props {
  posts: Post[];
  lang: 'EN' | 'KR';
  onFilter: (filtered: Post[]) => void;
  defaultCategory?: string;
  defaultSearch?: string;
}

export default function BlogSubNav({ posts, lang, onFilter, defaultCategory = "all", defaultSearch = "" }: Props) {
  const [active, setActive] = useState(defaultCategory);
  const [query, setQuery] = useState(defaultSearch);

  useEffect(() => {
    let filtered = posts;

    if (active !== "all") {
      filtered = filtered.filter(post =>
        post.tags?.some(tag => tag.slug === active)
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(q) ||
        (post.custom_excerpt || post.excerpt || "").toLowerCase().includes(q)
      );
    }

    onFilter(filtered);
  }, [active, query, posts]);

  return (
    <div className="mb-10 inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-100/80 px-3 py-2">

      <nav className="flex items-center gap-1">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition ${
              active === cat.slug
                ? "bg-slate-900 text-white shadow-sm"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
            }`}
          >
            {lang === 'KR' ? cat.labelKr : cat.label}
          </button>
        ))}
      </nav>

      <div className="w-px h-5 bg-gray-200 shrink-0" />

      <div className="flex items-center gap-2 px-3 py-1.5 min-w-[160px]">
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder={lang === 'KR' ? "검색어를 입력하세요" : "Search articles..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-xs text-slate-700 placeholder-gray-400 outline-none w-full"
        />
      </div>

    </div>
  );
}