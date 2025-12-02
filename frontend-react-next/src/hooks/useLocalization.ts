'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

/**
 * Hook to get language state and utilities
 * @deprecated Use useTranslation instead
 * Use this only if you need the mounted flag for hydration handling
 */
export const useLocalization = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLocalization must be used within LanguageProvider');
    }

    return {
        locale: context.locale,
        setLocale: context.setLocale,
        mounted: context.mounted,
        isArabic: context.locale === 'ar',
        isEnglish: context.locale === 'en',
    };
};
