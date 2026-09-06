import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  Send,
  PhoneCall,
  Sparkles,
  Clock,
  ShieldCheck,
  Lock,
  FileText,
  Download,
  Printer,
  Calculator,
  ChevronRight,
  ExternalLink,
  Award,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { playHoverSound } from '../utils/soundEffects';
import { EstimateModal } from './EstimateModal';

interface ContactSectionProps {
  lang: Language;
  onOpenModal: (prefillNote?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenModal }) => {
  const [copied, setCopied] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
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
    playHoverSound('pop');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenKakao = () => {
    playHoverSound('tap');
    onOpenModal();
  };

  const handleOpenEstimate = () => {
    playHoverSound('chime');
    setIsEstimateModalOpen(true);
  };

  // Quick download standard blank estimate template (HTML/Text)
  const handleDownloadStandardRateCard = () => {
    playHoverSound('chime');
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;
    
    const content = `
[KIM PAY 영상 스튜디오 표준 제작 단가표 & 견적 안내서]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 발행자: KIM PAY 영상 스튜디오 (${siteProfile.authorName})
■ 공식 이메일: ${siteProfile.email}
■ 발행 기준일: ${dateStr}
■ 유효 기간: 상시 적용 (공식 견적서 발행 시 14일간 유효)

1. [유튜브 & 일반 롱폼 영상 편집]
- 기본 분량 (10분 기준): ₩150,000 ~
- 10분 초과 시: 분당 ₩12,000 추가
- 포함 내역: 컷편집, 키네틱 자막 디자인, BGM & 사운드 이펙트 믹싱, 색보정, 기본 2회 수정 피드백

2. [숏폼 & 릴스/쇼츠 제작 (1분 이내)]
- 1편당: ₩50,000
- 5편 패키지: ₩225,000 (10% 할인)
- 포함 내역: 오프닝 3초 훅 설계, 다이내믹 세로형 모션 자막, 트렌디 템포 연출

3. [영한 / 한영 자막 번역 & 싱크]
- 기본 5분 기준: ₩90,000 ~
- 5분 초과 시: 분당 ₩15,000
- 포함 내역: 3D 문맥 맞춤 번역, 영어 구어체/슬랭 뉘앙스 보존, 타임싱크 SRT 자막 납품

4. [올인원 풀패키지 (편집 + 영한번역 + 4K 마스터링)]
- 기본 10분 기준: ₩280,000 (15% 패키지 할인 적용)
- 포함 내역: 롱폼 편집 + 바이링구얼 자막 번역 + 맞춤 썸네일 1종 + 4K UHD 최종 마스터

5. [추가 부가 옵션]
- 24시간 내 초고속 급행 납품: 기본가의 +30%
- 유튜브 클릭률 최적화 썸네일: ₩35,000 / 종
- 원어민 에디터 2차 교정 검수: ₩40,000
- 프리미어/에펙 원본 프로젝트 파일 납품: ₩80,000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※ 본 단가표는 표준 제작 기준이며, 상세 견적서는 사이트 내 [실시간 견적서 산출] 기능으로 즉시 발급 및 PDF 다운로드하실 수 있습니다.
※ 실시간 상담: 카카오톡 오픈채팅 또는 이메일 회신
`.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KIM_PAY_표준제작단가표_${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#F8FAFC] relative">
      <div className="max-w-5xl mx-auto space-y-12">
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
              {lang === 'KR' ? '간편 상담 & 실시간 견적서' : 'Quick Inquiry & Instant Estimate'}
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {lang === 'KR' ? '새로운 프로젝트를 함께할까요?' : 'Ready to start a new project together?'}
            </h2>

            <p className="text-white/90 font-medium text-sm sm:text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {lang === 'KR'
                ? '기획안이나 레퍼런스 영상 링크만 보내주셔도 견적과 예상 일정을 신속하게 안내해 드리며, 아래에서 실시간 공식 견적서를 즉시 계산하고 PDF로 다운로드하실 수 있습니다.'
                : 'Send your concept or reference links. Calculate real-time pricing and download an official PDF estimate sheet instantly below.'}
            </p>

            {/* Action Buttons with Primary Quotation Download CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-8">
              {/* PRIMARY: Estimate Calculation & Download Button */}
              <button
                id="contact-estimate-btn"
                onClick={handleOpenEstimate}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 py-4 px-7 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-amber-500/25 ring-2 ring-white/50"
              >
                <FileText size={19} className="text-slate-950" />
                <span>{lang === 'KR' ? '📄 실시간 견적서 산출 & 다운로드' : '📄 Calculate & Download Estimate'}</span>
              </button>

              {/* KakaoTalk OpenChat Button */}
              <button
                id="contact-kakao-btn"
                onClick={handleOpenKakao}
                className="w-full sm:w-auto bg-white text-[#0066FF] hover:bg-sky-50 py-4 px-7 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-blue-950/20"
              >
                <span>💬</span>
                <span>{lang === 'KR' ? '오픈채팅 빠른 문의' : 'Open Chat Inquiry'}</span>
              </button>

              {/* Send Email Button */}
              <button
                id="contact-email-btn"
                onClick={handleCopyEmail}
                className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-white/30 backdrop-blur-xs"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-sky-300" />
                    <span>{lang === 'KR' ? '이메일 주소 복사됨!' : 'Email Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>{lang === 'KR' ? '이메일 복사' : 'Copy Email'}</span>
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
              <div className="flex items-center gap-1.5">
                <Award size={16} />
                <span>{lang === 'KR' ? 'A4 표준 견적서 즉시 발급' : 'Instant A4 Quotation Sheet'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dedicated Estimate Download Center Section (견적서 다운로드 센터) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-100 text-sky-600">
                  <Calculator size={18} />
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lang === 'KR' ? 'KIM PAY 공식 견적서 & 단가표 다운로드' : 'Official Quotation & Rate Card Download'}
                </h3>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                {lang === 'KR'
                  ? '예산 계획 및 결재 승인에 필요한 공식 표준 견적서(A4 PDF)를 1분만에 산출하고 다운로드하세요.'
                  : 'Generate and download an official A4 PDF quotation sheet tailored to your video specifications in 1 minute.'}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleOpenEstimate}
                className="w-full md:w-auto bg-[#0066FF] hover:bg-blue-600 text-white text-sm font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText size={16} />
                <span>{lang === 'KR' ? '맞춤 견적서 바로 작성하기' : 'Create Custom Estimate'}</span>
              </button>

              <button
                onClick={handleDownloadStandardRateCard}
                className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
                title="표준 제작 단가표 텍스트 문서 다운로드"
              >
                <Download size={16} />
                <span>{lang === 'KR' ? '표준 단가표 다운' : 'Rate Card'}</span>
              </button>
            </div>
          </div>

          {/* 3 Quick Cards for Service Estimates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                  유튜브 & 롱폼
                </span>
                <span className="text-xs font-bold text-slate-400">10분 기준</span>
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">영상 컷편집 & 모션 자막</h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                시선 집중 오프닝, 리듬감 있는 컷전환, 맞춤형 자막 디자인, BGM/SFX 사운드 마스터링
              </p>
              <div className="flex items-baseline justify-between pt-3 border-t border-slate-200/60">
                <span className="text-xs text-slate-500 font-medium">예상 제작비</span>
                <span className="text-base font-black text-slate-900">₩150,000 ~</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/80 hover:border-sky-400 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-bl-lg">
                BEST
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#0066FF] bg-white px-2.5 py-1 rounded-full border border-blue-200">
                  올인원 풀패키지
                </span>
                <span className="text-xs font-bold text-sky-600">15% 할인</span>
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">편집 + 한영 번역 + 4K</h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                영상 편집 풀버전 + 바이링구얼 자막 타임싱크 + 클릭률 썸네일 1종 + 4K UHD 최종 마스터
              </p>
              <div className="flex items-baseline justify-between pt-3 border-t border-sky-200/60">
                <span className="text-xs text-slate-500 font-medium">패키지 특가</span>
                <span className="text-base font-black text-[#0066FF]">₩280,000 ~</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  글로벌 번역
                </span>
                <span className="text-xs font-bold text-slate-400">5분 기준</span>
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">영한/한영 3D 문맥 번역</h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                원어민 말투와 관용구를 보존한 고감도 번역, 타임코드 일치 SRT 자막 파일 제공
              </p>
              <div className="flex items-baseline justify-between pt-3 border-t border-slate-200/60">
                <span className="text-xs text-slate-500 font-medium">예상 제작비</span>
                <span className="text-base font-black text-slate-900">₩90,000 ~</span>
              </div>
            </div>
          </div>

          {/* Quick Notice Footer */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>
                모든 견적서에는 <strong>기본 수정 2회 무료 제공</strong>, <strong>세금계산서 발행(VAT 선택)</strong> 및 <strong>비밀유지 협약</strong> 조항이 공식 명시됩니다.
              </span>
            </div>
            <button
              onClick={handleOpenEstimate}
              className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>견적서 서식 열기</span>
              <ChevronRight size={14} />
            </button>
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

      {/* Real-time Official Estimate & Quotation Modal */}
      <EstimateModal
        isOpen={isEstimateModalOpen}
        lang={lang}
        onClose={() => setIsEstimateModalOpen(false)}
        onOpenInquiryWithEstimate={(summary) => {
          onOpenModal(summary);
        }}
      />
    </section>
  );
};

