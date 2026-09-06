import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PORTFOLIO_ITEMS as DEFAULT_PORTFOLIO,
  SERVICES_DATA as DEFAULT_SERVICES,
  TRANSLATION_SAMPLES as DEFAULT_TRANSLATIONS,
} from '../data/portfolioData';
import { PortfolioItem, ServiceItem, TranslationSample, ResumeData } from '../types';
import { playHoverSound } from '../utils/soundEffects';

export interface SiteProfile {
  authorName: string;
  email: string;
  phone: string;
  kakaoLink: string;
  instagramId: string;
  instagramUrl: string;
  avatarUrl: string;
  experienceYears: string;
  heroBadgeKR: string;
  heroBadgeEN: string;
  heroHeadlineKR: string;
  heroHeadlineEN: string;
  heroSubheadKR: string;
  heroSubheadEN: string;
  heroWordsKR: string[];
  heroWordsEN: string[];
  resumeData: ResumeData;
  customImages: Record<string, string>;
}

export const DEFAULT_RESUME: ResumeData = {
  title: '영상 편집자 & 바이링구얼(한/영) 번역 에디터',
  summary:
    '유튜브 웹예능, 글로벌 스포츠 인터뷰, 대기업 IR 및 하이엔드 공간 영상 등 누적 150편 이상의 프로덕션을 총괄한 3년+ 경력의 영상 편집 & 영어 번역 스페셜리스트입니다. 단순 직역에 그치지 않고 원어민의 감정선과 호흡, 현지 슬랭까지 살려내는 문맥 번역과 시선을 사로잡는 리듬감 있는 컷 편집 및 3D 모션 그래픽을 강점으로 합니다.',
  skills: [
    {
      category: '영상 편집 및 색보정',
      items: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Audition', '4K UHD Color Grading'],
    },
    {
      category: '영어 번역 및 로컬라이징',
      items: ['한영/영한 문맥 맞춤 번역', '타임싱크 SRT 자막 마스터링', '원어민 슬랭 & 문화적 뉘앙스 최적화', '글로벌 테크/스포츠 인터뷰 녹취 번역'],
    },
    {
      category: '모션 및 연출',
      items: ['3D 키네틱 타이포그래피', '고유입 훅(Hook) 설계', 'BGM & SFX 사운드 디자인', '유튜브 클릭률 최적화 썸네일 디자인'],
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      period: '2023.03 ~ 현재',
      role: '리드 비디오 에디터 & 바이링구얼 번역 총괄',
      clientOrCompany: '프리랜서 크리에이티브 스튜디오 (KIM PAY)',
      description: '국내외 유명 유튜브 채널 및 기업 글로벌 프로젝트의 영상 편집, 한영 자막 번역 및 썸네일 전담 제작',
      achievements: [
        'MLB 메이저리거(이정후 등) 현지 인터뷰 & 팬 반응 토크 영상 번역 및 편집 (단일 영상 조회수 120만+ 달성)',
        '대기업 글로벌 컨퍼런스 키노트 & 해외 바이어 인터뷰 영상 한영 자막 및 4K 마스터링 납품 (만족도 100%)',
        '유튜브 쇼츠 & 릴스 숏폼 콘텐츠 80여 편 기획·편집 (평균 시청 지속시간 75% 기록)',
      ],
    },
    {
      id: 'exp-2',
      period: '2021.08 ~ 2023.02',
      role: '콘텐츠 비디오 에디터 & 자막 번역 담당',
      clientOrCompany: '디지털 미디어 에이전시',
      description: '부동산 룸투어 시네마틱, 여행/먹방 브이로그, 인터뷰 웹콘텐츠 포스트 프로덕션',
      achievements: [
        '한남동/성수동 럭셔리 펜트하우스 룸투어 시리즈 컷 편집 및 공간 인포그래픽 모션 자막 제작',
        '해외 크리에이터 협업 한국 여행 브이로그 3D 인터랙티브 자막 번역 및 효과음 디자인',
        '납기 준수율 100% 및 재의뢰율 88% 달성',
      ],
    },
  ],
  education: [
    {
      period: '2017.03 ~ 2021.02',
      name: '한국대학교 미디어커뮤니케이션학 & 영미어문학',
      major: '학사 복수전공 (영미문화 및 디지털 영상 제작)',
    },
  ],
  certifications: [
    {
      date: '2023.05',
      title: 'TOEIC (토익)',
      scoreOrIssuer: '990점 만점 / ETS',
    },
    {
      date: '2023.04',
      title: 'OPIc (영어 말하기)',
      scoreOrIssuer: 'AL (Advanced Low) / ACTFL',
    },
    {
      date: '2022.10',
      title: 'Adobe Certified Professional (Premiere Pro & After Effects)',
      scoreOrIssuer: 'Adobe 공식 인증',
    },
  ],
};

