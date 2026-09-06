import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  lang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-[#FFFFFF] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            {lang === 'KR' ? '원활하고 투명한 협업' : 'Step-by-Step Workflow'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight mb-4">
            {lang === 'KR' ? (
              <>
                번거로움 없이 편안하게,<br />
                <span className="text-sky-400">4단계 협업 프로세스</span>
              </>
            ) : (
              <>
                Effortless Execution,<br />
                <span className="text-sky-400">Simple 4-Step Process</span>
              </>
            )}
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            {lang === 'KR'
              ? '상담부터 납품까지 모든 과정이 군더더기 없이 빠르고 직관적으로 진행됩니다.'
              : 'From first contact to final cut, a transparent, high-speed delivery pipeline.'}
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#F8FAFC] rounded-[40px] p-8 border border-slate-200/60 hover:border-sky-300 shadow-[0_20px_50px_rgba(0,102,255,0.03)] hover:shadow-[0_25px_60px_rgba(0,102,255,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-sky-100 group-hover:to-blue-100 transition-colors flex items-center justify-center text-2xl shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#0066FF] transition-colors">
                    {item.step}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0066FF] transition-colors">
                  {item.title[lang]}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed mb-6">
                  {item.desc[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <div className="flex items-start gap-1.5 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={14} className="text-[#0066FF] shrink-0 mt-0.5" />
                  <span className="leading-tight">{item.highlight[lang]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
