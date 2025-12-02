'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations, TranslationKey } from '@/i18n/translations';

export const useTranslation = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useTranslation must be used within LanguageProvider');
    }

    const t = (key: TranslationKey): string => {
        return translations[context.locale][key] || key;
    };

    return {
        t,
        locale: context.locale,
        setLocale: context.setLocale,
        isArabic: context.locale === 'ar',
        isEnglish: context.locale === 'en',
    };
};
