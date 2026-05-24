interface HeroProps {
  lang: 'EN' | 'KR';
}

const t = {
  EN: {
    title: <>From Innovation to Implementation:<br className="hidden md:inline" /> Engineering the Zero-Defect Future</>,
    subtitle: 'Leveraging AI-powered computer vision, Factorix identifies defects before they occur. We optimize your bottom line through zero-defect reliability.',
    btn1: 'View Case Studies →',
    btn2: 'Request a Demo',
  },
  KR: {
    title: <>혁신에서 실현까지:<br className="hidden md:inline" /> 무결점 미래를 설계합니다</>,
    subtitle: 'AI 기반 컴퓨터 비전으로 결함 발생 전 사전 감지. Factorix는 무결점 신뢰성으로 귀사의 생산성을 최적화합니다.',
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
