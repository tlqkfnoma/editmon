import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Language, PortfolioItem } from '../types';
import { Play, Clock, Sparkles, SlidersHorizontal, Eye, Box } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';
import { InteractiveSubtitleHUD } from './InteractiveSubtitleHUD';
import { useSiteData } from '../context/SiteDataContext';

interface PortfolioSectionProps {
  lang: Language;
  onSelectProject: (item: PortfolioItem) => void;
  selectedCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

interface PortfolioCardItemProps {
  item: PortfolioItem;
  lang: Language;
  onSelect: () => void;
}

const PortfolioCardItem: React.FC<PortfolioCardItemProps> = ({ item, lang, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback subtitle sample if not explicitly specified
  const subtitleData = item.subtitleSample || {
    kr: `“${item.title.KR.replace(/\[.*?\]/g, '').trim()}”`,
    en: `“${item.title.EN.replace(/\[.*?\]/g, '').trim()}”`,
    speaker: item.client,
    timecode: '00:15',
    keyPoint: item.hasSubtitles ? '영·한 실시간 번역 자막' : '감각적인 모션 자막',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <ThreeDTiltCard
        maxTilt={11}
        enableGlare={true}
        enableSound={true}
        soundType="woosh"
        onClick={onSelect}
        className="group h-full bg-[#F8FAFC] rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_28px_65px_rgba(0,102,255,0.12)] border border-slate-200/70 hover:border-sky-300 cursor-pointer flex flex-col transition-shadow duration-300"
      >
        {/* Thumbnail Image Container with 3D Depth */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="relative aspect-video w-full overflow-hidden bg-slate-900 select-none"
        >
          <img
            src={item.thumbnail}
            alt={item.title[lang]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity" />

          {/* Duration Tag - 3D Pop */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/10"
          >
            <Clock size={11} />
            <span>{item.duration}</span>
          </div>

          {/* Badges - 3D Pop */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="absolute top-3 left-3 flex items-center gap-1.5"
          >
            {item.hasSubtitles && (
              <div className="bg-[#0066FF] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-ping" />
                <span>{lang === 'KR' ? '3D 자막 싱크' : '3D Subtitle'}</span>
              </div>
            )}
            {item.youtubeId && (
              <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>YouTube</span>
              </div>
            )}
          </div>

          {/* Hover Play Button Trigger - Elevated in 3D */}
          <div
            style={{ transform: 'translateZ(45px)' }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 text-white flex items-center justify-center shadow-xl shadow-blue-500/50 transform scale-75 group-hover:scale-105 transition-transform duration-300 ring-4 ring-white/30">
              <Play size={22} className="fill-white translate-x-0.5" />
            </div>
          </div>

          {/* Category client in thumbnail bottom */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="absolute bottom-3 left-4 text-white/90 text-xs font-semibold flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{item.client}</span>
          </div>
        </div>

        {/* Interactive 3D Subtitle Floating Ribbon */}
        <div className="px-4 -mt-3 relative z-20">
          <InteractiveSubtitleHUD
            subtitle={subtitleData}
            isCardHovered={isHovered}
            lang={lang}
          />
        </div>

        {/* Card Content & Tool Badges */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="p-6 pt-4 flex-1 flex flex-col justify-between bg-white"
        >
          <div>
            <h3
              style={{ transform: 'translateZ(15px)' }}
              className="text-lg md:text-xl font-bold text-[#0F172A] group-hover:text-[#0066FF] transition-colors line-clamp-1 mb-2 tracking-tight"
            >
              {item.title[lang]}
            </h3>
            <p
              style={{ transform: 'translateZ(10px)' }}
              className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4 font-normal"
            >
              {item.description[lang]}
            </p>
          </div>

          {/* Tool Badges on hover/view */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5"
          >
            {item.tools.map((tool, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-slate-600 group-hover:bg-[#E0F2FE] group-hover:text-[#0066FF] transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </ThreeDTiltCard>
    </div>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onSelectProject,
  selectedCategory,
  onCategoryChange,
}) => {
  const { portfolioItems } = useSiteData();

  const categories: { key: Category; label: { KR: string; EN: string } }[] = [
    { key: 'all', label: { KR: '전체', EN: 'All' } },
    { key: 'interview_event', label: { KR: '인터뷰(행사)', EN: 'Interview (Event)' } },
    { key: 'variety_talk', label: { KR: '예능(토크)', EN: 'Variety (Talk)' } },
    { key: 'real_estate', label: { KR: '부동산', EN: 'Real Estate' } },
    { key: 'travel', label: { KR: '여행', EN: 'Travel' } },
    { key: 'mukbang', label: { KR: '먹방', EN: 'Mukbang' } },
    { key: 'vlog_daily', label: { KR: '일상(브이로그)', EN: 'Daily (Vlog)' } },
    { key: 'fitness', label: { KR: '헬스(운동)', EN: 'Fitness' } },
    { key: 'fishing', label: { KR: '낚시', EN: 'Fishing' } },
    { key: 'golf', label: { KR: '골프', EN: 'Golf' } },
  ];

  const filteredItems = portfolioItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-[#FFFFFF] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title & Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#E0F2FE] text-[#0066FF] border border-[#BAE6FD] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Box size={14} className="text-[#0066FF]" />
              <span>{lang === 'KR' ? '3D 인터페이스 아카이브' : '3D Interactive Archive'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
              Featured<br />
              <span className="text-sky-300">Work.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs md:text-sm font-bold text-gray-500">
            <span className="bg-[#F0F7FF] text-[#0066FF] border border-[#E0F2FE] px-4 py-2 rounded-full shadow-xs w-fit">
              {lang === 'KR' ? '경력 3년+ (since 2020)' : '3+ Years (since 2020)'}
            </span>
            <span className="text-xs text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200/80 font-semibold flex items-center gap-1.5 w-fit">
              <Sparkles size={12} className="text-[#0066FF]" />
              <span>{lang === 'KR' ? '마우스를 카드와 자막 단어에 올려보세요 (3D 틸트 & 효과음)' : 'Hover cards & subtitle words for 3D tilt & audio fx'}</span>
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onCategoryChange(cat.key)}
                className={`px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25 ring-2 ring-[#0066FF]/20'
                    : 'bg-[#F1F5F9] text-gray-600 hover:bg-[#E2E8F0] border border-gray-200/60'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />}
                <span>{cat.label[lang]}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white text-gray-500 shadow-xs'
                  }`}
                >
                  {cat.key === 'all'
                    ? portfolioItems.length
                    : portfolioItems.filter((i) => i.category === cat.key).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid with 3D Tilt Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="h-full"
              >
                <PortfolioCardItem
                  item={item}
                  lang={lang}
                  onSelect={() => onSelectProject(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

