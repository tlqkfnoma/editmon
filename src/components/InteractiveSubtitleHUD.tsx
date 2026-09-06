import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Box, Eye, Layers } from 'lucide-react';
import { playHoverSound, playWordHarmonicSound } from '../utils/soundEffects';

interface SubtitleSampleData {
  kr: string;
  en: string;
  timecode?: string;
  speaker?: string;
  keyPoint?: string;
}

interface InteractiveSubtitleHUDProps {
  subtitle: SubtitleSampleData;
  isCardHovered: boolean;
  lang: 'KR' | 'EN';
}

export const InteractiveSubtitleHUD: React.FC<InteractiveSubtitleHUDProps> = ({
  subtitle,
  isCardHovered,
  lang,
}) => {
  const [activeLang, setActiveLang] = useState<'both' | 'kr' | 'en'>('both');
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [depthIntensity, setDepthIntensity] = useState<boolean>(true);
  const [mouseCoord, setMouseCoord] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const hudRef = useRef<HTMLDivElement>(null);

  const krWords = subtitle.kr.replace(/[“”"']/g, '').split(' ');
  const enWords = subtitle.en.replace(/[“”"']/g, '').split(' ');

  const handleWordHover = (idx: number, type: 'kr' | 'en') => {
    setHoveredWordIndex(idx);
    if (soundEnabled) {
      playWordHarmonicSound(idx, type);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hudRef.current) return;
    const rect = hudRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoord({ x, y });
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      playHoverSound('chime');
    }
  };

  const handleLangToggle = (e: React.MouseEvent, mode: 'both' | 'kr' | 'en') => {
    e.stopPropagation();
    setActiveLang(mode);
    if (soundEnabled) {
      playHoverSound('tap');
    }
  };

  const toggleDepth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDepthIntensity(!depthIntensity);
    playHoverSound('glimmer');
  };

  const isAnyWordHovered = hoveredWordIndex !== null;

  return (
    <div
      ref={hudRef}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: 'preserve-3d',
        transform: isCardHovered
          ? 'translateZ(42px)'
          : 'translateZ(30px)',
      }}
      className="w-full select-none transition-transform duration-300 relative group/hud"
    >
      {/* 3D Atmospheric Ambient Backlight (Projector Aura Glow) */}
      <div
        style={{
          background: `radial-gradient(60% 60% at ${mouseCoord.x}% ${mouseCoord.y}%, rgba(0, 102, 255, ${
            isAnyWordHovered ? 0.35 : isCardHovered ? 0.22 : 0.08
          }), transparent 80%)`,
          filter: 'blur(16px)',
          transform: 'translateZ(-15px)',
        }}
        className="absolute -inset-2 rounded-3xl pointer-events-none transition-all duration-300"
      />

      {/* 3D Floating Glass HUD Container */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isAnyWordHovered
            ? '0 16px 40px -8px rgba(0, 102, 255, 0.45), 0 0 25px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
            : isCardHovered
            ? '0 12px 32px -6px rgba(0, 102, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
            : '0 8px 24px -4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        }}
        className={`relative rounded-2xl transition-all duration-300 border ${
          isCardHovered || isAnyWordHovered
            ? 'bg-slate-900/92 backdrop-blur-md border-sky-400/60'
            : 'bg-slate-900/80 backdrop-blur-sm border-white/15'
        } p-3.5 text-white overflow-hidden`}
      >
        {/* Holographic 3D Light Bar (Top Edge Beam) */}
        <div
          style={{
            transform: 'translateZ(10px)',
            opacity: isAnyWordHovered ? 1 : isCardHovered ? 0.8 : 0.3,
          }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-opacity duration-300"
        />

        {/* Ambient Subtle Cyber Grid Texture */}
        <div
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
            backgroundSize: '12px 12px',
          }}
          className="absolute inset-0 pointer-events-none opacity-40"
        />

        {/* Top Mini HUD Bar with 3D Depth Indicator */}
        <div
          style={{ transform: 'translateZ(18px)' }}
          className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10 text-[11px] relative z-10"
        >
          <div className="flex items-center gap-2">
            {/* Live Audio Spectrum Equalizer */}
            <div className="flex items-end gap-0.5 h-3.5 w-4.5 px-0.5">
              <span
                className={`w-1 bg-[#38BDF8] rounded-full transition-all duration-150 ${
                  isCardHovered || isAnyWordHovered ? 'animate-bounce h-3.5' : 'h-1.5'
                }`}
                style={{ animationDelay: '0ms' }}
              />
              <span
                className={`w-1 bg-[#60A5FA] rounded-full transition-all duration-150 ${
                  isCardHovered || isAnyWordHovered ? 'animate-bounce h-2' : 'h-3'
                }`}
                style={{ animationDelay: '120ms' }}
              />
              <span
                className={`w-1 bg-[#0066FF] rounded-full transition-all duration-150 ${
                  isCardHovered || isAnyWordHovered ? 'animate-bounce h-3' : 'h-2'
                }`}
                style={{ animationDelay: '240ms' }}
              />
            </div>

            {/* 3D Atmospheric Depth Pill */}
            <button
              onClick={toggleDepth}
              className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition cursor-pointer border ${
                depthIntensity
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-xs'
                  : 'bg-white/5 text-slate-400 border-white/10'
              }`}
              title="3D 입체 자막 효과 모드"
            >
              <Box size={10} className={depthIntensity ? 'animate-pulse text-sky-300' : ''} />
              <span>{depthIntensity ? '3D 입체 자막' : 'Flat CC'}</span>
            </button>

            {subtitle.speaker && (
              <span className="font-bold text-slate-300 hidden sm:inline-block">
                {subtitle.speaker}
              </span>
            )}
          </div>

          {/* Mode Switchers & Sound Toggle */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
              <button
                onClick={(e) => handleLangToggle(e, 'kr')}
                className={`px-1.5 py-0.5 rounded-md transition cursor-pointer ${
                  activeLang === 'kr' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="한국어 자막만"
              >
                KR
              </button>
              <button
                onClick={(e) => handleLangToggle(e, 'both')}
                className={`px-1.5 py-0.5 rounded-md transition cursor-pointer ${
                  activeLang === 'both' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="영·한 동시 자막"
              >
                ALL
              </button>
              <button
                onClick={(e) => handleLangToggle(e, 'en')}
                className={`px-1.5 py-0.5 rounded-md transition cursor-pointer ${
                  activeLang === 'en' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="English Subtitle"
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleSound}
              className={`p-1 rounded-lg transition cursor-pointer ${
                soundEnabled
                  ? 'bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 ring-1 ring-sky-400/40'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? '마우스 호버 사운드 켜짐' : '효과음 끔'}
            >
              {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
          </div>
        </div>

        {/* Subtitle Dialogue Words with 3D Pop & Atmospheric Extrusion */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="space-y-2 text-xs font-medium relative z-10"
        >
          {/* Korean Spoken Line */}
          {(activeLang === 'both' || activeLang === 'kr') && (
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="flex flex-wrap items-center gap-1.5 leading-relaxed"
            >
              <span
                style={{ transform: 'translateZ(14px)' }}
                className="text-[9px] font-black tracking-wider text-sky-300 bg-sky-950/90 border border-sky-500/40 px-1.5 py-0.5 rounded-md shrink-0 self-center shadow-xs"
              >
                KR
              </span>
              {krWords.map((word, wIdx) => {
                const isHovered = hoveredWordIndex === wIdx;
                const isNeighbor =
                  hoveredWordIndex !== null &&
                  Math.abs(hoveredWordIndex - wIdx) === 1;

                // 3D Extrusion & Lift styles
                const transform = isHovered && depthIntensity
                  ? 'translateZ(38px) scale(1.22) rotateX(-4deg)'
                  : isNeighbor && depthIntensity
                  ? 'translateZ(18px) scale(1.08)'
                  : 'translateZ(6px) scale(1)';

                const textShadow = isHovered && depthIntensity
                  ? '0 1px 0 #38BDF8, 0 2px 0 #0284C7, 0 3px 0 #0369A1, 0 6px 14px rgba(0, 102, 255, 0.7), 0 0 22px rgba(56, 189, 248, 0.85)'
                  : 'none';

                return (
                  <span
                    key={`kr-${wIdx}`}
                    onMouseEnter={() => handleWordHover(wIdx, 'kr')}
                    onMouseLeave={() => setHoveredWordIndex(null)}
                    style={{
                      transform,
                      textShadow,
                      transformStyle: 'preserve-3d',
                    }}
                    className={`inline-block px-1.5 py-0.5 rounded-md transition-all duration-150 cursor-pointer select-none ${
                      isHovered
                        ? 'bg-gradient-to-r from-[#0066FF] to-sky-400 text-white font-black shadow-lg shadow-blue-500/60 ring-2 ring-sky-300'
                        : isNeighbor
                        ? 'bg-white/20 text-white font-bold'
                        : 'text-slate-100 hover:bg-white/15'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          )}

          {/* English Contextual Subtitle Line */}
          {(activeLang === 'both' || activeLang === 'en') && (
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="flex flex-wrap items-center gap-1.5 leading-relaxed pt-1 border-t border-white/5"
            >
              <span
                style={{ transform: 'translateZ(14px)' }}
                className="text-[9px] font-black tracking-wider text-amber-300 bg-amber-950/90 border border-amber-500/40 px-1.5 py-0.5 rounded-md shrink-0 self-center shadow-xs"
              >
                EN
              </span>
              {enWords.map((word, wIdx) => {
                const actualIdx = wIdx + 100;
                const isHovered = hoveredWordIndex === actualIdx;
                const isNeighbor =
                  hoveredWordIndex !== null &&
                  Math.abs(hoveredWordIndex - actualIdx) === 1;

                const transform = isHovered && depthIntensity
                  ? 'translateZ(38px) scale(1.22) rotateX(-4deg)'
                  : isNeighbor && depthIntensity
                  ? 'translateZ(18px) scale(1.08)'
                  : 'translateZ(6px) scale(1)';

                const textShadow = isHovered && depthIntensity
                  ? '0 1px 0 #FBBF24, 0 2px 0 #D97706, 0 3px 0 #B45309, 0 6px 14px rgba(245, 158, 11, 0.7), 0 0 22px rgba(251, 191, 36, 0.85)'
                  : 'none';

                return (
                  <span
                    key={`en-${wIdx}`}
                    onMouseEnter={() => handleWordHover(actualIdx, 'en')}
                    onMouseLeave={() => setHoveredWordIndex(null)}
                    style={{
                      transform,
                      textShadow,
                      transformStyle: 'preserve-3d',
                    }}
                    className={`inline-block px-1.5 py-0.5 rounded-md text-[11px] italic transition-all duration-150 cursor-pointer select-none ${
                      isHovered
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/60 ring-2 ring-amber-200 not-italic'
                        : isNeighbor
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Floating Nuance Tag & 3D Atmosphere Hint */}
        <div
          style={{ transform: 'translateZ(16px)' }}
          className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 relative z-10"
        >
          {subtitle.keyPoint ? (
            <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
              <Sparkles size={11} className="text-cyan-300 animate-spin" />
              <span>{subtitle.keyPoint}</span>
            </span>
          ) : (
            <span className="text-sky-300 font-medium">실시간 싱크 자막</span>
          )}
          <span className="text-[9px] text-sky-200/80 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>단어 위로 마우스를 훑어보세요</span>
          </span>
        </div>
      </div>
    </div>
  );
};
