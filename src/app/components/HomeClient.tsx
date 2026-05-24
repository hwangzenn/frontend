'use client';
import Navbar from './Navbar';
import Hero from './Hero';
import Showcase from './Showcase';
import Industry from './Industry';
import TechBlog from './Techblog';
import ContactForm from './Contactform';
import { useLang } from './LangProvider';

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

export default function HomeClient({ posts }: { posts: Post[] }) {
  const { lang } = useLang();

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <Hero lang={lang} />
        <Showcase lang={lang} />
        <Industry lang={lang} />
        <TechBlog posts={posts} lang={lang} />
        <ContactForm lang={lang} />
      </main>
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <div>Copyright © 2026 Factorix. All rights Reserved. | Terms and Conditions | Privacy Policy</div>
        <div className="font-bold tracking-wider text-sm">Factorix</div>
      </footer>
    </div>
  );
}
