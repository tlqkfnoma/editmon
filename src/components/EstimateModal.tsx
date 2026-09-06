import React, { useState, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  X,
  Sparkles,
  Calculator,
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  Send,
  HelpCircle,
  Percent,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { playHoverSound } from '../utils/soundEffects';

interface EstimateModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onOpenInquiryWithEstimate?: (estimateSummary: string) => void;
}

interface ServicePlan {
  id: string;
  nameKR: string;
  nameEN: string;
  basePrice: number;
  baseDurationMin: number;
  pricePerExtraMin: number;
  descKR: string;
  descEN: string;
  tag: string;
}

const SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'youtube_long',
    nameKR: '유튜브 & 일반 롱폼 영상 편집',
    nameEN: 'YouTube & Long-form Video Editing',
    basePrice: 150000,
    baseDurationMin: 10,
    pricePerExtraMin: 12000,
    descKR: '컷편집, 자막 디자인, BGM/SFX 사운드 디자인, 색보정 포함',
    descEN: 'Pacing cuts, graphics, sound mixing, color correction included',
    tag: '가장 인기',
  },
  {
    id: 'shorts_reels',
    nameKR: '숏폼 & 릴스/쇼츠 제작 (1분 이내)',
    nameEN: 'Shorts & Reels Production (<60s)',
    basePrice: 50000,
    baseDurationMin: 1,
    pricePerExtraMin: 0,
    descKR: '고유입 훅(Hook) 설계, 다이내믹 자막 및 트렌디 템포 연출',
    descEN: 'High-retention hooks, dynamic kinetic text & trending tempo',
    tag: '빠른 제작',
  },
  {
    id: 'translation_subtitles',
    nameKR: '영한/한영 자막 번역 & 타임싱크',
    nameEN: 'Bilingual Translation & Timecoded Subtitles',
    basePrice: 90000,
    baseDurationMin: 5,
    pricePerExtraMin: 15000,
    descKR: '문화적 뉘앙스와 말투를 살린 3D 문맥 맞춤 번역, SRT 파일 제공',
    descEN: 'Contextual nuance preservation, native tone, SRT master file',
    tag: '글로벌 특화',
  },
  {
    id: 'all_in_one',
    nameKR: '올인원 풀패키지 (편집 + 영한번역 + 4K 마스터링)',
    nameEN: 'All-in-One Full Package (Editing + Translation + 4K)',
    basePrice: 280000,
    baseDurationMin: 10,
    pricePerExtraMin: 22000,
    descKR: '영상 컷편집 + 바이링구얼 자막 번역 + 썸네일 1종 + 4K 마스터',
    descEN: 'Full edit, bilingual sync subtitles, 1 custom thumbnail & 4K master',
    tag: '15% 할인 혜택',
  },
  {
    id: 'corporate_interview',
    nameKR: '기업 홍보영상 & 글로벌 인터뷰 다큐',
    nameEN: 'Corporate Promo & Global Keynote Documentary',
    basePrice: 420000,
    baseDurationMin: 5,
    pricePerExtraMin: 25000,
    descKR: '하이엔드 모션그래픽, 인터뷰 발언 요약 자막, 톤앤매너 정밀 믹싱',
    descEN: 'Premium corporate graphics, speech condensing, pristine mix',
    tag: '하이엔드 퀄리티',
  },
];

