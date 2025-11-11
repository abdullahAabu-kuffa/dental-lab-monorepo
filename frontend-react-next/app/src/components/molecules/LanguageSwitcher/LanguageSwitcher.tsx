'use client';

import { useLanguage } from '../../../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#D4AF37] transition-colors duration-200"
      title={t('language.switch')}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium text-sm">
        {language === 'en' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;