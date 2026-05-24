'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLang } from "./LangProvider";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, setLang } = useLang();

  const handleContactUs = () => {
    if (isHome) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link href="/">
          <Image src="/image/logo.png" alt="Factorix" width={140} height={60} className="object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href={isHome ? "#product" : "/#product"} className="hover:text-black transition">
            {lang === 'KR' ? '제품' : 'Product'}
          </a>
          <a href={isHome ? "#industry" : "/#industry"} className="hover:text-black transition">
            {lang === 'KR' ? '산업' : 'Industry'}
          </a>
          <Link
            href="/blog"
            className={`hover:text-black transition ${pathname.startsWith('/blog') ? 'text-slate-900 font-semibold' : ''}`}
          >
            {lang === 'KR' ? '테크 블로그' : 'Tech Blog'}
          </Link>
          <button onClick={handleContactUs} className="hover:text-black transition">
            {lang === 'KR' ? '문의하기' : 'Contact Us'}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold">
            <button
              onClick={() => setLang('EN')}
              className={`px-3 py-1 rounded-full transition ${lang === 'EN' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('KR')}
              className={`px-3 py-1 rounded-full transition ${lang === 'KR' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              KR
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
