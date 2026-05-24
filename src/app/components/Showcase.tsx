import { Trophy } from "lucide-react";
import Image from "next/image";

interface ShowcaseProps {
  lang: 'EN' | 'KR';
}

const t = {
  EN: {
    product1Title: 'Smart Wearable Device',
    product1Desc: 'Maximize efficiency with CES-Recognized Wearable Technology. Designed seamlessly for rugged environments, providing hands-free access to critical data and step-by-step guidance to prevent human error.',
    cesBadge: 'CES Innovation Award Winner',
    product2Title: <>Smart Liquid Process<br />Automation Solution</>,
    product2Desc: 'Provides liquid handling with massive data integration. Our system protects chemical integrity, controls accurate temperatures, and eliminates cross-contamination through automated protocol validation.',
  },
  KR: {
    product1Title: '스마트 웨어러블 디바이스',
    product1Desc: 'CES 수상 웨어러블 기술로 효율성을 극대화하세요. 열악한 환경에서도 완벽하게 작동하도록 설계되어, 핸즈프리로 주요 데이터에 접근하고 단계별 가이드로 인적 오류를 방지합니다.',
    cesBadge: 'CES 혁신상 수상',
    product2Title: <>스마트 액체 공정<br />자동화 솔루션</>,
    product2Desc: '대규모 데이터 통합 기반의 액체 취급 기능을 제공합니다. 화학 물질 무결성 보호, 정밀 온도 제어, 자동화된 프로토콜 검증을 통한 교차 오염 방지까지 지원합니다.',
  },
};

export default function Showcase({ lang }: ShowcaseProps) {
  const c = t[lang];
  return (
    <section id="product" className="pt-24 pb-16 max-w-7xl mx-auto px-6 space-y-24">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-slate-50 rounded-2xl h-[380px] relative overflow-hidden border border-gray-100">
          <Image src="/image/solution_1.jpg" alt="Smart Wearable Device" fill className="object-cover rounded-2xl" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{c.product1Title}</h2>
          <p className="text-gray-600 leading-relaxed font-light">{c.product1Desc}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 w-fit px-4 py-2 rounded-full">
            <Trophy size={14} /> {c.cesBadge}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{c.product2Title}</h2>
          <p className="text-gray-600 leading-relaxed font-light">{c.product2Desc}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl h-[380px] relative overflow-hidden border border-gray-100 order-1 md:order-2">
          <Image src="/image/solution_2.png" alt="Smart Liquid Process Automation Solution" fill className="object-cover rounded-2xl" />
        </div>
      </div>

    </section>
  );
}
