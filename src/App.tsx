import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TranslationCompareSection } from './components/TranslationCompareSection';
import { ProcessSection } from './components/ProcessSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { ContactSection } from './components/ContactSection';
import { VideoModal } from './components/VideoModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminEditorModal } from './components/admin/AdminEditorModal';
import { HiddenAdminTrigger } from './components/admin/HiddenAdminTrigger';
import { SiteDataProvider } from './context/SiteDataContext';
import { Category, Language, PortfolioItem } from './types';

function PortfolioApp() {
  const [lang, setLang] = useState<Language>('KR');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [activeVideoItem, setActiveVideoItem] = useState<PortfolioItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('editing');

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoItem(null);
        setIsInquiryModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'KR' ? 'EN' : 'KR'));
  };

  const handleExploreWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    // If video editing service, filter to ads/vlogs, if all-in-one scroll to work
    if (serviceId === 'editing') {
      setSelectedCategory('vlog_daily');
    } else if (serviceId === 'translation') {
      setSelectedCategory('interview_event');
    } else {
      setSelectedCategory('all');
    }
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0066FF] selection:text-white font-sans">
      {/* Fixed Sticky Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenContactModal={() => setIsInquiryModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section (with 20% opacity loop video) */}
        <HeroSection
          lang={lang}
          onExploreWork={handleExploreWork}
          onOpenContactModal={() => setIsInquiryModalOpen(true)}
        />

        {/* 2. Services Section (Kakao asset/benefit 3D card style) */}
        <ServicesSection
          lang={lang}
          onSelectService={handleSelectService}
        />

        {/* 3. Portfolio Section (Filter tabs + Video grid + Hover details) */}
        <PortfolioSection
          lang={lang}
          onSelectProject={(item) => setActiveVideoItem(item)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 4. Translation Compare Section (Source vs Target Slide Comparator) */}
        <TranslationCompareSection lang={lang} />

        {/* 5. Process Section (4 Steps Workflow) */}
        <ProcessSection lang={lang} />

        {/* 6. Trust & Stats Section (150+ videos, 500k words, 98% satisfaction) */}
        <TrustStatsSection lang={lang} />

        {/* 7. Contact Section (Kakao Pay Customer Center style) */}
        <ContactSection
          lang={lang}
          onOpenModal={() => setIsInquiryModalOpen(true)}
        />
      </main>

      {/* Interactive Video Showcase Player Modal */}
      <VideoModal
        item={activeVideoItem}
        lang={lang}
        onClose={() => setActiveVideoItem(null)}
      />

      {/* Quick Inquiry / Kakao Consultation Modal */}
      <QuickInquiryModal
        isOpen={isInquiryModalOpen}
        lang={lang}
        onClose={() => setIsInquiryModalOpen(false)}
        preselectedService={selectedServiceForInquiry}
      />

      {/* Hidden Master Admin Auth Modal (Password: 0313) */}
      <AdminAuthModal />

      {/* Site Master Content Live Editor Modal */}
      <AdminEditorModal />

      {/* Hidden Master Control Trigger & Floating Admin Bar */}
      <HiddenAdminTrigger />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <PortfolioApp />
    </SiteDataProvider>
  );
}
