import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Languages, ArrowRight, Sparkles, Check, AlertCircle, RefreshCw, Volume2, Box, Layers } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';
import { playHoverSound, playWordHarmonicSound } from '../utils/soundEffects';
import { useSiteData } from '../context/SiteDataContext';

interface TranslationCompareSectionProps {
  lang: Language;
}

export const TranslationCompareSection: React.FC<TranslationCompareSectionProps> = ({ lang }) => {
  const { translationSamples } = useSiteData();
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider'>('side-by-side');
  const [hoveredSourceWord, setHoveredSourceWord] = useState<number | null>(null);
  const [hoveredTargetWord, setHoveredTargetWord] = useState<number | null>(null);

  const sample = translationSamples[activeSampleIndex] || translationSamples[0];

  const sourceWords = (sample?.source || '').replace(/[“”"']/g, '').split(' ');
  const targetWords = (sample?.target || '').replace(/[“”"']/g, '').split(' ');

  const handleSourceWordHover = (idx: number) => {
    setHoveredSourceWord(idx);
    playWordHarmonicSound(idx, 'en');
  };

  const handleTargetWordHover = (idx: number) => {
    setHoveredTargetWord(idx);
    playWordHarmonicSound(idx, 'kr');
  };

  return (
    <section id="translation" className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <Box size={14} />
            <span>{lang === 'KR' ? '3D 번역 퀄리티 & 자막 인터페이스' : '3D Translation Showcase'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight mb-4">
            {lang === 'KR' ? (
              <>
                어색한 직역 대신,<br />
                <span className="text-sky-400">귀에 꽂히는 진짜 문맥</span>을 담습니다
              </>
            ) : (
              <>
                Not Rigid Literal Cuts,<br />
                <span className="text-sky-400">Living Contextual Subtitles</span>
              </>
            )}
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            {lang === 'KR'
              ? '번역 전(Source)과 번역 후(Target)의 차이를 비교해 보세요. 자막 단어 위에 마우스를 올리면 3D 인터페이스 효과와 사운드가 반응합니다.'
              : 'Hover over individual words to experience 3D perspective typography & live micro-sound feedback.'}
          </p>
        </div>

        {/* Sample Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {translationSamples.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSampleIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeSampleIndex === idx
                  ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25 ring-2 ring-[#0066FF]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 shadow-xs border border-slate-200/60'
              }`}
            >
              <span>{s.title[lang]}</span>
            </button>
          ))}
        </div>

        {/* Translation Comparison Showcase Container */}
        <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,102,255,0.04)] border border-sky-100/70">
          {/* Top Context Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-2xl bg-sky-100 text-[#0066FF] font-black flex items-center justify-center text-sm shadow-xs">
                0{activeSampleIndex + 1}
              </span>
              <div>
                <h4 className="text-base md:text-lg font-bold text-[#0F172A]">
                  {sample.title[lang]}
                </h4>
                <p className="text-xs text-slate-400 font-medium">{sample.context[lang]}</p>
              </div>
            </div>

            {/* Toggle Mode */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-bold self-start sm:self-auto">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'side-by-side'
                    ? 'bg-white text-[#0066FF] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lang === 'KR' ? '나란히 비교' : 'Side-by-Side'}
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-white text-[#0066FF] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lang === 'KR' ? '슬라이더 비교' : 'Slider Compare'}
              </button>
            </div>
          </div>

          {/* Source Audio Script (English) with 3D Tilt */}
          <ThreeDTiltCard
            maxTilt={7}
            enableGlare={true}
            enableSound={false}
            className="mb-8 p-6 rounded-[28px] bg-slate-50 border border-sky-100/80 shadow-xs"
          >
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="flex items-center justify-between mb-3"
            >
              <span
                style={{ transform: 'translateZ(20px)' }}
                className="text-xs font-bold text-[#0066FF] uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                English Source (영문 원본)
              </span>
              <span
                style={{ transform: 'translateZ(15px)' }}
                className="text-[11px] font-medium text-slate-400 flex items-center gap-1"
              >
                <Volume2 size={12} className="text-[#0066FF]" />
                <span>Audio Timecode 00:42 ~ 00:51</span>
              </span>
            </div>

            {/* Interactive English Words */}
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="flex flex-wrap gap-1.5 text-base md:text-lg font-bold text-[#0F172A] tracking-tight leading-relaxed italic select-none"
            >
              <span className="text-sky-400 font-serif">“</span>
              {sourceWords.map((word, wIdx) => {
                const isHovered = hoveredSourceWord === wIdx;
                const isNeighbor =
                  hoveredSourceWord !== null &&
                  Math.abs(hoveredSourceWord - wIdx) === 1;

                return (
                  <span
                    key={`src-${wIdx}`}
                    onMouseEnter={() => handleSourceWordHover(wIdx)}
                    onMouseLeave={() => setHoveredSourceWord(null)}
                    style={{
                      transform: isHovered
                        ? 'translateZ(30px) scale(1.18) rotateX(-4deg)'
                        : isNeighbor
                        ? 'translateZ(15px) scale(1.06)'
                        : 'translateZ(0px) scale(1)',
                      textShadow: isHovered
                        ? '0 1px 0 #38BDF8, 0 2px 0 #0284C7, 0 3px 0 #0369A1, 0 6px 12px rgba(0, 102, 255, 0.5), 0 0 16px rgba(56, 189, 248, 0.8)'
                        : 'none',
                      transformStyle: 'preserve-3d',
                    }}
                    className={`inline-block px-1.5 py-0.5 rounded-lg transition-all duration-150 cursor-pointer ${
                      isHovered
                        ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/40 not-italic ring-2 ring-sky-300 font-black'
                        : isNeighbor
                        ? 'bg-slate-200/90 text-slate-800 font-semibold not-italic'
                        : 'hover:bg-slate-200/80'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
              <span className="text-sky-400 font-serif">”</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              {lang === 'KR' ? '💡 영어 단어 위에 마우스를 올리면 호버 반응과 효과음이 재생됩니다' : '💡 Hover over any word to trigger 3D highlight & audio'}
            </div>
          </ThreeDTiltCard>

          {/* Comparison Body: Side by Side vs Slider */}
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left: Literal translation (Direct Machine Style) */}
              <ThreeDTiltCard
                maxTilt={8}
                enableGlare={true}
                className="bg-slate-50 rounded-[28px] p-6 border border-rose-100 relative h-full flex flex-col justify-between"
              >
                <div style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      style={{ transform: 'translateZ(20px)' }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60"
                    >
                      <AlertCircle size={14} />
                      <span>{lang === 'KR' ? '단순 직역 (Before)' : 'Literal / Machine (Before)'}</span>
                    </div>
                    <span className="text-xs text-slate-400">{lang === 'KR' ? '어색하고 경직된 자막' : 'Rigid & Unnatural'}</span>
                  </div>
                  <p
                    style={{ transform: 'translateZ(15px)' }}
                    className="text-sm md:text-base text-slate-400 font-medium leading-relaxed mb-4 line-through decoration-rose-300"
                  >
                    {sample.literal}
                  </p>
                </div>
                <div
                  style={{ transform: 'translateZ(10px)' }}
                  className="text-xs text-rose-600 bg-white p-3 rounded-2xl border border-rose-100"
                >
                  {lang === 'KR'
                    ? '⚠️ 영어식 비유를 그대로 옮겨 한국어 시청자 몰입을 방해함'
                    : '⚠️ Word-for-word translation loses original conversational intent'}
                </div>
              </ThreeDTiltCard>

              {/* Right: Contextual translation (KIM PAY Target Style) with 3D Hover Typography */}
              <ThreeDTiltCard
                maxTilt={10}
                enableGlare={true}
                enableSound={true}
                soundType="chime"
                className="bg-white rounded-[28px] p-6 border-2 border-[#0066FF] shadow-[0_15px_40px_rgba(0,102,255,0.12)] relative h-full flex flex-col justify-between"
              >
                <div style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      style={{ transform: 'translateZ(25px)' }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-sky-500 px-3 py-1 rounded-full shadow-md shadow-blue-500/30"
                    >
                      <Sparkles size={14} className="fill-white" />
                      <span>{lang === 'KR' ? '3D 문맥 맞춤 자막 (Target)' : 'KIM PAY 3D Contextual'}</span>
                    </div>
                    <span
                      style={{ transform: 'translateZ(15px)' }}
                      className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60"
                    >
                      {lang === 'KR' ? '시청각 최적화' : 'Audio-Visual Optimized'}
                    </span>
                  </div>

                  {/* Interactive Korean Subtitle Words with 3D Extrusion */}
                  <div
                    style={{ transformStyle: 'preserve-3d' }}
                    className="flex flex-wrap gap-1.5 text-base md:text-lg text-[#0F172A] font-bold leading-relaxed mb-4 py-1 select-none"
                  >
                    {targetWords.map((word, wIdx) => {
                      const isHovered = hoveredTargetWord === wIdx;
                      const isNeighbor =
                        hoveredTargetWord !== null &&
                        Math.abs(hoveredTargetWord - wIdx) === 1;

                      return (
                        <span
                          key={`tgt-${wIdx}`}
                          onMouseEnter={() => handleTargetWordHover(wIdx)}
                          onMouseLeave={() => setHoveredTargetWord(null)}
                          style={{
                            transform: isHovered
                              ? 'translateZ(34px) scale(1.2) rotateX(-4deg)'
                              : isNeighbor
                              ? 'translateZ(16px) scale(1.08)'
                              : 'translateZ(0px) scale(1)',
                            textShadow: isHovered
                              ? '0 1px 0 #38BDF8, 0 2px 0 #0284C7, 0 3px 0 #0369A1, 0 6px 14px rgba(0, 102, 255, 0.7), 0 0 20px rgba(56, 189, 248, 0.85)'
                              : 'none',
                            transformStyle: 'preserve-3d',
                          }}
                          className={`inline-block px-1.5 py-0.5 rounded-lg transition-all duration-150 cursor-pointer ${
                            isHovered
                              ? 'bg-gradient-to-r from-[#0066FF] to-sky-400 text-white shadow-lg shadow-blue-500/50 ring-2 ring-sky-300 font-black'
                              : isNeighbor
                              ? 'bg-sky-100/80 text-sky-900 font-bold'
                              : 'hover:bg-sky-50 text-[#0F172A]'
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="text-xs text-slate-700 bg-sky-50 p-3 rounded-2xl border border-sky-100 flex items-start gap-2 shadow-xs"
                >
                  <Check size={14} className="text-[#0066FF] shrink-0 mt-0.5" />
                  <span>{sample.explanation[lang]}</span>
                </div>
              </ThreeDTiltCard>
            </div>
          ) : (
            /* Interactive Slider Compare UI */
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500 px-2">
                <span className="text-rose-600">◀ 단순 직역 (Before)</span>
                <span className="text-slate-400">슬라이더를 좌우로 드래그하여 비교해 보세요</span>
                <span className="text-[#0066FF] font-bold">문맥 번역 (Target) ▶</span>
              </div>

              {/* Slider Box */}
              <div className="relative h-48 sm:h-40 rounded-[28px] overflow-hidden border border-slate-200 select-none shadow-xs">
                {/* Background Layer: Target translation */}
                <div className="absolute inset-0 bg-sky-50/60 p-6 flex flex-col justify-center border-2 border-[#0066FF]">
                  <div className="text-xs font-bold text-white bg-[#0066FF] px-2.5 py-0.5 rounded-full w-fit mb-2">
                    문맥 번역 (Target)
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
                    {sample.target}
                  </p>
                </div>

                {/* Foreground Layer: Literal translation clipped by slider */}
                <div
                  className="absolute inset-0 bg-white p-6 flex flex-col justify-center border-r-2 border-slate-800 transition-none"
                  style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}
                >
                  <div className="min-w-[320px] sm:min-w-[600px]">
                    <div className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full w-fit mb-2">
                      단순 직역 (Before)
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-400 line-through decoration-rose-300 leading-relaxed">
                      {sample.literal}
                    </p>
                  </div>
                </div>

                {/* Interactive Range Input Overlay */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Comparison slider"
                />

                {/* Visual Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#0066FF] z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0066FF] border-2 border-white flex items-center justify-center shadow-lg text-white text-xs font-black">
                    ⇄
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <strong className="text-[#0066FF]">{lang === 'KR' ? '💡 번역 포인트:' : '💡 Translator Note:'}</strong> {sample.explanation[lang]}
              </div>
            </div>
          )}

          {/* Subtitle Sync Precision Banner */}
          <div className="bg-slate-50 rounded-[28px] p-5 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-3">
              <span className="text-xl">⏱️</span>
              <span>
                {lang === 'KR'
                  ? '글자수 및 음절 속도를 계산하여 시청자가 영상을 보며 편안히 읽을 수 있도록 자막 템포를 조절합니다.'
                  : 'Subtitle character count and display duration strictly optimized for effortless viewer retention.'}
              </span>
            </div>
            <span className="shrink-0 font-bold text-white bg-[#0066FF] px-4 py-1.5 rounded-full shadow-xs">
              {lang === 'KR' ? 'SRT / VTT 파일 기본 제공' : 'SRT / VTT Included'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