interface AddonOption {
  id: string;
  nameKR: string;
  nameEN: string;
  price: number;
  descKR: string;
  isPercent?: boolean;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'fast_delivery',
    nameKR: '24시간 내 초고속 급행 납품',
    nameEN: 'Express 24-Hour Delivery',
    price: 30, // +30%
    descKR: '우선 작업 배정으로 24시간 이내 1차 시사본 납품',
    isPercent: true,
  },
  {
    id: 'thumbnail',
    nameKR: '클릭률 최적화 맞춤형 썸네일 (1종)',
    nameEN: 'High-CTR Custom YouTube Thumbnail',
    price: 35000,
    descKR: '유튜브 시선 집중 타이포 & 보정 고화질 썸네일',
  },
  {
    id: 'motion_intro',
    nameKR: '키네틱 3D 모션 타이틀 & 인트로',
    nameEN: 'Kinetic 3D Motion Title & Intro',
    price: 60000,
    descKR: '브랜드 로고 애니메이션 및 시선을 끄는 맞춤 오프닝 모션',
  },
  {
    id: 'native_proofread',
    nameKR: '영어 원어민 원문 검수 & 어조 교정',
    nameEN: 'Native English Proofreading & Tone Polish',
    price: 40000,
    descKR: '원어민 에디터 2차 교정 검수 완료 인증',
  },
  {
    id: 'project_source',
    nameKR: '프리미어/에펙 원본 프로젝트 파일 납품',
    nameEN: 'Full Source Project Files (.prproj / .aep)',
    price: 80000,
    descKR: '자막 템플릿 및 레이어 구성이 포함된 원본 프로젝트 제공',
  },
];

