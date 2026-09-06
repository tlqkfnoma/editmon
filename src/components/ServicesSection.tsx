import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { Check, ArrowRight, Video, Globe2, Sparkles, Layers, Box } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';
import { useSiteData } from '../context/SiteDataContext';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const { servicesData } = useSiteData();
  return (
    <section id="service" className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs"
          >
            <Box size={14} />
            <span>{lang === 'KR' ? '핵심 전문 서비스' : 'Core Services'}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight mb-4"
          >
            {lang === 'KR' ? (
              <>
                영상도, 번역도<br />
                <span className="text-sky-400">마음놓고 맡기는 솔루션</span>
              </>
            ) : (
              <>
                From Cut to Subtitle,<br />
                <span className="text-sky-400">Tailored with Precision</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium text-sm md:text-base"
          >
            {lang === 'KR'
              ? '쉽고 명확하게, 필요한 프로세스만 쏙쏙 골라 군더더기 없이 제공합니다. (카드를 마우스로 움직여보세요)'
              : 'Intuitive and modular services engineered for your global video needs.'}
          </motion.p>
        </div>

        {/* 3 Major Service Cards with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const isFeatured = service.id === 'all-in-one';
            const iconBg =
              service.id === 'editing'
                ? 'bg-sky-50 text-sky-600'
                : service.id === 'translation'
                ? 'bg-blue-50 text-[#0066FF]'
                : 'bg-indigo-50 text-indigo-600';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <ThreeDTiltCard
                  maxTilt={12}
                  enableGlare={true}
                  enableSound={true}
                  soundType="woosh"
                  onClick={() => onSelectService(service.id)}
                  className={`h-full relative bg-white rounded-[40px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,102,255,0.04)] hover:shadow-[0_28px_65px_rgba(0,102,255,0.14)] transition-all duration-300 flex flex-col justify-between group cursor-pointer border ${
                    isFeatured ? 'border-[#0066FF] ring-2 ring-blue-500/20' : 'border-slate-100 hover:border-sky-200'
                  }`}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div
                      style={{ transform: 'translateZ(30px)' }}
                      className="absolute top-6 right-8 bg-[#0066FF] text-white font-bold text-xs px-3.5 py-1 rounded-full shadow-md shadow-blue-500/25"
                    >
                      {lang === 'KR' ? '추천 패키지' : 'Recommended'}
                    </div>
                  )}

                  <div style={{ transformStyle: 'preserve-3d' }}>
                    {/* Top Row: Pastel Icon with 3D Pop */}
                    <div
                      style={{ transform: 'translateZ(35px)' }}
                      className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-sm select-none transition-transform group-hover:scale-110`}
                    >
                      {service.icon}
                    </div>

                    {/* Title & Description */}
                    <h3
                      style={{ transform: 'translateZ(20px)' }}
                      className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 tracking-tight group-hover:text-[#0066FF] transition-colors"
                    >
                      {service.title[lang]}
                    </h3>
                    <p
                      style={{ transform: 'translateZ(10px)' }}
                      className="text-slate-500 text-sm leading-relaxed font-normal mb-6"
                    >
                      {service.desc[lang]}
                    </p>

                    {/* Feature Checkpoints */}
                    <div
                      style={{ transform: 'translateZ(15px)' }}
                      className="space-y-2.5 pt-4 border-t border-slate-100 mb-6"
                    >
                      {service.points[lang].map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs md:text-sm font-semibold text-slate-700">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                            <Check size={11} className="text-[#0066FF] stroke-[3]" />
                          </div>
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom CTA link inside card */}
                  <div
                    style={{ transform: 'translateZ(20px)' }}
                    className="pt-2 flex items-center justify-between text-xs md:text-sm font-bold text-[#0F172A] group-hover:text-[#0066FF] transition-colors"
                  >
                    <span>{lang === 'KR' ? '관련 작업물 보기' : 'Explore Projects'}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#0066FF] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </ThreeDTiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
