'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': "Egypt's First Digital Dental Lab",
    'hero.subtitle': 'Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Premium dental restorations crafted with precision and care',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have questions? We\'re here to help you transform your dental practice with digital innovation.',
    
    // Language
    'language.switch': 'Switch Language',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title': 'أول مختبر أسنان رقمي في مصر',
    'hero.subtitle': 'ثورة في ترميم الأسنان مع تكامل ExoCAD والتتبع الفوري والدفع الفوري عبر الإنترنت',
    'hero.cta.primary': 'ابدأ الآن',
    'hero.cta.secondary': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'ترميمات أسنان فائقة الجودة مصنوعة بدقة ورعاية',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'لديك أسئلة؟ نحن هنا لمساعدتك في تحويل ممارستك السنية بالابتكار الرقمي',
    
    // Language
    'language.switch': 'تغيير اللغة',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};