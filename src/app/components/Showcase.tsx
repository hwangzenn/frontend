import { Trophy } from "lucide-react";
import Image from "next/image";

interface ShowcaseProps {
  lang: 'EN' | 'KR';
}

const t = {
  EN: {
    headline: 'Two Technologies. One Zero-Defect Standard.',
    product1Title: 'Smart Wearable Device',
    product1Desc: 'Maximize efficiency with CES-Recognized Wearable Technology. Designed seamlessly for rugged environments, providing hands-free access to critical data and step-by-step guidance to prevent human error.',
    cesBadge: 'CES Innovation Award Winner',
    product2Title: 'Detect. Correct. Before It Costs You.',
    product2Desc: 'AI-powered auto-correction identifies dispensing deviations the moment they occur — driving defect rates to zero across bio, pharma, medical device & battery manufacturing.
',
  },
  KR: {
    headline: '두 가지 기술, 하나의 기준 — 불량 제로',
    product1Title: '보이는 것이 곧 소통이 됩니다',
    product1Desc: 'CES 혁신상을 수상한 Factorix 스마트 글라스는 제조 현장의 실시간 동시통역과 컨시어지 기능을 하나의 웨어러블 디바이스에 담았습니다.해외 기술자, 글로벌 바이어와의 소통 장벽이 사라지는 순간 — 현장의 속도가 달라집니다.',
    cesBadge: 'CES 혁신상 수상',
    product2Title: '이탈하는 순간, AI가 되돌립니다',
    product2Desc: '토출 결과값이 설정치를 벗어나는 순간 Factorix AI가 자동으로 감지하고 보정합니다. 바이오·의료기기·제약·전지 공정의 불량률을 사실상 제로로 수렴시킵니다.',
  },
};

export default function Showcase({ lang }: ShowcaseProps) {
  const c = t[lang];
  return (
    <section id="product" className="pt-24 pb-16 max-w-7xl mx-auto px-6 space-y-24">

      <h2 className="text-4xl font-bold tracking-tight text-slate-950 text-center">
        {c.headline}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-slate-50 rounded-2xl h-[380px] relative overflow-hidden border border-gray-100">
          <Image src="/image/solution_1.jpg" alt="Smart Wearable Device" fill className="object-cover rounded-2xl" />
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-bold tracking-tight text-slate-950">{c.product1Title}</h3>
          <p className="text-gray-600 leading-relaxed font-light">{c.product1Desc}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 w-fit px-4 py-2 rounded-full">
            <Trophy size={14} /> {c.cesBadge}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h3 className="text-3xl font-bold tracking-tight text-slate-950">{c.product2Title}</h3>
          <p className="text-gray-600 leading-relaxed font-light">{c.product2Desc}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl h-[380px] relative overflow-hidden border border-gray-100 order-1 md:order-2">
          <Image src="/image/solution_2.png" alt="Smart Liquid Process Automation Solution" fill className="object-cover rounded-2xl" />
        </div>
      </div>

    </section>
  );
}
