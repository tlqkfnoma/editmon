import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { MessageCircle, Mail, Copy, Check, Send, PhoneCall, Sparkles, Clock, ShieldCheck, Lock } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { playHoverSound } from '../utils/soundEffects';

interface ContactSectionProps {
  lang: Language;
  onOpenModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenModal }) => {
  const [copied, setCopied] = useState(false);
  const { siteProfile, setIsAuthModalOpen, isAdminLoggedIn, setIsEditorModalOpen } = useSiteData();
  const emailAddress = siteProfile.email || 'contact@kimpay-portfolio.com';
  
  // Secret multi-click detector for copyright text
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyrightClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      playHoverSound('chime');
      if (isAdminLoggedIn) {
        setIsEditorModalOpen(true);
      } else {
        setIsAuthModalOpen(true);
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1000);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenKakao = () => {
    // Open kakao inquiry modal or link
    onOpenModal();
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative">
      <div className="max-w-5xl mx-auto">
        {/* Clean Blue & Sky Blue Accent Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#0066FF] via-[#0284C7] to-[#38BDF8] rounded-[40px] p-8 sm:p-12 md:p-16 text-center shadow-[0_25px_60px_rgba(0,102,255,0.25)] relative overflow-hidden flex flex-col items-center justify-center text-white"
        >
          {/* Subtle orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/30 shadow-xs">
              {lang === 'KR' ? '간편 상담 & 견적' : 'Quick Inquiry'}
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {lang === 'KR' ? '새로운 프로젝트를 함께할까요?' : 'Ready to start a new project together?'}
            </h2>

            <p className="text-white/90 font-medium text-sm sm:text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {lang === 'KR'
                ? '기획안이나 레퍼런스 영상 링크만 보내주셔도 견적과 예상 일정을 친절하고 신속하게 안내해 드립니다.'
                : 'Send your concept or reference video links. We will respond with pricing estimates and timeline within hours.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-8">
              {/* KakaoTalk OpenChat Button */}
              <button
                id="contact-kakao-btn"
                onClick={handleOpenKakao}
                className="w-full sm:w-auto bg-white text-[#0066FF] hover:bg-sky-50 py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-blue-950/20"
              >
                <span>💬</span>
                <span>{lang === 'KR' ? '오픈채팅 문의' : 'Open Chat Inquiry'}</span>
              </button>

              {/* Send Email Button */}
              <button
                id="contact-email-btn"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white py-4 px-8 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-white/30 backdrop-blur-xs"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-sky-300" />
                    <span>{lang === 'KR' ? '이메일 주소 복사됨!' : 'Email Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>{lang === 'KR' ? '이메일 보내기' : 'Send Email'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick response badge */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/85">
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{lang === 'KR' ? '평일 기준 30분 내 빠른 회신' : 'Fast reply within 30 min on weekdays'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span>{lang === 'KR' ? 'NDA 비밀유지서약서 작성 가능' : 'NDA Agreement Supported'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sleek Interface Footer with Hidden Master Trigger */}
        <footer className="h-16 flex items-center justify-center gap-3 text-[11px] text-slate-400 font-medium tracking-widest uppercase mt-8 select-none">
          <span
            onClick={handleCopyrightClick}
            title="3번 연속 클릭 시 관리자 인증 창이 열립니다 (비밀번호: 0313)"
            className="cursor-pointer hover:text-slate-600 transition-colors"
          >
            © 2026 KIM PAY PORTFOLIO. MADE WITH PASSION
          </span>

          {/* Hidden Admin Access Button */}
          <button
            onClick={() => {
              playHoverSound('tap');
              if (isAdminLoggedIn) {
                setIsEditorModalOpen(true);
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            title="마스터 관리자 직접 수정 (비밀번호: 0313 / 단축키: Ctrl + Shift + A)"
            className="p-1 rounded-full text-slate-300 hover:text-sky-500 opacity-20 hover:opacity-100 transition-all cursor-pointer hover:scale-125"
          >
            <Lock size={11} />
          </button>
        </footer>
      </div>
    </section>
  );
};