export const DEFAULT_PROFILE: SiteProfile = {
  authorName: 'KIM PAY (김페이)',
  email: 'contact@kimpay-portfolio.com',
  phone: '010-8254-0313',
  kakaoLink: 'https://open.kakao.com/o/sample',
  instagramId: '@kimpay_video',
  instagramUrl: 'https://instagram.com/kimpay_video',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  experienceYears: '3년+',
  heroBadgeKR: '영상 편집 & 영어 번역 · 3D 인터페이스',
  heroBadgeEN: 'Video Editing & English Translation · 3D Interface',
  heroHeadlineKR: '글로벌 감각의 영상 편집,\n원어민의 호흡을 담는 영어 번역',
  heroHeadlineEN: 'Cinematic Video Editing,\nContextual Bilingual Translation',
  heroSubheadKR: '유튜브 브이로그부터 기업 홍보영상 및 글로벌 인터뷰까지, 단순 직역을 넘어선 문맥 번역과 시선을 사로잡는 리듬감 있는 컷 편집을 선사합니다.',
  heroSubheadEN: 'From YouTube vlogs to corporate global keynotes, delivering contextual bilingual translation combined with rhythmic cinematic video editing.',
  heroWordsKR: ['원어민의', '감정선과', '말투까지', '생생하게', '살려내는', '3D', '고감도', '자막'],
  heroWordsEN: ['Breathing', 'native', 'empathy', 'into', 'every', '3D', 'synchronized', 'line'],
  resumeData: DEFAULT_RESUME,
  customImages: {},
};

interface SiteDataContextType {
  portfolioItems: PortfolioItem[];
  servicesData: ServiceItem[];
  translationSamples: TranslationSample[];
  siteProfile: SiteProfile;
  // Updates
  updatePortfolioItem: (item: PortfolioItem) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: string) => void;
  updateSiteProfile: (profile: Partial<SiteProfile>) => void;
  updateTranslationSample: (sample: TranslationSample) => void;
  updateServicesData: (services: ServiceItem[]) => void;
  resetToDefaultData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  // Admin Authentication
  isAdminLoggedIn: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isEditorModalOpen: boolean;
  setIsEditorModalOpen: (open: boolean) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'kimpay_site_data_v2';
