import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, X, KeyRound, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { playHoverSound } from '../../utils/soundEffects';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAdmin, setIsEditorModalOpen } = useSiteData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      setPin('');
      setError(false);
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.trim() === '0313') {
      setSuccess(true);
      setError(false);
      loginAdmin('0313');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setIsEditorModalOpen(true);
      }, 500);
    } else {
      setError(true);
      playHoverSound('tap');
      setTimeout(() => {
        setPin('');
      }, 700);
    }
  };

  const handleKeypadClick = (num: string) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      playHoverSound('tap');
      if (nextPin === '0313') {
        setSuccess(true);
        setError(false);
        loginAdmin('0313');
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setIsEditorModalOpen(true);
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    playHoverSound('pop');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className={`w-full max-w-md bg-slate-900 text-white rounded-[32px] p-7 sm:p-8 border shadow-2xl relative overflow-hidden ${
            error ? 'border-rose-500 shadow-rose-500/30 animate-shake' : 'border-sky-500/30 shadow-sky-500/20'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Header Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                success
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                  : error
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                  : 'bg-sky-500/20 text-sky-400 border border-sky-400/30 shadow-lg shadow-blue-500/20'
              }`}
            >
              {success ? <Unlock size={24} /> : <Lock size={24} />}
            </div>

            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 mb-2">
              Hidden Master Control
            </span>
            <h3 className="text-xl font-black text-white">웹사이트 관리자 인증</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              호스팅 배포 후에도 웹사이트 전체(영상, 문구, 번역 등)를 직접 편집할 수 있는 숨겨진 마스터 콘솔입니다.
            </p>
          </div>

          {/* PIN Input Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                ref={inputRef}
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="비밀번호 4자리 입력"
                className={`w-full bg-slate-950/80 border text-center text-2xl tracking-[0.5em] font-mono py-3.5 px-4 rounded-2xl text-white placeholder:text-slate-600 focus:outline-hidden transition-all ${
                  error
                    ? 'border-rose-500 ring-2 ring-rose-500/40'
                    : success
                    ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                    : 'border-slate-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30'
                }`}
              />
              <KeyRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-semibold mt-2.5"
              >
                <AlertCircle size={14} />
                <span>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</span>
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold mt-2.5"
              >
                <ShieldCheck size={14} />
                <span>인증되었습니다! 관리자 에디터로 전환합니다...</span>
              </motion.p>
            )}
          </form>

          {/* Numeric Quick Keypad */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => {
                  if (btn === 'C') setPin('');
                  else if (btn === '←') handleBackspace();
                  else handleKeypadClick(btn);
                }}
                className={`h-11 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  btn === 'C' || btn === '←'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95'
                    : 'bg-slate-800/80 text-white hover:bg-sky-600/30 hover:text-sky-300 hover:border-sky-400/40 border border-slate-700/50 active:scale-95'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleSubmit()}
            className="w-full py-3.5 bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <span>관리자 모드 접속</span>
            <ArrowRight size={16} />
          </button>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-slate-500">
              단축키: <kbd className="px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">Ctrl + Shift + A</kbd>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
