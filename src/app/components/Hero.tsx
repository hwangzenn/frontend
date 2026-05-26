interface HeroProps {
  lang: 'EN' | 'KR';
}

const t = {
  EN: {
    title: <>Manufacturing Intelligence,<br className="hidden md:inline" /> Redesigned.</>,
    subtitle: 'AI-powered smart factory solutions for bio, beauty & semiconductor industries.CES Innovation Award-winning technology that eliminates defects and breaks communication barriers.',
    btn1: 'View Case Studies →',
    btn2: 'Request a Demo',
  },
  KR: {
    title: <>제조 현장의 지능이<br className="hidden md:inline" /> 다시 설계됩니다</>,
    subtitle: 'CES 혁신상 수상 기술로 불량률을 낮추고, 현장 소통의 장벽을 없앱니다.',
    btn1: '사례 연구 보기 →',
    btn2: '데모 신청',
  },
};

export default function Hero({ lang }: HeroProps) {
  const c = t[lang];
  return (
    <section id="about" className="relative text-white py-24 md:py-32 px-6 overflow-hidden">

      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero_factorix_3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.15] mb-6 max-w-4xl">
          {c.title}
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light mb-10 leading-relaxed">
          {c.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button className="bg-white text-slate-900 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition shadow-sm">
            {c.btn1}
          </button>
          <button className="border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition">
            {c.btn2}
          </button>
        </div>
      </div>

    </section>
  );
}
