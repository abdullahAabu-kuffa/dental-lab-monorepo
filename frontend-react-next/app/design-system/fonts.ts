export const fontFamilies = {
  english: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)', 
    display: 'var(--font-playfair)',
  },
  arabic: {
    sans: 'var(--font-noto-arabic)',
    mono: 'var(--font-geist-mono)',
    display: 'var(--font-noto-arabic)',
  }
};

export const getFontClass = (language: 'en' | 'ar') => {
  return language === 'ar' 
    ? 'font-arabic' 
    : 'font-english';
};

// CSS classes to be used in components
export const textDirectionClasses = {
  ltr: 'text-left',
  rtl: 'text-right'
};