const AUTH_STORAGE_KEY = 'kimpay_admin_auth_token';

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO);
  const [servicesData, setServicesData] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [translationSamples, setTranslationSamples] = useState<TranslationSample[]>(DEFAULT_TRANSLATIONS);
  const [siteProfile, setSiteProfile] = useState<SiteProfile>(DEFAULT_PROFILE);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.portfolioItems) setPortfolioItems(parsed.portfolioItems);
        if (parsed.servicesData) setServicesData(parsed.servicesData);
        if (parsed.translationSamples) setTranslationSamples(parsed.translationSamples);
        if (parsed.siteProfile) {
          setSiteProfile({
            ...DEFAULT_PROFILE,
            ...parsed.siteProfile,
            resumeData: parsed.siteProfile.resumeData || DEFAULT_RESUME,
            customImages: parsed.siteProfile.customImages || {},
          });
        }
      }

      // Check admin session
      const auth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (auth === 'admin_authorized_0313') {
        setIsAdminLoggedIn(true);
      }
    } catch (err) {
      console.warn('Failed to load local site data', err);
    }
  }, []);

  // Save to localStorage whenever state changes
  const saveToStorage = (
    newPortfolio = portfolioItems,
    newServices = servicesData,
    newTranslations = translationSamples,
    newProfile = siteProfile
  ) => {
    try {
      const dataToSave = {
        portfolioItems: newPortfolio,
        servicesData: newServices,
        translationSamples: newTranslations,
        siteProfile: newProfile,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  };

  const updatePortfolioItem = (updatedItem: PortfolioItem) => {
    const updated = portfolioItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setPortfolioItems(updated);
    saveToStorage(updated, servicesData, translationSamples, siteProfile);
  };

  const addPortfolioItem = (newItem: PortfolioItem) => {
    const updated = [newItem, ...portfolioItems];
    setPortfolioItems(updated);
    saveToStorage(updated, servicesData, translationSamples, siteProfile);
  };

  const deletePortfolioItem = (id: string) => {
    const updated = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updated);
    saveToStorage(updated, servicesData, translationSamples, siteProfile);
  };

  const updateSiteProfile = (partial: Partial<SiteProfile>) => {
    const updated = { ...siteProfile, ...partial };
    setSiteProfile(updated);
    saveToStorage(portfolioItems, servicesData, translationSamples, updated);
  };

  const updateTranslationSample = (updatedSample: TranslationSample) => {
    const updated = translationSamples.map((s) =>
      s.id === updatedSample.id ? updatedSample : s
    );
    setTranslationSamples(updated);
    saveToStorage(portfolioItems, servicesData, updated, siteProfile);
  };

  const updateServicesData = (newServices: ServiceItem[]) => {
    setServicesData(newServices);
    saveToStorage(portfolioItems, newServices, translationSamples, siteProfile);
  };

  const resetToDefaultData = () => {
    setPortfolioItems(DEFAULT_PORTFOLIO);
    setServicesData(DEFAULT_SERVICES);
    setTranslationSamples(DEFAULT_TRANSLATIONS);
    setSiteProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportDataJSON = () => {
    const data = {
      portfolioItems,
      servicesData,
      translationSamples,
      siteProfile,
      version: '2.0',
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.portfolioItems && Array.isArray(parsed.portfolioItems)) {
        setPortfolioItems(parsed.portfolioItems);
      }
      if (parsed.servicesData && Array.isArray(parsed.servicesData)) {
        setServicesData(parsed.servicesData);
      }
      if (parsed.translationSamples && Array.isArray(parsed.translationSamples)) {
        setTranslationSamples(parsed.translationSamples);
      }
      if (parsed.siteProfile) {
        setSiteProfile({ ...DEFAULT_PROFILE, ...parsed.siteProfile });
      }
      saveToStorage(
        parsed.portfolioItems || portfolioItems,
        parsed.servicesData || servicesData,
        parsed.translationSamples || translationSamples,
        parsed.siteProfile ? { ...DEFAULT_PROFILE, ...parsed.siteProfile } : siteProfile
      );
      return true;
    } catch {
      return false;
    }
  };

  // Secret login authentication with password 0313
  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === '0313') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'admin_authorized_0313');
      playHoverSound('chime');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsEditorModalOpen(false);
  };

  // Keyboard shortcut listener: Ctrl + Shift + A (or Cmd + Shift + A) to open secret admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsEditorModalOpen((prev) => !prev);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  return (
    <SiteDataContext.Provider
      value={{
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
        isAdminLoggedIn,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isEditorModalOpen,
        setIsEditorModalOpen,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
