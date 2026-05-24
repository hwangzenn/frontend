'use client';
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { label: "All", slug: "all" },
  { label: "Case Study", slug: "case-study" },
  { label: "Manufacturing Trends", slug: "manufacturing-trends" },
  { label: "Awards & Patents", slug: "awards-patents" },
];

export default function BlogSubNavWrapper({ defaultCategory }: { defaultCategory: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleCategory = (slug: string) => {
    router.push(`/blog?category=${slug}`);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-6 pb-2 flex justify-center">
      <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-100/80 px-3 py-2">

        <nav className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition ${
                defaultCategory === cat.slug
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="w-px h-5 bg-gray-200 shrink-0" />

        <div className="flex items-center gap-2 px-3 py-1.5 min-w-[160px]">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent text-xs text-slate-700 placeholder-gray-400 outline-none w-full"
          />
        </div>

      </div>
    </div>
  );
}