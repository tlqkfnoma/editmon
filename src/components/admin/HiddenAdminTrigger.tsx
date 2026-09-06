import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Settings, Edit3, Download, LogOut, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { playHoverSound } from '../../utils/soundEffects';

export const HiddenAdminTrigger: React.FC = () => {
  const {
    isAdminLoggedIn,
    setIsAuthModalOpen,
    setIsEditorModalOpen,
    logoutAdmin,
    exportDataJSON,
  } = useSiteData();

  const [isBarMinimized, setIsBarMinimized] = useState(false);

  const handleOpenAuth = () => {
    playHoverSound('tap');
    setIsAuthModalOpen(true);
  };

  const handleOpenEditor = () => {
    playHoverSound('chime');
    setIsEditorModalOpen(true);
  };

  const handleQuickDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportDataJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kimpay-site-data-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playHoverSound('pop');
  };

  // If NOT logged in, show nothing here (the secret button is also placed in the Footer)
  // But we can also keep a very discreet, 10% opacity lock button at the very bottom right corner
  if (!isAdminLoggedIn) {
    return (
      <div className="fixed bottom-3 right-3 z-40">
        <button
          onClick={handleOpenAuth}
          title="웹사이트 관리자 인증 (단축키: Ctrl + Shift + A)"
          className="w-7 h-7 rounded-full bg-slate-900/40 hover:bg-slate-900/90 text-slate-400/50 hover:text-sky-400 flex items-center justify-center transition-all duration-300 opacity-20 hover:opacity-100 hover:scale-110 cursor-pointer shadow-xs"
        >
          <Lock size={12} />
        </button>
      </div>
    );
  }

  // If logged in: Show Floating Admin Control Bar
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[8000] w-auto max-w-xl">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/95 text-white backdrop-blur-xl border border-sky-500/40 rounded-full py-2 px-4 shadow-[0_10px_35px_rgba(0,102,255,0.3)] flex items-center gap-3"
      >
        <div className="flex items-center gap-2 pl-1 pr-2 border-r border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black text-white tracking-wide flex items-center gap-1.5">
            <Sparkles size={12} className="text-cyan-400" />
            <span className="hidden sm:inline">관리자 모드</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEditor}
            className="bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Edit3 size={13} />
            <span>사이트 전체 직접 수정</span>
          </button>

          <button
            onClick={handleQuickDownload}
            title="데이터 JSON 백업 다운로드"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
          >
            <Download size={13} />
            <span className="hidden sm:inline">백업</span>
          </button>

          <button
            onClick={logoutAdmin}
            title="관리자 모드 종료"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
