export type Language = 'KR' | 'EN';

export type Category = 
  | 'all'
  | 'interview_event'
  | 'variety_talk'
  | 'real_estate'
  | 'travel'
  | 'mukbang'
  | 'vlog_daily'
  | 'fitness'
  | 'fishing'
  | 'golf';

export interface PortfolioItem {
  id: string;
  category: Category;
  title: {
    KR: string;
    EN: string;
  };
  client: string;
  duration: string;
  tools: string[];
  thumbnail: string;
  videoUrl: string;
  youtubeId?: string;
  description: {
    KR: string;
    EN: string;
  };
  features: {
    KR: string[];
    EN: string[];
  };
  hasSubtitles: boolean;
  subtitleSample?: {
    kr: string;
    en: string;
    timecode?: string;
    speaker?: string;
    keyPoint?: string;
  };
}

export interface TranslationSample {
  id: string;
  title: {
    KR: string;
    EN: string;
  };
  context: {
    KR: string;
    EN: string;
  };
  source: string;
  literal: string;
  target: string;
  explanation: {
    KR: string;
    EN: string;
  };
}

export interface ServiceItem {
  id: string;
  icon: string;
  badge: {
    KR: string;
    EN: string;
  };
  title: {
    KR: string;
    EN: string;
  };
  desc: {
    KR: string;
    EN: string;
  };
  points: {
    KR: string[];
    EN: string[];
  };
  bgGradient: string;
}

export interface StatItem {
  id: string;
  value: string;
  unit: {
    KR: string;
    EN: string;
  };
  label: {
    KR: string;
    EN: string;
  };
  sublabel: {
    KR: string;
    EN: string;
  };
  icon: string;
}
