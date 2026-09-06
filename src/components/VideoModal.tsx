import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { PortfolioItem, Language } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Subtitles, CheckCircle2, Clock, Wrench, ExternalLink, Box } from 'lucide-react';
import { InteractiveSubtitleHUD } from './InteractiveSubtitleHUD';

interface VideoModalProps {
  item: PortfolioItem | null;
  lang: Language;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ item, lang, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!item) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 bg-white rounded-[40px] overflow-hidden max-w-4xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#0066FF]" />
            <h3 className="text-base sm:text-lg font-black text-[#0F172A] line-clamp-1">
              {item.title[lang]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Container */}
        {item.youtubeId ? (
          <div className="relative aspect-video w-full bg-black shrink-0 overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title[lang]}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-black shrink-0 overflow-hidden group">
            <video
              ref={videoRef}
              src={item.videoUrl}
              autoPlay
              playsInline
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />

            {/* Subtitle simulation overlay */}
            {subtitlesEnabled && item.hasSubtitles && (
              <div className="absolute bottom-16 left-0 right-0 px-6 text-center pointer-events-none">
                <span className="inline-block bg-black/75 backdrop-blur-xs text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg leading-relaxed border border-white/10">
                  {lang === 'KR'
                    ? '“시청자의 시선을 붙잡는 영상 리듬과 살아있는 번역 자막을 결합합니다.”'
                    : '"Synchronizing high-retention video rhythm with idiomatic subtitle translation."'}
                </span>
              </div>
            )}

            {/* Bottom Player Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between text-white text-xs opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className="text-gray-300 font-mono text-xs">{item.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.hasSubtitles && (
                  <button
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      subtitlesEnabled ? 'bg-[#0066FF] text-white font-black' : 'bg-white/20 text-white'
                    }`}
                    title="자막 켜기/끄기"
                  >
                    <Subtitles size={13} />
                    <span>CC</span>
                  </button>
                )}
                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition cursor-pointer"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Information Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#0066FF] bg-sky-50 border border-sky-200/60 px-2.5 py-1 rounded-full">
                  {item.client}
                </span>
                {item.youtubeId && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <span>YouTube 열기</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <h4 className="text-xl font-black text-[#0F172A] mt-1">
                {item.title[lang]}
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.tools.map((tool, i) => (
                <span
                  key={i}
                  className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            {item.description[lang]}
          </p>

          {/* 3D Interactive Subtitle Showcase within Modal */}
          {item.subtitleSample && (
            <div className="bg-slate-900 rounded-[28px] p-5 text-white border border-sky-500/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-black text-sky-300 tracking-wide flex items-center gap-1.5">
                    <Box size={13} className="text-cyan-400" />
                    <span>{lang === 'KR' ? '3D 입체 인터랙티브 자막 HUD' : '3D Spatial Subtitle HUD'}</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {lang === 'KR' ? '단어 호버 시 3D 입체 돌출 & 사운드' : 'Hover words for 3D extrusion'}
                </span>
              </div>

              <div className="pt-1">
                <InteractiveSubtitleHUD
                  subtitle={item.subtitleSample}
                  isCardHovered={true}
                  lang={lang}
                />
              </div>
            </div>
          )}

          <div>
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'KR' ? '주요 작업 포인트' : 'Key Production Points'}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {item.features[lang].map((feature, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 size={15} className="text-[#0066FF] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