export const EstimateModal: React.FC<EstimateModalProps> = ({
  isOpen,
  lang,
  onClose,
  onOpenInquiryWithEstimate,
}) => {
  const { siteProfile } = useSiteData();
  const printRef = useRef<HTMLDivElement>(null);

  // Configuration States
  const [selectedPlanId, setSelectedPlanId] = useState<string>('all_in_one');
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [episodesCount, setEpisodesCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['thumbnail']);
  
  // Client Info States
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientPerson, setClientPerson] = useState<string>('');
  const [clientContact, setClientContact] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('2026 유튜브 영상 콘텐츠 제작 및 자막');
  const [clientMemo, setClientMemo] = useState<string>('상담 시 레퍼런스 영상 링크 전달 예정');

  // UI States
  const [includeVat, setIncludeVat] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'configure' | 'sheet'>('sheet');

  if (!isOpen) return null;

  // Selected Plan
  const plan = SERVICE_PLANS.find((p) => p.id === selectedPlanId) || SERVICE_PLANS[0];

  // Base Calculation
  const extraMinutes = Math.max(0, videoDuration - plan.baseDurationMin);
  const singleVideoBasePrice = plan.basePrice + extraMinutes * plan.pricePerExtraMin;

  // Quantity Discount: 3+ episodes 5% off, 5+ episodes 10% off, 10+ episodes 15% off
  let volumeDiscountRate = 0;
  if (episodesCount >= 10) volumeDiscountRate = 0.15;
  else if (episodesCount >= 5) volumeDiscountRate = 0.10;
  else if (episodesCount >= 3) volumeDiscountRate = 0.05;

  const totalBaseBeforeDiscount = singleVideoBasePrice * episodesCount;
  const volumeDiscountAmount = Math.round(totalBaseBeforeDiscount * volumeDiscountRate);
  const totalBaseAfterDiscount = totalBaseBeforeDiscount - volumeDiscountAmount;

  // Addons Calculation
  let totalAddonsPrice = 0;
  let isExpress = false;
  selectedAddons.forEach((addonId) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
    if (addon) {
      if (addon.isPercent) {
        isExpress = true;
      } else {
        totalAddonsPrice += addon.price * episodesCount;
      }
    }
  });

  const expressSurcharge = isExpress ? Math.round((totalBaseAfterDiscount + totalAddonsPrice) * 0.3) : 0;
  const supplyAmount = totalBaseAfterDiscount + totalAddonsPrice + expressSurcharge;
  const vatAmount = includeVat ? Math.round(supplyAmount * 0.1) : 0;
  const grandTotal = supplyAmount + vatAmount;

  // Format Date & Estimate Number
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;
  const validUntilStr = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const estimateNo = `KP-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-087`;

  // Number to Korean currency words
  const numberToKoreanWord = (num: number) => {
    const units = ['', '만', '억', '조'];
    const smallUnits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const tenUnits = ['', '십', '백', '천'];
    
    if (num === 0) return '영';
    let result = '';
    let unitIdx = 0;
    
    let temp = num;
    while (temp > 0) {
      const chunk = temp % 10000;
      if (chunk > 0) {
        let chunkStr = '';
        let c = chunk;
        for (let i = 0; i < 4; i++) {
          const digit = c % 10;
          if (digit > 0) {
            chunkStr = smallUnits[digit] + tenUnits[i] + chunkStr;
          }
          c = Math.floor(c / 10);
        }
        result = chunkStr + units[unitIdx] + ' ' + result;
      }
      temp = Math.floor(temp / 10000);
      unitIdx++;
    }
    return result.trim();
  };

  const koreanPriceWord = `일금 ${numberToKoreanWord(grandTotal)}원정`;

  const toggleAddon = (id: string) => {
    playHoverSound('tap');
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Print Action
  const handlePrint = () => {
    playHoverSound('pop');
    window.print();
  };

  // Text Copy Action
  const handleCopyQuoteText = () => {
    playHoverSound('chime');
    const text = `
[KIM PAY 영상 스튜디오 공식 견적서]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 견적 번호: ${estimateNo}
■ 견적 일자: ${dateStr}
■ 유효 기간: 발행일로부터 14일
■ 의뢰인: ${clientCompany || clientPerson || '고객사'} 귀하
■ 프로젝트: ${projectName}

■ 선택 서비스: ${plan.nameKR}
- 영상 분량: 편당 약 ${videoDuration}분
- 제작 편수: 총 ${episodesCount}편
- 추가 옵션: ${selectedAddons.length > 0 ? selectedAddons.map((id) => ADDON_OPTIONS.find((a) => a.id === id)?.nameKR).join(', ') : '없음'}

■ 총 견적 금액: ₩${grandTotal.toLocaleString()} (${includeVat ? 'VAT 포함' : 'VAT 별도'})
- 공급가액: ₩${supplyAmount.toLocaleString()}
${includeVat ? `- 부가세(10%): ₩${vatAmount.toLocaleString()}\n` : ''}
■ 공급자 정보
- 상호: KIM PAY 영상 스튜디오
- 대표자: ${siteProfile.authorName}
- 이메일: ${siteProfile.email}
- 특약: 기본 수정 2회 무료 제공 / 4K 마스터링 납품

━━━━━━━━━━━━━━━━━━━━━━━━━━━
상세 문의: ${siteProfile.kakaoLink || '카카오톡 오픈채팅'}
`.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Download HTML File Action
  const handleDownloadHTML = () => {
    playHoverSound('chime');
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>견적서_${estimateNo}_KIM_PAY</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", sans-serif; background: #f8fafc; margin: 0; padding: 40px; color: #1e293b; }
  .sheet { max-width: 800px; margin: 0 auto; background: #fff; padding: 48px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .title { text-align: center; font-size: 28px; font-weight: 800; letter-spacing: 4px; border-bottom: 3px double #0284c7; padding-bottom: 12px; margin-bottom: 24px; color: #0f172a; }
  .header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; }
  .box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; background: #f8fafc; }
  .box h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0284c7; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
  .total-banner { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 6px; padding: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
  .total-banner .korean { font-size: 14px; font-weight: 600; color: #0369a1; }
  .total-banner .amount { font-size: 24px; font-weight: 900; color: #0284c7; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
  th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 10px; font-weight: 700; text-align: center; }
  td { border: 1px solid #cbd5e1; padding: 10px; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  .footer-notes { font-size: 12px; color: #64748b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 16px; }
  @media print { body { background: #fff; padding: 0; } .sheet { border: none; box-shadow: none; padding: 0; } }
</style>
</head>
<body>
<div class="sheet">
  <div class="title">견&nbsp;&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;&nbsp;서</div>
  <div class="header-grid">
    <div class="box">
      <h4>공급받는자 (귀하)</h4>
      <div><strong>상호/성명:</strong> ${clientCompany || clientPerson || '고객사 귀하'}</div>
      <div><strong>프로젝트:</strong> ${projectName}</div>
      <div><strong>견적일자:</strong> ${dateStr}</div>
      <div><strong>유효기간:</strong> 발행일로부터 14일</div>
    </div>
    <div class="box">
      <h4>공급자 (KIM PAY Studio)</h4>
      <div><strong>상호:</strong> KIM PAY 영상 스튜디오</div>
      <div><strong>대표자:</strong> ${siteProfile.authorName}</div>
      <div><strong>이메일:</strong> ${siteProfile.email}</div>
      <div><strong>견적번호:</strong> ${estimateNo}</div>
    </div>
  </div>
  <div class="total-banner">
    <div class="korean">${koreanPriceWord}</div>
    <div class="amount">합계: ₩${grandTotal.toLocaleString()} (${includeVat ? 'VAT 포함' : 'VAT 별도'})</div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 35%;">품목 및 서비스</th>
        <th>사양 / 분량</th>
        <th>수량</th>
        <th class="text-right">단가</th>
        <th class="text-right">공급가액</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${plan.nameKR}</strong><br><small style="color:#64748b">${plan.descKR}</small></td>
        <td class="text-center">편당 약 ${videoDuration}분</td>
        <td class="text-center">${episodesCount}편</td>
        <td class="text-right">₩${singleVideoBasePrice.toLocaleString()}</td>
        <td class="text-right">₩${totalBaseBeforeDiscount.toLocaleString()}</td>
      </tr>
      ${
        volumeDiscountAmount > 0
          ? `<tr>
        <td colspan="4" style="color: #0284c7;"><strong>다편 제작 수량 할인 (${Math.round(volumeDiscountRate * 100)}%)</strong></td>
        <td class="text-right" style="color: #0284c7;">-₩${volumeDiscountAmount.toLocaleString()}</td>
      </tr>`
          : ''
      }
      ${selectedAddons
        .map((id) => {
          const addon = ADDON_OPTIONS.find((a) => a.id === id);
          if (!addon) return '';
          if (addon.isPercent) {
            return `<tr>
              <td><strong>${addon.nameKR}</strong></td>
              <td class="text-center">긴급 패스트트랙</td>
              <td class="text-center">1식</td>
              <td class="text-right">+30%</td>
              <td class="text-right">₩${expressSurcharge.toLocaleString()}</td>
            </tr>`;
          }
          return `<tr>
            <td><strong>${addon.nameKR}</strong></td>
            <td class="text-center">옵션 적용</td>
            <td class="text-center">${episodesCount}건</td>
            <td class="text-right">₩${addon.price.toLocaleString()}</td>
            <td class="text-right">₩${(addon.price * episodesCount).toLocaleString()}</td>
          </tr>`;
        })
        .join('')}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-right"><strong>공급가액 소계</strong></td>
        <td class="text-right"><strong>₩${supplyAmount.toLocaleString()}</strong></td>
      </tr>
      ${
        includeVat
          ? `<tr>
        <td colspan="4" class="text-right">부가세 (VAT 10%)</td>
        <td class="text-right">₩${vatAmount.toLocaleString()}</td>
      </tr>`
          : ''
      }
      <tr style="background:#f8fafc;">
        <td colspan="4" class="text-right" style="font-size:15px; font-weight:800; color:#0284c7;">최종 합계 금액</td>
        <td class="text-right" style="font-size:16px; font-weight:900; color:#0284c7;">₩${grandTotal.toLocaleString()}</td>
      </tr>
    </tfoot>
  </table>
  <div class="footer-notes">
    <strong>[특약사항 및 제작 정책]</strong><br>
    1. 작업 착수 전 기획안 및 레퍼런스 확정 후 본 작업이 개시됩니다.<br>
    2. 1차 시사본 납품 후 기본 수정 피드백 2회 무료 제공됩니다.<br>
    3. 본 견적서는 발행일로부터 14일간 유효합니다.<br>
    4. 최종 납품 포맷: 4K UHD Master MP4/MOV, 고화질 썸네일 및 타임싱크 SRT 자막 파일.
  </div>
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `견적서_${estimateNo}_${clientCompany || 'KIM_PAY'}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleInquiryConnect = () => {
    if (onOpenInquiryWithEstimate) {
      onOpenInquiryWithEstimate(
        `[실시간 견적 연동]\n- 서비스: ${plan.nameKR}\n- 분량: ${videoDuration}분 x ${episodesCount}편\n- 예상 금액: ₩${grandTotal.toLocaleString()}\n- 프로젝트명: ${projectName}`
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 bg-white rounded-3xl sm:rounded-[36px] overflow-hidden max-w-5xl w-full shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-slate-200/80 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none"
      >
        {/* Top Header Toolbar */}
        <div className="bg-slate-900 text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-[#0066FF] flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Calculator size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  실시간 견적서 산출 및 공식 다운로드
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {estimateNo}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                원하는 사양을 선택하고 즉시 A4 규격 공식 견적서로 인쇄 또는 PDF 다운로드하세요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switch Tabs for Mobile/Tablet */}
            <div className="flex lg:hidden bg-slate-800 p-1 rounded-xl border border-slate-700 mr-2 text-xs">
              <button
                onClick={() => setActiveTab('configure')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === 'configure' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                사양 설정
              </button>
              <button
                onClick={() => setActiveTab('sheet')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === 'sheet' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                견적서 보기
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Content (Split Screen on Large Screens) */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 print:divide-none print:overflow-visible">
          
          {/* Left Column: Interactive Configuration Panel */}
          <div
            className={`w-full lg:w-[420px] shrink-0 p-5 sm:p-6 bg-slate-50 overflow-y-auto print:hidden space-y-6 ${
              activeTab === 'sheet' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* 1. Service Plan Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>1. 서비스 품목 선택</span>
                <span className="text-[11px] text-sky-600 font-bold lowercase">Click to select</span>
              </label>
              <div className="space-y-2">
                {SERVICE_PLANS.map((p) => {
                  const isSelected = p.id === selectedPlanId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        playHoverSound('tap');
                        setSelectedPlanId(p.id);
                        if (p.id === 'shorts_reels') setVideoDuration(1);
                        else if (videoDuration < p.baseDurationMin) setVideoDuration(p.baseDurationMin);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-sky-500 shadow-md shadow-sky-500/10 ring-2 ring-sky-500/20'
                          : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{p.nameKR}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-1.5 leading-snug">{p.descKR}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">기본 {p.baseDurationMin}분 기준</span>
                        <span className="font-black text-sky-600">₩{p.basePrice.toLocaleString()}~</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Duration & Volume Sliders */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-800">영상 분량 (편당 예상 길이)</label>
                  <span className="text-sm font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                    약 {videoDuration}분
                  </span>
                </div>
                <input
                  type="range"
                  min={plan.id === 'shorts_reels' ? 1 : 3}
                  max={plan.id === 'shorts_reels' ? 1 : 60}
                  step={plan.id === 'shorts_reels' ? 1 : 1}
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{plan.id === 'shorts_reels' ? '1분 이내 (쇼츠/릴스)' : '3분 (숏폼/인터뷰)'}</span>
                  <span>{plan.id === 'shorts_reels' ? '1분' : '60분 (풀영상)'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-800">제작 편수 (수량)</label>
                  <div className="flex items-center gap-1.5">
                    {volumeDiscountRate > 0 && (
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                        {Math.round(volumeDiscountRate * 100)}% 할인 적용
                      </span>
                    )}
                    <span className="text-sm font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      총 {episodesCount}편
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        playHoverSound('tap');
                        setEpisodesCount(num);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        episodesCount === num
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {num}편
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Add-on Options */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                2. 추가 제작 옵션
              </label>
              <div className="space-y-1.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-sky-50/70 border-sky-300 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{addon.nameKR}</span>
                          <span className="font-black text-sky-600">
                            {addon.isPercent ? '+30%' : `+₩${addon.price.toLocaleString()}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{addon.descKR}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. Client & Project Customization Form */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                3. 견적서 공급받는 자 (의뢰인 정보 입력)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold mb-0.5 block">회사명 / 채널명</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="예: (주)글로벌비전"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold mb-0.5 block">담당자명 / 직책</label>
                  <input
                    type="text"
                    value={clientPerson}
                    onChange={(e) => setClientPerson(e.target.value)}
                    placeholder="예: 홍길동 팀장"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-semibold mb-0.5 block">프로젝트명</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="예: 2026 해외 론칭 인터뷰 영상 편집 및 영문 자막"
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-slate-600">세금계산서 발행 (VAT 10% 포함)</span>
                <button
                  type="button"
                  onClick={() => setIncludeVat(!includeVat)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    includeVat ? 'bg-sky-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                      includeVat ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Mobile View Quote Button */}
            <div className="block lg:hidden pt-2">
              <button
                onClick={() => setActiveTab('sheet')}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>견적서 서식 확인 및 다운로드</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Printable Quotation Sheet */}
          <div
            className={`flex-1 p-4 sm:p-8 bg-slate-100 overflow-y-auto flex flex-col items-center justify-start print:p-0 print:bg-white print:overflow-visible ${
              activeTab === 'configure' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Action Bar Above Sheet */}
            <div className="w-full max-w-[720px] flex flex-wrap items-center justify-between gap-3 mb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-slate-700">공식 견적서 실시간 미리보기</span>
              </div>

              {/* Download Buttons Group */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handlePrint}
                  className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="브라우저 인쇄 창을 띄워 PDF로 저장할 수 있습니다"
                >
                  <Printer size={14} />
                  <span>PDF / 인쇄 다운로드</span>
                </button>

                <button
                  onClick={handleDownloadHTML}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="단독 HTML 문서 파일로 다운로드합니다"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">문서 파일 저장</span>
                </button>

                <button
                  onClick={handleCopyQuoteText}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="메신저나 이메일에 붙여넣을 텍스트로 복사합니다"
                >
                  {copiedText ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span className="text-emerald-600 font-black">복사완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>텍스트 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* THE FORMAL QUOTATION SHEET (A4 Printable Component) */}
            <div
              id="official-quotation-sheet"
              ref={printRef}
              className="w-full max-w-[720px] bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200 text-slate-900 font-sans print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:rounded-none"
            >
              {/* Top Title Banner */}
              <div className="text-center pb-4 mb-6 border-b-2 border-slate-900 relative">
                <h1 className="text-2xl sm:text-3xl font-black tracking-[0.35em] text-slate-950 uppercase">
                  견&nbsp;&nbsp;&nbsp;&nbsp;적&nbsp;&nbsp;&nbsp;&nbsp;서
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-widest mt-1">
                  OFFICIAL ESTIMATE & QUOTATION SHEET
                </p>
                <div className="absolute right-0 bottom-2 text-right">
                  <span className="text-[10px] font-mono text-slate-400">NO. {estimateNo}</span>
                </div>
              </div>

              {/* Two-Column Parties Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs leading-relaxed">
                {/* Client Side (공급받는 자) */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                      <span className="font-black text-sky-700 text-[11px] tracking-wide">공급받는 자 (귀하)</span>
                      <span className="text-[10px] text-slate-400">발행일: {dateStr}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="w-16 text-slate-500 font-medium shrink-0">상호 / 성명:</span>
                        <span className="font-bold text-slate-900">
                          {clientCompany ? `${clientCompany} ` : ''}
                          {clientPerson ? `${clientPerson} ` : ''}
                          {!clientCompany && !clientPerson ? '고객사 귀하' : '귀하'}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-16 text-slate-500 font-medium shrink-0">프로젝트:</span>
                        <span className="font-semibold text-slate-800">{projectName}</span>
                      </div>
                      <div className="flex">
                        <span className="w-16 text-slate-500 font-medium shrink-0">유효기간:</span>
                        <span className="text-slate-700">{validUntilStr} (발행일로부터 14일)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 bg-white p-1.5 rounded border border-slate-200">
                    아래와 같이 견적서를 제출하오니 검토하여 주시기 바랍니다.
                  </div>
                </div>

                {/* Provider Side (공급자: KIM PAY Studio) with Official Stamp */}
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                    <span className="font-black text-slate-800 text-[11px] tracking-wide">공급자 정보</span>
                    <span className="text-[10px] font-bold text-sky-600">스튜디오 마스터</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex">
                      <span className="w-16 text-slate-500 font-medium shrink-0">상 호:</span>
                      <span className="font-bold text-slate-900">KIM PAY 영상 스튜디오</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-slate-500 font-medium shrink-0">대 표 자:</span>
                      <span className="font-bold text-slate-900">{siteProfile.authorName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-slate-500 font-medium shrink-0">전문분야:</span>
                      <span className="text-slate-700">영상 컷편집 / 바이링구얼 번역 / 3D 자막</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-slate-500 font-medium shrink-0">이 메 일:</span>
                      <span className="font-semibold text-sky-600">{siteProfile.email}</span>
                    </div>
                  </div>

                  {/* Official Electronic Seal / Stamp Graphic */}
                  <div className="absolute right-3 bottom-2.5 w-14 h-14 rounded-full border-2 border-rose-600/70 flex flex-col items-center justify-center text-rose-600/80 font-black text-[9px] transform -rotate-12 pointer-events-none select-none">
                    <span className="text-[7px] tracking-widest">KIM PAY</span>
                    <span>김페이</span>
                    <span className="text-[8px] font-serif tracking-tight">직인</span>
                  </div>
                </div>
              </div>

              {/* Total Quotation Amount Banner */}
              <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-100 border-2 border-sky-300 rounded-xl p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
                <div>
                  <span className="text-xs font-bold text-sky-800 block">총 견적 합계 금액 (Total Amount)</span>
                  <span className="text-xs font-semibold text-slate-600">{koreanPriceWord}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-black text-[#0066FF] tracking-tight">
                    ₩{grandTotal.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    ({includeVat ? '부가가치세 10% 포함' : '부가가치세 별도'})
                  </span>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-y border-slate-300 font-bold">
                      <th className="py-2 px-2.5 text-center w-10">NO</th>
                      <th className="py-2 px-3">품목 및 내역</th>
                      <th className="py-2 px-2.5 text-center">규격 / 분량</th>
                      <th className="py-2 px-2.5 text-center">수량</th>
                      <th className="py-2 px-3 text-right">단가</th>
                      <th className="py-2 px-3 text-right">공급가액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {/* Main Service Row */}
                    <tr>
                      <td className="py-2.5 px-2.5 text-center text-slate-400 font-mono">01</td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-900 block">{plan.nameKR}</span>
                        <span className="text-[11px] text-slate-500">{plan.descKR}</span>
                      </td>
                      <td className="py-2.5 px-2.5 text-center font-medium text-slate-700">
                        약 {videoDuration}분/편
                      </td>
                      <td className="py-2.5 px-2.5 text-center font-bold text-slate-900">
                        {episodesCount}편
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600 font-mono">
                        ₩{singleVideoBasePrice.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-mono">
                        ₩{totalBaseBeforeDiscount.toLocaleString()}
                      </td>
                    </tr>

                    {/* Volume Discount Row */}
                    {volumeDiscountAmount > 0 && (
                      <tr className="bg-emerald-50/60">
                        <td className="py-2 px-2.5 text-center text-emerald-600 font-mono">할인</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold" colSpan={3}>
                          다편 제작 프로모션 할인 ({Math.round(volumeDiscountRate * 100)}% Discount)
                        </td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-mono">-</td>
                        <td className="py-2 px-3 text-right text-emerald-700 font-black font-mono">
                          -₩{volumeDiscountAmount.toLocaleString()}
                        </td>
                      </tr>
                    )}

                    {/* Add-on Rows */}
                    {selectedAddons.map((addonId, idx) => {
                      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
                      if (!addon) return null;
                      const rowNo = String(idx + 2).padStart(2, '0');

                      if (addon.isPercent) {
                        return (
                          <tr key={addon.id} className="bg-amber-50/40">
                            <td className="py-2.5 px-2.5 text-center text-amber-600 font-mono">{rowNo}</td>
                            <td className="py-2.5 px-3">
                              <span className="font-bold text-amber-900 block">{addon.nameKR}</span>
                              <span className="text-[11px] text-amber-700/80">{addon.descKR}</span>
                            </td>
                            <td className="py-2.5 px-2.5 text-center text-amber-800">24H 긴급납품</td>
                            <td className="py-2.5 px-2.5 text-center text-amber-800">1식</td>
                            <td className="py-2.5 px-3 text-right text-amber-800 font-mono">+30%</td>
                            <td className="py-2.5 px-3 text-right font-bold text-amber-900 font-mono">
                              +₩{expressSurcharge.toLocaleString()}
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={addon.id}>
                          <td className="py-2.5 px-2.5 text-center text-slate-400 font-mono">{rowNo}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-800 block">{addon.nameKR}</span>
                            <span className="text-[11px] text-slate-500">{addon.descKR}</span>
                          </td>
                          <td className="py-2.5 px-2.5 text-center text-slate-600">표준 규격</td>
                          <td className="py-2.5 px-2.5 text-center font-bold text-slate-900">{episodesCount}건</td>
                          <td className="py-2.5 px-3 text-right text-slate-600 font-mono">
                            ₩{addon.price.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-mono">
                            ₩{(addon.price * episodesCount).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="border-t-2 border-slate-300">
                    <tr className="bg-slate-50 font-semibold">
                      <td colSpan={4} className="py-2 px-3 text-right text-slate-600">
                        공급가액 소계 (Subtotal)
                      </td>
                      <td colSpan={2} className="py-2 px-3 text-right font-bold text-slate-900 font-mono">
                        ₩{supplyAmount.toLocaleString()}
                      </td>
                    </tr>
                    {includeVat && (
                      <tr className="bg-slate-50 text-slate-600">
                        <td colSpan={4} className="py-2 px-3 text-right">
                          부가가치세 (VAT 10%)
                        </td>
                        <td colSpan={2} className="py-2 px-3 text-right font-bold font-mono">
                          ₩{vatAmount.toLocaleString()}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-sky-50 text-sky-950 font-black text-sm border-t border-sky-200">
                      <td colSpan={4} className="py-2.5 px-3 text-right text-sky-900">
                        최종 청구 합계액 (Total)
                      </td>
                      <td colSpan={2} className="py-2.5 px-3 text-right text-[#0066FF] font-mono text-base">
                        ₩{grandTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Special Policy & Terms Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-[11px] leading-relaxed text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-sky-600" />
                  <span>[특약사항 및 작업 정책 안내]</span>
                </div>
                <p>1. <strong>수정 피드백:</strong> 1차 프리뷰 링크 제공 후 기본 2회 무료 꼼꼼한 수정 지원 (사전 기획 범위 내).</p>
                <p>2. <strong>납품 규격:</strong> 4K UHD Master (MP4/H.264), 유튜브 최적화 세팅, 타임싱크 SRT 자막 포함.</p>
                <p>3. <strong>비밀 유지(NDA):</strong> 미공개 프로젝트 및 클라이언트의 모든 영상/스크립트 데이터는 엄격한 보안을 유지합니다.</p>
                <p>4. <strong>결제 방식:</strong> 계약 체결 시 착수금 50%, 최종 시사본 컨펌 및 마스터 납품 시 잔금 50% 결제 가능합니다.</p>
              </div>

              {/* Sign Off */}
              <div className="text-center mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium">
                귀사의 무궁한 발전을 기원하며 최고의 퀄리티로 보답하겠습니다. 감사합니다.
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="w-full max-w-[720px] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">이 견적으로 바로 상담받으시겠습니까?</span>
                <p className="text-[11px] text-slate-400">선택하신 옵션과 계산 금액이 상담창으로 자동 연동됩니다.</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleInquiryConnect}
                  className="w-full sm:w-auto bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={13} />
                  <span>이 견적으로 빠른 상담 신청</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
