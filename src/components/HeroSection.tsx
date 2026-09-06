import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { ArrowDown, Play, Sparkles, Volume2, VolumeX, Layers, Film, CheckCircle2, Box } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';
import { playHoverSound, playWordHarmonicSound } from '../utils/soundEffects';
import { useSiteData } from '../context/SiteDataContext';

interface HeroSectionProps {
  lang: Language;
  onExploreWork: () => void;
  onOpenContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreWork,
  onOpenContactModal,
}) => {
  const { siteProfile } = useSiteData();
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hoveredHeroWord, setHoveredHeroWord] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const heroSubtitleWords =
    lang === 'KR'
      ? siteProfile.heroWordsKR || ['원어민의', '감정선과', '말투까지', '생생하게', '살려내는', '3D', '고감도', '자막']
      : siteProfile.heroWordsEN || ['Breathing', 'native', 'empathy', 'into', 'every', '3D', 'synchronized', 'line'];

  const handleWordHover = (idx: number) => {
    setHoveredHeroWord(idx);
    playWordHarmonicSound(idx, lang === 'KR' ? 'kr' : 'en');
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden bg-[#F8FAFC]">
      {/* 1. Background Video Loop with 20% Opacity Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-110 saturate-120 transition-opacity duration-1000 scale-105"
          poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/60 to-[#F8FAFC]/95" />
      </div>

      {/* Video Audio Control Pill (bottom right floating) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-100 shadow-sm text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
        <span>{lang === 'KR' ? '편집 쇼릴 루프' : 'Showreel Loop'}</span>
        <button
          onClick={toggleSound}
          className="ml-1 p-1 hover:bg-slate-100 rounded-full transition cursor-pointer"
          title={muted ? '소리 켜기' : '음소거'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#0066FF]" />}
        </button>
      </div>

      {/* 2. Sleek Interface Hero Bento Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-[40px] p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,102,255,0.05)] border border-sky-100/80 relative overflow-hidden"
        >
          {/* Subtle signature sky blue orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-200/50 via-blue-100/30 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none blur-2xl" />

          <div className="relative z-10 flex flex-col items-start text-left">
            {/* Sleek Pill Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] px-4 py-1.5 rounded-full font-bold text-xs mb-6 shadow-xs cursor-default"
            >
              <Box size={13} className="text-[#0066FF]" />
              <span>{lang === 'KR' ? (siteProfile.heroBadgeKR || '영상 편집 & 영어 번역 · 3D 인터페이스') : (siteProfile.heroBadgeEN || 'Video Editing & English Translation · 3D Interface')}</span>
            </motion.span>

            {/* Sleek Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.15] tracking-tight mb-6 text-[#0F172A] whitespace-pre-line"
            >
              {lang === 'KR' ? (siteProfile.heroHeadlineKR || '언어의 장벽을 허물고,\n영상에 감각을 더하다.') : (siteProfile.heroHeadlineEN || 'Breaking language barriers,\nAdding visual flair.')}
            </motion.h1>

            {/* Sub-headline Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed mb-6"
            >
              {lang === 'KR' ? (siteProfile.heroSubheadKR || '유튜브 브이로그부터 기업 홍보영상 및 글로벌 인터뷰까지, 단순 직역을 넘어선 문맥 번역과 시선을 사로잡는 리듬감 있는 컷 편집을 선사합니다.') : (siteProfile.heroSubheadEN || 'From YouTube vlogs to corporate global keynotes, delivering contextual bilingual translation combined with rhythmic cinematic video editing.')}
            </motion.p>

            {/* 3D Interactive Subtitle Ribbon Preview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full max-w-2xl mb-8"
            >
              <ThreeDTiltCard
                maxTilt={8}
                enableGlare={true}
                enableSound={false}
                className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border border-sky-400/40 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group/herocard"
              >
                {/* Holographic Top Laser Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                <div style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      style={{ transform: 'translateZ(20px)' }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-0.5 h-3">
                        <span className="w-0.5 h-2.5 bg-sky-400 rounded-full animate-bounce" />
                        <span className="w-0.5 h-3.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:120ms]" />
                        <span className="w-0.5 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:240ms]" />
                      </div>
                      <span className="text-[11px] font-black text-sky-300 tracking-wide flex items-center gap-1.5">
                        <Box size={11} className="text-cyan-400" />
                        <span>3D SPATIAL SUBTITLES · 입체 자막 프리뷰</span>
                      </span>
                    </div>
                    <span
                      style={{ transform: 'translateZ(18px)' }}
                      className="text-[10px] text-sky-300 font-bold bg-sky-500/20 border border-sky-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>단어 호버 3D 효과</span>
                    </span>
                  </div>

                  {/* Interactive Subtitle Words with 3D Extrusion */}
                  <div
                    style={{ transformStyle: 'preserve-3d' }}
                    className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base font-bold leading-relaxed pt-1 select-none"
                  >
                    <span className="text-sky-400 font-serif text-lg">“</span>
                    {heroSubtitleWords.map((word, idx) => {
                      const isHovered = hoveredHeroWord === idx;
                      const isNeighbor =
                        hoveredHeroWord !== null &&
                        Math.abs(hoveredHeroWord - idx) === 1;

                      return (
                        <span
                          key={idx}
                          onMouseEnter={() => handleWordHover(idx)}
                          onMouseLeave={() => setHoveredHeroWord(null)}
                          style={{
                            transform: isHovered
                              ? 'translateZ(36px) scale(1.2) rotateX(-5deg)'
                              : isNeighbor
                              ? 'translateZ(18px) scale(1.08)'
                              : 'translateZ(6px) scale(1)',
                            textShadow: isHovered
                              ? '0 1px 0 #38BDF8, 0 2px 0 #0284C7, 0 3px 0 #0369A1, 0 6px 14px rgba(0, 102, 255, 0.7), 0 0 20px rgba(56, 189, 248, 0.9)'
                              : 'none',
                            transformStyle: 'preserve-3d',
                          }}
                          className={`inline-block px-1.5 py-0.5 rounded-md transition-all duration-150 cursor-pointer ${
                            isHovered
                              ? 'bg-gradient-to-r from-[#0066FF] to-sky-400 text-white shadow-lg shadow-blue-500/60 ring-2 ring-sky-300 font-black'
                              : isNeighbor
                              ? 'bg-white/15 text-white font-bold'
                              : 'text-slate-100 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                    <span className="text-sky-400 font-serif text-lg">”</span>
                  </div>
                </div>
              </ThreeDTiltCard>
            </motion.div>

            {/* Sleek Interface Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Blue Button with arrow tag */}
              <button
                id="hero-view-portfolio-btn"
                onClick={onExploreWork}
                className="w-full sm:w-auto bg-[#0066FF] hover:bg-[#0052cc] text-white px-8 py-4 rounded-[24px] font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg shadow-blue-500/25 active:scale-95"
              >
                <span>{lang === 'KR' ? '포트폴리오 바로보기' : 'View Portfolio'}</span>
                <span className="bg-white/20 p-1 rounded-full text-xs">→</span>
              </button>

              {/* Consultation Secondary Button */}
              <button
                id="hero-contact-btn"
                onClick={onOpenContactModal}
                className="w-full sm:w-auto px-7 py-4 bg-slate-100 hover:bg-slate-200/80 active:scale-95 text-[#0F172A] rounded-[24px] font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'KR' ? '프로젝트 간편 문의' : 'Quick Inquiry'}</span>
              </button>
            </motion.div>

            {/* Micro Credibility Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-slate-100 w-full flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-400"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                <span>{lang === 'KR' ? '경력 3년+ (Since 2020)' : '3+ Years Experience (Since 2020)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                <span>{lang === 'KR' ? '원어민 감수 & SRT 싱크' : 'Native Nuance & SRT Sync'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                <span>{lang === 'KR' ? '평균 48시간 내 초안 납품' : '48h Fast First Draft'}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <a
        href="#service"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-700 transition animate-bounce hidden sm:block p-2"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

