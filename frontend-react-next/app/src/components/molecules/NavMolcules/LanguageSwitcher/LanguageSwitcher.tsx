'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Globe } from '../../../../utils/UnifiedIcons';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#D4AF37] transition-colors duration-200"
      title={t('language.switch')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium text-sm">
        {language === 'en' ? 'EN' : 'عربي'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;