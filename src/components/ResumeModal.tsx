import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  X,
  Instagram,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { useSiteData } from '../context/SiteDataContext';
import { playHoverSound } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onOpenContactModal?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  lang,
  onClose,
  onOpenContactModal,
}) => {
  const { siteProfile } = useSiteData();
  const [copied, setCopied] = useState<string | null>(null);
  const resume = siteProfile.resumeData;

  if (!isOpen) return null;

  const handlePrint = () => {
    playHoverSound('pop');
    window.print();
  };

  const handleCopyText = (text: string, label: string) => {
    playHoverSound('tap');
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadHTML = () => {
    playHoverSound('chime');
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>이력서_KIM_PAY_김페이</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif; background: #f8fafc; margin: 0; padding: 40px; color: #1e293b; line-height: 1.6; }
  .cv { max-width: 800px; margin: 0 auto; background: #fff; padding: 48px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 24px; }
  .name { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; }
  .title { font-size: 16px; font-weight: 600; color: #0284c7; margin-bottom: 8px; }
  .contact-info { font-size: 13px; color: #64748b; line-height: 1.6; }
  .section { margin-bottom: 26px; }
  .section-title { font-size: 16px; font-weight: 800; color: #0f172a; border-left: 4px solid #0284c7; padding-left: 10px; margin-bottom: 12px; }
  .summary { background: #f1f5f9; padding: 14px 18px; border-radius: 6px; font-size: 14px; color: #334155; }
  .exp-item { margin-bottom: 18px; }
  .exp-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; margin-bottom: 4px; }
  .exp-company { color: #0284c7; font-weight: 600; font-size: 13px; }
  .exp-desc { font-size: 13px; color: #475569; margin: 4px 0 8px 0; }
  ul { margin: 4px 0; padding-left: 20px; font-size: 13px; color: #334155; }
  li { margin-bottom: 4px; }
  .skill-group { margin-bottom: 10px; font-size: 13px; }
  .skill-badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; margin: 2px 4px 2px 0; font-weight: 600; font-size: 12px; }
  @media print { body { background: #fff; padding: 0; } .cv { border: none; box-shadow: none; padding: 0; } }
</style>
</head>
<body>
<div class="cv">
  <div class="header">
    <div>
      <h1 class="name">${siteProfile.authorName}</h1>
      <div class="title">${resume.title}</div>
      <div class="contact-info">
        <div>Email: ${siteProfile.email} | Instagram: ${siteProfile.instagramId}</div>
        <div>Phone: ${siteProfile.phone || '010-8254-0313'} | Portfolio: KIM PAY Interactive Studio</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">자기소개 & 역량 요약 (Professional Summary)</div>
    <div class="summary">${resume.summary}</div>
  </div>

  <div class="section">
    <div class="section-title">전문 기술 & 사용 툴 (Skills & Tool Stack)</div>
    ${resume.skills
      .map(
        (s) => `<div class="skill-group">
        <strong>${s.category}:</strong><br>
        ${s.items.map((i) => `<span class="skill-badge">${i}</span>`).join(' ')}
      </div>`
      )
      .join('')}
  </div>

  <div class="section">
    <div class="section-title">주요 경력 및 프로젝트 (Experience & Projects)</div>
    ${resume.experiences
      .map(
        (exp) => `<div class="exp-item">
        <div class="exp-header">
          <span>${exp.role}</span>
          <span style="color:#64748b; font-weight:normal;">${exp.period}</span>
        </div>
        <div class="exp-company">${exp.clientOrCompany}</div>
        <div class="exp-desc">${exp.description}</div>
        <ul>
          ${exp.achievements.map((ach) => `<li>${ach}</li>`).join('')}
        </ul>
      </div>`
      )
      .join('')}
  </div>

  <div class="section">
    <div class="section-title">어학 & 공인 자격 (Language & Certifications)</div>
    <ul>
      ${resume.certifications.map((c) => `<li><strong>${c.title}</strong> - ${c.scoreOrIssuer} (${c.date})</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <div class="section-title">학력 (Education)</div>
    <ul>
      ${resume.education.map((e) => `<li><strong>${e.name}</strong> - ${e.major} (${e.period})</li>`).join('')}
    </ul>
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `이력서_KIM_PAY_${siteProfile.authorName}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyFullResume = () => {
    const text = `
[이력서 / CV - ${siteProfile.authorName}]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 직무: ${resume.title}
■ 연락처
- Email: ${siteProfile.email}
- Instagram: ${siteProfile.instagramId}
- Phone: ${siteProfile.phone || '010-8254-0313'}
- KakaoTalk: ${siteProfile.kakaoLink}

■ 핵심 요약
${resume.summary}

■ 전문 기술 & 툴
${resume.skills.map((s) => `• ${s.category}: ${s.items.join(', ')}`).join('\n')}

■ 주요 경력 및 프로젝트
${resume.experiences
  .map(
    (exp) => `
[${exp.role} | ${exp.clientOrCompany}] (${exp.period})
- 설명: ${exp.description}
- 주요 실적:
${exp.achievements.map((a) => `  * ${a}`).join('\n')}
`
  )
  .join('\n')}

■ 어학 및 자격증
${resume.certifications.map((c) => `• ${c.title}: ${c.scoreOrIssuer} (${c.date})`).join('\n')}

■ 학력
${resume.education.map((e) => `• ${e.name} - ${e.major} (${e.period})`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

    handleCopyText(text, 'resume');
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 bg-white rounded-3xl sm:rounded-[36px] overflow-hidden max-w-4xl w-full shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-slate-200/80 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none"
      >
        {/* Top Header Toolbar */}
        <div className="bg-slate-900 text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-slate-800 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-[#0066FF] flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <FileText size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  공식 이력서 & 포트폴리오 프로필 (CV)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  3년+ 실무 경력
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A4 정규 서식으로 바로 PDF 인쇄하거나 다운로드하실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <button
              onClick={handlePrint}
              className="bg-sky-500 hover:bg-sky-400 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="브라우저 인쇄 창에서 'PDF로 저장' 가능합니다"
            >
              <Printer size={14} />
              <span>PDF 다운로드 / 인쇄</span>
            </button>

            <button
              onClick={handleDownloadHTML}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded-xl hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
              title="단독 HTML 문서 파일로 다운로드합니다"
            >
              <Download size={14} />
              <span>HTML 저장</span>
            </button>

            <button
              onClick={handleCopyFullResume}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded-xl hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
              title="이력서 전문을 텍스트로 복사합니다"
            >
              {copied === 'resume' ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">복사완료</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>텍스트 복사</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible">
          <div
            id="official-resume-sheet"
            className="w-full max-w-[760px] bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200 text-slate-900 font-sans print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:rounded-none"
          >
            {/* Header Profile Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b-2 border-sky-600 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    PORTFOLIO RESUME
                  </span>
                  <span className="text-xs text-slate-400">최종 업데이트: 2026.09</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-1">
                  {siteProfile.authorName}
                </h1>
                <p className="text-sm font-bold text-sky-700 mb-3">{resume.title}</p>

                {/* Contact Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href={`mailto:${siteProfile.email}`}
                    className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Mail size={12} className="text-sky-600" />
                    <span>{siteProfile.email}</span>
                  </a>

                  {siteProfile.instagramId && (
                    <a
                      href={siteProfile.instagramUrl || `https://instagram.com/${siteProfile.instagramId.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors font-semibold"
                    >
                      <Instagram size={12} className="text-rose-500" />
                      <span>{siteProfile.instagramId}</span>
                    </a>
                  )}

                  {siteProfile.phone && (
                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      <Phone size={12} className="text-sky-600" />
                      <span>{siteProfile.phone}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar or Brand Icon */}
              <div className="shrink-0 relative group">
                <img
                  src={siteProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                  alt={siteProfile.authorName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-sky-200"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-sky-500 to-[#0066FF] text-white p-1 rounded-lg shadow-sm">
                  <CheckCircle2 size={14} />
                </div>
              </div>
            </div>

            {/* Section 1: Professional Summary */}
            <div className="mb-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-l-4 border-sky-500 pl-2">
                <span>자기소개 & 핵심 역량 (Professional Summary)</span>
              </h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {resume.summary}
              </div>
            </div>

            {/* Section 2: Skills & Tool Stack */}
            <div className="mb-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-l-4 border-sky-500 pl-2">
                <span>전문 기술 및 소프트웨어 (Technical Skills)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {resume.skills.map((skillGroup, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h3 className="text-xs font-black text-sky-800 mb-2 pb-1 border-b border-slate-200">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-200/80 shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Work Experience & Major Projects */}
            <div className="mb-6">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 border-l-4 border-sky-500 pl-2">
                <span>주요 경력 및 대표 프로젝트 (Experience & Projects)</span>
              </h2>
              <div className="space-y-4">
                {resume.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-2 border-sky-200 pl-3.5 py-0.5 relative group"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-500 ring-4 ring-white" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-slate-900">{exp.role}</span>
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded">
                          {exp.clientOrCompany}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400 font-mono">{exp.period}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-1.5">{exp.description}</p>

                    <ul className="space-y-1 text-xs text-slate-700">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5">
                          <span className="text-sky-500 font-bold">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Language & Certifications & Education (2-Col Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Language & Certifications */}
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-l-4 border-sky-500 pl-2">
                  <span>어학 & 공인 인증 (Certifications)</span>
                </h2>
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  {resume.certifications.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 last:border-none last:pb-0">
                      <div>
                        <div className="font-black text-slate-900">{c.title}</div>
                        <div className="text-[11px] text-sky-700 font-semibold">{c.scoreOrIssuer}</div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{c.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 border-l-4 border-sky-500 pl-2">
                  <span>학력 사항 (Education)</span>
                </h2>
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="pb-1.5 border-b border-slate-200/60 last:border-none last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-900">{edu.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{edu.period}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{edu.major}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Official Note */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-sky-600" />
              <span>위 기재 사항은 사실과 다름없음을 증명합니다. | KIM PAY VIDEO & TRANSLATION</span>
            </div>
          </div>

          {/* Floating Actions Below Sheet */}
          <div className="w-full max-w-[760px] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
            <div className="flex items-center gap-3">
              {siteProfile.instagramId && (
                <a
                  href={siteProfile.instagramUrl || `https://instagram.com/${siteProfile.instagramId.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors"
                >
                  <Instagram size={14} />
                  <span>인스타그램 방문 ({siteProfile.instagramId})</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Printer size={14} />
                <span>PDF 다운로드 / 인쇄</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
