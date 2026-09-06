import React from 'react';
import { motion } from 'motion/react';
import { TRUST_STATS } from '../data/portfolioData';
import { Language } from '../types';
import { ShieldCheck, Award, ThumbsUp, Users } from 'lucide-react';

interface TrustStatsSectionProps {
  lang: Language;
}

export const TrustStatsSection: React.FC<TrustStatsSectionProps> = ({ lang }) => {
  return (
    <section id="trust" className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Sleek Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] font-bold text-xs md:text-sm px-4 py-1.5 rounded-full mb-4 shadow-xs"
          >
            <ShieldCheck size={16} />
            <span>{lang === 'KR' ? '검증된 성과' : 'Proven Track Record'}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight mb-4"
          >
            {lang === 'KR' ? (
              <>
                숫자로 증명하는<br />
                <span className="text-sky-400">신뢰의 수치</span>
              </>
            ) : (
              <>
                Impact by the Numbers,<br />
                <span className="text-sky-400">Trusted Results</span>
              </>
            )}
          </motion.h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            {lang === 'KR'
              ? '수많은 클라이언트 및 크리에이터들과 함께 쌓아온 실전 제작 지표입니다.'
              : 'Consistent high marks and long-term retainers across diverse global productions.'}
          </p>
        </div>

        {/* 4 Sleek Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => {
            const unitColors = [
              'text-[#0066FF]',
              'text-sky-500',
              'text-blue-600',
              'text-indigo-500',
            ];
            const unitColor = unitColors[idx % unitColors.length];

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,102,255,0.04)] hover:shadow-[0_25px_60px_rgba(0,102,255,0.1)] transition-all duration-300 flex flex-col justify-between group border border-slate-100 hover:border-sky-200"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-sky-100 transition-colors flex items-center justify-center text-2xl">
                    {stat.icon}
                  </div>
                  <span className="bg-sky-50 text-[#0066FF] w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black">
                    ✓
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    {stat.label[lang]}
                  </p>
                  <p className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-2">
                    {stat.value.replace(/[^0-9,%]/g, '')}
                    <span className={`text-base md:text-lg font-bold ${unitColor} ml-1`}>
                      {stat.id === 'stat-1'
                        ? (lang === 'KR' ? '년+' : 'Years+')
                        : (stat.value.replace(/[0-9,%]/g, '') || (stat.id === 'stat-3' ? '' : '+'))}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed break-keep">
                    {stat.sublabel[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Testimonial / Social Proof Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white rounded-[40px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,102,255,0.04)] border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-sky-400 flex items-center justify-center font-black text-lg text-white shadow-md shadow-blue-500/20 shrink-0">
              💬
            </div>
            <div>
              <p className="text-sm md:text-base font-bold text-[#0F172A]">
                {lang === 'KR'
                  ? '"영어 인터뷰의 뉘앙스를 한국어로 맛깔나게 살려주셔서 영상 조회수가 3배 뛰었습니다."'
                  : '"Preserved the witty humor of English interviews perfectly. Our view duration doubled!"'}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                — {lang === 'KR' ? '유튜브 테크 채널 프로듀서 (구독자 38만)' : 'Tech Channel Producer (380K Subscribers)'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#0066FF] font-black text-xs bg-sky-50 px-4 py-2 rounded-full border border-sky-200/60 shrink-0">
            <span>★★★★★</span>
            <span className="text-[#0F172A] font-bold ml-1">5.0 / 5.0</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
