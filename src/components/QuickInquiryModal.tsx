import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { X, MessageCircle, Send, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface QuickInquiryModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  preselectedService?: string;
  prefilledMessage?: string;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  lang,
  onClose,
  preselectedService,
  prefilledMessage,
}) => {
  const [service, setService] = useState(preselectedService || 'editing');
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [message, setMessage] = useState(prefilledMessage || '');
  const [submitted, setSubmitted] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  React.useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  if (!isOpen) return null;

  const kakaoId = 'kim_pay_video';

  const handleCopyKakaoId = () => {
    navigator.clipboard.writeText(kakaoId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close after 3 seconds
      // setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative z-10 bg-white rounded-[40px] overflow-hidden max-w-lg w-full shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col max-h-[92vh]"
      >
        {/* Blue Header */}
        <div className="bg-gradient-to-r from-[#0066FF] to-[#0284C7] p-6 pb-7 flex items-center justify-between relative text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center font-black">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === 'KR' ? '프로젝트 빠른 상담' : 'Quick Project Inquiry'}
              </h3>
              <p className="text-xs font-medium text-sky-100">
                {lang === 'KR' ? '카카오톡 오픈채팅 또는 상담 폼' : 'KakaoTalk Direct or Quick Form'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto text-2xl shadow-inner">
                ✓
              </div>
              <h4 className="text-2xl font-black text-[#0F172A]">
                {lang === 'KR' ? '문의가 접수되었습니다!' : 'Inquiry Sent Successfully!'}
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                {lang === 'KR'
                  ? '작성해주신 연락처로 30분 이내(영업시간 기준)에 상세 견적 및 일정을 안내해 드리겠습니다.'
                  : 'We have received your request. We will review your materials and respond within 30 minutes.'}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#0066FF] text-white font-black rounded-full text-sm hover:scale-105 transition shadow-md shadow-blue-500/20"
              >
                {lang === 'KR' ? '확인 완료' : 'Done'}
              </button>
            </div>
          ) : (
            <>
              {/* Direct Kakao ID Banner */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/70 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-800 font-bold">
                  <span>{lang === 'KR' ? '카카오톡 ID 직접 추가:' : 'Direct Kakao ID:'} </span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-sky-200 text-[#0066FF]">
                    {kakaoId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyKakaoId}
                  className="px-3 py-1.5 bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  {copiedId ? (
                    <>
                      <Check size={12} />
                      <span>{lang === 'KR' ? '복사됨' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>{lang === 'KR' ? 'ID 복사' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Select Pills */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-2">
                    {lang === 'KR' ? '희망 서비스 선택 *' : 'Service Type *'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'editing', label: lang === 'KR' ? '영상 편집' : 'Editing' },
                      { id: 'translation', label: lang === 'KR' ? '영어 번역' : 'Translation' },
                      { id: 'all-in-one', label: lang === 'KR' ? 'All-in-One' : 'All-in-One' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setService(opt.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          service === opt.id
                            ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name / Organization */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {lang === 'KR' ? '성함 또는 브랜드명 *' : 'Your Name or Brand *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={lang === 'KR' ? '예: 김대표 / 스튜디오 모노' : 'e.g., Alex Kim / Studio Mono'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF]"
                  />
                </div>

                {/* Contact (Email or Kakao ID) */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {lang === 'KR' ? '연락처 (이메일 또는 카카오톡 ID) *' : 'Contact (Email or Kakao ID) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={lang === 'KR' ? 'contact@example.com 또는 카카오톡 ID' : 'contact@example.com or ID'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF]"
                  />
                </div>

                {/* Video / Reference Link */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {lang === 'KR' ? '영상/레퍼런스 링크 (선택)' : 'Video or Reference Link (Optional)'}
                  </label>
                  <input
                    type="url"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://youtube.com/... or Google Drive"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF]"
                  />
                </div>

                {/* Message / Brief */}
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    {lang === 'KR' ? '프로젝트 설명 및 요청사항' : 'Project Details & Target Date'}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'KR'
                        ? '영상의 분량, 희망 마감일, 번역 필요 여부 등을 편하게 적어주세요.'
                        : 'Describe video length, deadline, and translation requirements.'
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-[#0066FF]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-700 active:scale-98 text-white font-black rounded-2xl text-sm shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send size={16} />
                  <span>{lang === 'KR' ? '견적 및 상담 신청하기' : 'Request Quote & Consultation'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
