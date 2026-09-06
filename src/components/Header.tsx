import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onOpenContactModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: lang === 'KR' ? '작업물' : 'Work', href: '#work' },
    { label: lang === 'KR' ? '서비스' : 'Service', href: '#service' },
    { label: lang === 'KR' ? '번역비교' : 'Translation', href: '#translation' },
    { label: lang === 'KR' ? '프로세스' : 'Process', href: '#process' },
    { label: lang === 'KR' ? '신뢰도' : 'Trust', href: '#trust' },
    { label: lang === 'KR' ? '문의하기' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] border-b border-gray-100 py-4'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/60 py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#38BDF8] rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-xl text-white">K</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-[#0F172A]">
            KIM PAY<span className="text-[#38BDF8]">.</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-[#0066FF] border border-sky-200/70">
            {lang === 'KR' ? '영상 & 번역' : 'Video & Translation'}
          </span>
        </a>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9 font-bold text-sm text-slate-500">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0066FF] transition-colors relative py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Language Toggle & Quick CTA */}
        <div className="flex items-center gap-3">
          {/* Language Switch Pill */}
          <button
            id="header-lang-toggle"
            onClick={onToggleLang}
            className="bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-all cursor-pointer text-slate-700"
            title={lang === 'KR' ? '영문 버전으로 보기' : 'Switch to Korean'}
          >
            <span
              className={`transition-colors ${
                lang === 'KR' ? 'text-[#0066FF] font-black' : 'opacity-50 font-medium'
              }`}
            >
              KR
            </span>
            <span className="text-slate-300">|</span>
            <span
              className={`transition-colors ${
                lang === 'EN' ? 'text-[#0066FF] font-black' : 'opacity-50 font-medium'
              }`}
            >
              EN
            </span>
          </button>

          {/* Quick Kakao Chat CTA */}
          <button
            onClick={onOpenContactModal}
            className="hidden sm:flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer active:scale-95"
          >
            <MessageCircle size={15} className="fill-white/20 text-white" />
            <span>{lang === 'KR' ? '빠른 문의' : 'Quick Chat'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-3 shadow-lg"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-[#0F172A] hover:text-[#0066FF] border-b border-slate-50 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ArrowUpRight size={16} className="text-slate-400" />
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="w-full py-3 bg-[#0066FF] rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
            >
              <MessageCircle size={16} />
              {lang === 'KR' ? '카카오톡 문의하기' : 'Open Kakao Inquiry'}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
