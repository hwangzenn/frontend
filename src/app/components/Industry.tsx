'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IndustryProps {
  lang: 'EN' | 'KR';
}

const categories = ['Biotech', 'Medical Devices', 'Pharmaceuticals', 'Electronics', 'Automotive', 'Aerospace'];

const storiesData = {
  EN: {
    Biotech: {
      title: 'Biotechnology & Diagnostic Equipment',
      challenge: 'Leveraging machine learning to optimize the assembly of delicate catheters and tubing, ensuring consistent quality even at scale.',
      stats: [
        { label: 'HIGHER PRODUCTION EFFICIENCY', value: '30%' },
        { label: 'REDUCTION IN CYCLE TIME', value: '40%' },
      ],
      quote: 'Smart Optimization for Complex Biotech',
    },
    'Medical Devices': {
      title: 'Medical Device Manufacturing',
      challenge: 'Advanced AI vision systems ensure the integrity of ultra-precise sealing and assembly for implants and diagnostic sensors, meeting strict ISO manufacturing standards.',
      stats: [
        { label: 'QUALITY CONSISTENCY', value: '99.99%' },
        { label: 'FASTER DEFECT DETECTION', value: '25%' },
        { label: 'TOLERANCE CONTROL', value: 'ZERO' },
      ],
      quote: 'Precision Beyond Human Vision',
    },
    Pharmaceuticals: {
      title: 'Pharmaceutical Integrated Solutions',
      challenge: 'From raw material intake to final packaging, our end-to-end AI control minimizes human intervention, effectively eliminating contamination risks and ensuring total process stability.',
      stats: [
        { label: 'DECREASE IN HUMAN ERROR', value: '90%' },
        { label: 'PROCESS EFFICIENCY GAIN', value: '35%' },
        { label: 'REAL-TIME AUTONOMOUS MONITORING', value: '24/7' },
      ],
      quote: 'Untouched Quality, AI-Controlled',
    },
    Electronics: {
      title: 'Electronics',
      challenge: 'AI-driven vision detects microscopic defects in PCBs and displays, ensuring zero-defect assembly in high-volume production.',
      stats: [
        { label: 'ACCURACY', value: '99.8%' },
        { label: 'FASTER TACK TIME', value: '20%' },
      ],
      quote: 'Precision at Speed',
    },
    Automotive: {
      title: 'Automotive',
      challenge: 'AI-optimized control for complex sensor and lighting modules, maintaining high quality standards through rapid manufacturing cycles.',
      stats: [
        { label: 'PRODUCTIVITY BOOST', value: '30%' },
        { label: 'WASTE REDUCTION', value: '15%' },
      ],
      quote: 'Smart Assembly',
    },
    Aerospace: {
      title: 'Aerospace',
      challenge: 'Specialized solutions for structural composite bonding, ensuring maximum safety and durability for satellite and drone systems.',
      stats: [
        { label: 'INTEGRITY', value: '100%' },
        { label: 'TIME REDUCTION', value: '25%' },
      ],
      quote: 'Mission-Critical Reliability',
    },
  },
  KR: {
    Biotech: {
      title: '바이오테크 및 진단 장비',
      challenge: '머신러닝을 활용해 섬세한 카테터 및 튜브 조립을 최적화하여, 대량 생산 환경에서도 일관된 품질을 보장합니다.',
      stats: [
        { label: '생산 효율성 향상', value: '30%' },
        { label: '사이클 타임 단축', value: '40%' },
      ],
      quote: '복잡한 바이오테크를 위한 스마트 최적화',
    },
    'Medical Devices': {
      title: '의료기기 제조',
      challenge: '첨단 AI 비전 시스템으로 임플란트 및 진단 센서의 초정밀 밀봉·조립 무결성을 보장하며, 엄격한 ISO 제조 기준을 준수합니다.',
      stats: [
        { label: '품질 일관성', value: '99.99%' },
        { label: '불량 감지 속도 향상', value: '25%' },
        { label: '공차 제어', value: 'ZERO' },
      ],
      quote: '인간의 시각을 초월한 정밀도',
    },
    Pharmaceuticals: {
      title: '제약 통합 솔루션',
      challenge: '원자재 입고부터 최종 포장까지, 엔드투엔드 AI 제어로 인적 개입을 최소화하여 오염 위험을 효과적으로 제거하고 공정 안정성을 완전히 보장합니다.',
      stats: [
        { label: '인적 오류 감소', value: '90%' },
        { label: '공정 효율성 향상', value: '35%' },
        { label: '실시간 자율 모니터링', value: '24/7' },
      ],
      quote: '비접촉 품질, AI 제어',
    },
    Electronics: {
      title: '전자 부품',
      challenge: 'AI 비전으로 PCB 및 디스플레이의 미세 불량을 감지하여, 대량 생산에서도 무결점 조립을 실현합니다.',
      stats: [
        { label: '정확도', value: '99.8%' },
        { label: '택타임 단축', value: '20%' },
      ],
      quote: '스피드를 갖춘 정밀도',
    },
    Automotive: {
      title: '자동차',
      challenge: '복잡한 센서 및 조명 모듈 조립을 AI로 최적화하여, 빠른 생산 사이클 속에서도 높은 품질 기준을 유지합니다.',
      stats: [
        { label: '생산성 향상', value: '30%' },
        { label: '폐기물 감소', value: '15%' },
      ],
      quote: '스마트 조립',
    },
    Aerospace: {
      title: '항공우주',
      challenge: '위성 및 드론 시스템의 구조적 복합재 접합에 특화된 솔루션으로, 최대 안전성과 내구성을 보장합니다.',
      stats: [
        { label: '구조 무결성', value: '100%' },
        { label: '시간 단축', value: '25%' },
      ],
      quote: '임무 수행에 최적화된 신뢰성',
    },
  },
};

const sectionTitle = { EN: 'Built for the Industries That Demand Precision', KR: '정밀도가 곧 신뢰인 산업을 위해' };
const viewCaseStudy = { EN: 'View Case Study →', KR: '사례 연구 보기 →' };

export default function Industry({ lang }: IndustryProps) {
  const [activeTab, setActiveTab] = useState('Biotech');
  const data = storiesData[lang][activeTab as keyof (typeof storiesData)['EN']];

  return (
    <section id="industry" className="pt-16 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">{sectionTitle[lang]}</h2>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                activeTab === cat ? 'bg-slate-900 text-white' : 'bg-white border border-gray-400 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${lang}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm border flex flex-col md:flex-row"
          >
            <div className="w-full md:w-[45%] bg-slate-900 p-8 flex flex-col justify-end min-h-[400px]">
              <div className="grid grid-cols-1 gap-6">
                {data.stats.map((stat, i) => (
                  <div key={i} className="text-white border-b border-white/10 pb-6">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs tracking-wider opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[55%] p-10 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{data.title}</h3>
              <p className="text-gray-600 mb-8 font-light">{data.challenge}</p>
              <blockquote className="text-lg text-slate-900 mb-8">&ldquo;{data.quote}&rdquo;</blockquote>
              <button className="self-start bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition">
                {viewCaseStudy[lang]}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
