import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Film,
  User,
  Languages,
  Layers,
  FileCode,
  Check,
  ExternalLink,
  Sparkles,
  Search,
  Box,
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { Category, PortfolioItem, TranslationSample, ServiceItem } from '../../types';
import { playHoverSound } from '../../utils/soundEffects';

export const AdminEditorModal: React.FC = () => {
  const {
    isEditorModalOpen,
    setIsEditorModalOpen,
    portfolioItems,
    servicesData,
    translationSamples,
    siteProfile,
    updatePortfolioItem,
    addPortfolioItem,
    deletePortfolioItem,
    updateSiteProfile,
    updateTranslationSample,
    updateServicesData,
    resetToDefaultData,
    exportDataJSON,
    importDataJSON,
    logoutAdmin,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<'hero' | 'portfolio' | 'translations' | 'services' | 'backup'>('portfolio');
  const [saveToast, setSaveToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>(portfolioItems[0]?.id || '');
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Local state copies for fast editing
  const [profileForm, setProfileForm] = useState(siteProfile);

  if (!isEditorModalOpen) return null;

  const showSaveNotice = () => {
    setSaveToast(true);
    playHoverSound('chime');
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteProfile(profileForm);
    showSaveNotice();
  };

  // Selected portfolio item
  const currentItem = portfolioItems.find((p) => p.id === selectedPortfolioId) || portfolioItems[0];

  const handleAddNewPortfolio = () => {
    const newId = `yt-custom-${Date.now()}`;
    const newItem: PortfolioItem = {
      id: newId,
      category: 'interview_event',
      title: {
        KR: '새로운 프로젝트 영상 제목',
        EN: 'New Project Video Title',
      },
      client: '신규 클라이언트',
      duration: '03:30',
      tools: ['Premiere Pro', 'After Effects'],
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
      videoUrl: 'https://youtu.be/_MdfnRlkCgg',
      youtubeId: '_MdfnRlkCgg',
      description: {
        KR: '영상에 대한 간단한 기획 의도 및 편집/번역 포인트를 작성해주세요.',
        EN: 'Brief description of the editing and bilingual translation points.',
      },
      features: {
        KR: ['핵심 포인트 1', '핵심 포인트 2', '핵심 포인트 3'],
        EN: ['Core feature 1', 'Core feature 2', 'Core feature 3'],
      },
      hasSubtitles: true,
      subtitleSample: {
        kr: '“원어민의 감정선과 문화적 뉘앙스를 자연스럽게 녹여냅니다.”',
        en: '“Seamlessly reflecting native emotional cadence and cultural nuances.”',
        speaker: '인터뷰이',
        timecode: '01:10',
        keyPoint: '실시간 문맥 자막',
      },
    };
    addPortfolioItem(newItem);
    setSelectedPortfolioId(newId);
    showSaveNotice();
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      deletePortfolioItem(id);
      const remaining = portfolioItems.filter((p) => p.id !== id);
      if (remaining.length > 0) setSelectedPortfolioId(remaining[0].id);
      showSaveNotice();
    }
  };

  const handleExportDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportDataJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kimpay-site-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSaveNotice();
  };

  const handleCopyExportJson = () => {
    navigator.clipboard.writeText(exportDataJSON());
    alert('사이트 전체 데이터 JSON이 클립보드에 복사되었습니다.');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJSON(importJsonText.trim());
    if (ok) {
      setImportStatus('success');
      showSaveNotice();
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('error');
    }
  };

  const handleResetData = () => {
    if (window.confirm('모든 수정을 초기화하고 사이트의 원래 기본값으로 복원하시겠습니까?')) {
      resetToDefaultData();
      showSaveNotice();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[92vh] bg-slate-900 text-white rounded-[32px] border border-sky-500/30 shadow-2xl flex flex-col overflow-hidden relative">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Box size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">KIM PAY 사이트 마스터 관리자</h3>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  LIVE 편집 모드
                </span>
              </div>
              <p className="text-xs text-slate-400">호스팅 환경에서도 웹사이트 전체를 직접 수정하고 즉시 반영합니다</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
              }}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              로그아웃
            </button>
            <button
              onClick={() => setIsEditorModalOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-950/30 border-b border-slate-800 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Film size={15} />
            <span>포트폴리오 영상 관리 ({portfolioItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hero'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User size={15} />
            <span>히어로 & 프로필 정보</span>
          </button>
          <button
            onClick={() => setActiveTab('translations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'translations'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Languages size={15} />
            <span>문맥 번역 비교 ({translationSamples.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers size={15} />
            <span>서비스 항목</span>
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode size={15} />
            <span>데이터 백업 & 내보내기</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
          {/* TAB 1: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Left Column: Project List */}
              <div className="lg:col-span-4 flex flex-col gap-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800 h-full max-h-[72vh] overflow-y-auto">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="영상 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-800 text-xs py-2 pl-8 pr-3 rounded-lg border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-sky-400"
                    />
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                  <button
                    onClick={handleAddNewPortfolio}
                    className="p-2 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer"
                    title="새 영상 추가"
                  >
                    <Plus size={15} />
                    <span>추가</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {portfolioItems
                    .filter((p) =>
                      p.title.KR.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.client.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPortfolioId(item.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedPortfolioId === item.id
                            ? 'bg-sky-500/15 border-sky-400/60 shadow-xs'
                            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md">
                            {item.client}
                          </span>
                          <span className="text-[10px] text-slate-500">{item.duration}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white line-clamp-1">{item.title.KR}</h5>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Column: Project Detail Form */}
              <div className="lg:col-span-8 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 max-h-[72vh] overflow-y-auto">
                {currentItem ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">ID: {currentItem.id}</span>
                        <h4 className="text-base font-bold text-white">프로젝트 상세 정보 편집</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeletePortfolio(currentItem.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>삭제</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">제목 (한국어)</label>
                        <input
                          type="text"
                          value={currentItem.title.KR}
                          onChange={(e) => {
                            updatePortfolioItem({
                              ...currentItem,
                              title: { ...currentItem.title, KR: e.target.value },
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">제목 (영어)</label>
                        <input
                          type="text"
                          value={currentItem.title.EN}
                          onChange={(e) => {
                            updatePortfolioItem({
                              ...currentItem,
                              title: { ...currentItem.title, EN: e.target.value },
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">클라이언트 / 채널명</label>
                        <input
                          type="text"
                          value={currentItem.client}
                          onChange={(e) => {
                            updatePortfolioItem({ ...currentItem, client: e.target.value });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">카테고리</label>
                        <select
                          value={currentItem.category}
                          onChange={(e) => {
                            updatePortfolioItem({
                              ...currentItem,
                              category: e.target.value as Category,
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        >
                          <option value="interview_event">인터뷰 / 행사</option>
                          <option value="variety_talk">예능 / 토크</option>
                          <option value="real_estate">부동산</option>
                          <option value="travel">여행</option>
                          <option value="mukbang">먹방</option>
                          <option value="vlog_daily">일상 / 브이로그</option>
                          <option value="fitness">운동 / 피트니스</option>
                          <option value="fishing">낚시</option>
                          <option value="golf">골프</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">YouTube URL 또는 링크</label>
                        <input
                          type="text"
                          value={currentItem.videoUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Extract ID if youtube
                            let ytId = currentItem.youtubeId;
                            const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                            if (match) ytId = match[1];
                            updatePortfolioItem({
                              ...currentItem,
                              videoUrl: val,
                              youtubeId: ytId,
                              thumbnail: ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : currentItem.thumbnail,
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">영상 길이 (예: 05:20)</label>
                        <input
                          type="text"
                          value={currentItem.duration}
                          onChange={(e) => {
                            updatePortfolioItem({ ...currentItem, duration: e.target.value });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">영상 설명 (한국어)</label>
                      <textarea
                        rows={3}
                        value={currentItem.description.KR}
                        onChange={(e) => {
                          updatePortfolioItem({
                            ...currentItem,
                            description: { ...currentItem.description, KR: e.target.value },
                          });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-sky-400 focus:outline-hidden leading-relaxed"
                      />
                    </div>

                    {/* 3D Subtitle Sample Editor */}
                    <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} className="text-cyan-400" />
                        <h5 className="text-xs font-black text-cyan-300">3D 인터랙티브 자막 HUD 샘플</h5>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">한국어 자막 대사</label>
                          <input
                            type="text"
                            value={currentItem.subtitleSample?.kr || ''}
                            onChange={(e) => {
                              updatePortfolioItem({
                                ...currentItem,
                                subtitleSample: {
                                  ...(currentItem.subtitleSample || { en: '', speaker: '', timecode: '', keyPoint: '' }),
                                  kr: e.target.value,
                                },
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">영어 자막 대사 (번역)</label>
                          <input
                            type="text"
                            value={currentItem.subtitleSample?.en || ''}
                            onChange={(e) => {
                              updatePortfolioItem({
                                ...currentItem,
                                subtitleSample: {
                                  ...(currentItem.subtitleSample || { kr: '', speaker: '', timecode: '', keyPoint: '' }),
                                  en: e.target.value,
                                },
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={showSaveNotice}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-blue-500/25 cursor-pointer"
                      >
                        <Save size={14} />
                        <span>변경사항 저장</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-500">선택된 영상이 없습니다.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HERO & PROFILE */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveProfile} className="max-w-3xl mx-auto space-y-6">
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-black text-sky-400">기본 프로필 & 연락처</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">에디터 이름 / 브랜드명</label>
                    <input
                      type="text"
                      value={profileForm.authorName}
                      onChange={(e) => setProfileForm({ ...profileForm, authorName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">경력 연차 뱃지</label>
                    <input
                      type="text"
                      value={profileForm.experienceYears}
                      onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">문의 이메일</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">카카오톡 오픈채팅 URL</label>
                    <input
                      type="text"
                      value={profileForm.kakaoLink}
                      onChange={(e) => setProfileForm({ ...profileForm, kakaoLink: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-black text-sky-400">히어로 헤드라인 문구</h4>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">메인 헤드라인 (한국어)</label>
                  <textarea
                    rows={2}
                    value={profileForm.heroHeadlineKR}
                    onChange={(e) => setProfileForm({ ...profileForm, heroHeadlineKR: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">메인 헤드라인 (영어)</label>
                  <textarea
                    rows={2}
                    value={profileForm.heroHeadlineEN}
                    onChange={(e) => setProfileForm({ ...profileForm, heroHeadlineEN: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">서브 설명문 (한국어)</label>
                  <textarea
                    rows={2}
                    value={profileForm.heroSubheadKR}
                    onChange={(e) => setProfileForm({ ...profileForm, heroSubheadKR: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/30 cursor-pointer"
                >
                  <Save size={15} />
                  <span>히어로 정보 저장</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: TRANSLATIONS SAMPLES */}
          {activeTab === 'translations' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {translationSamples.map((sample, sIdx) => (
                <div key={sample.id} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-black text-sky-400">샘플 0{sIdx + 1}: {sample.title.KR}</span>
                    <span className="text-[10px] text-slate-500">{sample.context.KR}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">영어 원문 (English Source)</label>
                      <textarea
                        rows={2}
                        value={sample.source}
                        onChange={(e) => updateTranslationSample({ ...sample, source: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden italic"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-rose-400 mb-1">단순 직역 (Before / Machine)</label>
                      <textarea
                        rows={2}
                        value={sample.literal}
                        onChange={(e) => updateTranslationSample({ ...sample, literal: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-cyan-400 mb-1">3D 문맥 맞춤 자막 (Target / Contextual)</label>
                    <textarea
                      rows={2}
                      value={sample.target}
                      onChange={(e) => updateTranslationSample({ ...sample, target: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">번역 차이 설명 노트</label>
                    <input
                      type="text"
                      value={sample.explanation.KR}
                      onChange={(e) =>
                        updateTranslationSample({
                          ...sample,
                          explanation: { ...sample.explanation, KR: e.target.value },
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={showSaveNotice}
                  className="px-6 py-3 bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  <Save size={15} />
                  <span>번역 샘플 저장</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {servicesData.map((srv, idx) => (
                <div key={srv.id} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{srv.icon}</span>
                    <h5 className="text-xs font-black text-sky-400">서비스 0{idx + 1}: {srv.title.KR}</h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">제목 (한국어)</label>
                      <input
                        type="text"
                        value={srv.title.KR}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[idx].title.KR = e.target.value;
                          updateServicesData(updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">설명 (한국어)</label>
                      <input
                        type="text"
                        value={srv.desc.KR}
                        onChange={(e) => {
                          const updated = [...servicesData];
                          updated[idx].desc.KR = e.target.value;
                          updateServicesData(updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:border-sky-400 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={showSaveNotice}
                  className="px-6 py-3 bg-[#0066FF] text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  <Save size={15} />
                  <span>서비스 저장</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white mb-2 flex items-center gap-2">
                  <Download size={16} className="text-sky-400" />
                  <span>사이트 데이터 내보내기 & 영구 보관</span>
                </h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  브라우저의 localStorage에 실시간 저장된 데이터를 JSON 파일로 다운로드하거나 복사하여, 나중에 다른 컴퓨터나 새 호스팅 환경에서도 그대로 불러올 수 있습니다.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportDownload}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#0066FF] to-sky-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>JSON 파일 다운로드</span>
                  </button>
                  <button
                    onClick={handleCopyExportJson}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
                  >
                    <FileCode size={14} />
                    <span>JSON 클립보드 복사</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white mb-2 flex items-center gap-2">
                  <Upload size={16} className="text-cyan-400" />
                  <span>백업 데이터 가져오기 (JSON Import)</span>
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  이전에 내보낸 JSON 데이터를 여기에 붙여넣고 가져오기를 누르면 사이트 전체가 해당 데이터로 복원됩니다.
                </p>

                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='{"portfolioItems": [...], "siteProfile": {...}}'
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-sky-400 focus:outline-hidden font-mono mb-3"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleImportJson}
                    className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md shadow-cyan-600/20 cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>데이터 불러오기 적용</span>
                  </button>

                  {importStatus === 'success' && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check size={14} />
                      <span>성공적으로 불러왔습니다!</span>
                    </span>
                  )}
                  {importStatus === 'error' && (
                    <span className="text-xs font-bold text-rose-400">
                      유효하지 않은 JSON 형식입니다.
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-rose-950/20 p-6 rounded-2xl border border-rose-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-300">원래 기본값으로 초기화</h4>
                  <p className="text-[11px] text-slate-400">모든 커스텀 수정을 지우고 최초 기본 포트폴리오로 복원합니다.</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>기본값 복원</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Save Toast */}
        <AnimatePresence>
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs"
            >
              <Check size={16} />
              <span>변경사항이 실시간 저장되었습니다!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
