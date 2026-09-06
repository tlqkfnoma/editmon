import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PORTFOLIO_ITEMS as DEFAULT_PORTFOLIO,
  SERVICES_DATA as DEFAULT_SERVICES,
  TRANSLATION_SAMPLES as DEFAULT_TRANSLATIONS,
} from '../data/portfolioData';
import { PortfolioItem, ServiceItem, TranslationSample } from '../types';
import { playHoverSound } from '../utils/soundEffects';

export interface SiteProfile {
  authorName: string;
  email: string;
  kakaoLink: string;
  experienceYears: string;
  heroBadgeKR: string;
  heroBadgeEN: string;
  heroHeadlineKR: string;
  heroHeadlineEN: string;
  heroSubheadKR: string;
  heroSubheadEN: string;
  heroWordsKR: string[];
  heroWordsEN: string[];
}

export const DEFAULT_PROFILE: SiteProfile = {
  authorName: 'KIM PAY (김페이)',
  email: 'contact@kimpay-portfolio.com',
  kakaoLink: 'https://open.kakao.com/o/sample',
  experienceYears: '3년+',
  heroBadgeKR: '영상 편집 & 영어 번역 · 3D 인터페이스',
  heroBadgeEN: 'Video Editing & English Translation · 3D Interface',
  heroHeadlineKR: '글로벌 감각의 영상 편집,\n원어민의 호흡을 담는 영어 번역',
  heroHeadlineEN: 'Cinematic Video Editing,\nContextual Bilingual Translation',
  heroSubheadKR: '유튜브 브이로그부터 기업 홍보영상 및 글로벌 인터뷰까지, 단순 직역을 넘어선 문맥 번역과 시선을 사로잡는 리듬감 있는 컷 편집을 선사합니다.',
  heroSubheadEN: 'From YouTube vlogs to corporate global keynotes, delivering contextual bilingual translation combined with rhythmic cinematic video editing.',
  heroWordsKR: ['원어민의', '감정선과', '말투까지', '생생하게', '살려내는', '3D', '고감도', '자막'],
  heroWordsEN: ['Breathing', 'native', 'empathy', 'into', 'every', '3D', 'synchronized', 'line'],
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
        if (parsed.siteProfile) setSiteProfile({ ...DEFAULT_PROFILE, ...parsed.siteProfile });
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
