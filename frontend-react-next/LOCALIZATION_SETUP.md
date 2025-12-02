# Localization Setup Guide

## Overview

Your app now has a simple, clean localization system supporting English (EN) and Arabic (AR) with automatic localStorage persistence.

## How It Works

### 1. **Translations Storage**

- File: `src/i18n/translations.ts`
- All translations are defined in one place
- Type-safe translation keys with TypeScript

### 2. **Language Context**

- File: `src/contexts/LanguageContext.tsx`
- Manages the current language state
- Persists user preference to localStorage
- Updates HTML `lang` and `dir` attributes automatically

### 3. **Hooks Available**

#### `useTranslation()` - Main Hook

```tsx
import { useTranslation } from "@/hooks/useTranslation";

export const MyComponent = () => {
	const { t, locale, setLocale, isArabic, isEnglish } = useTranslation();

	return (
		<div>
			<h1>{t("hero.title")}</h1>
			<p>{t("hero.subtitle")}</p>
			<button onClick={() => setLocale("ar")}>Switch to Arabic</button>
			<p>Current: {locale}</p>
		</div>
	);
};
```

#### `useLocalization()` - Advanced Hook

```tsx
import { useLocalization } from "@/hooks/useLocalization";

export const MyComponent = () => {
	const { locale, setLocale, mounted, isArabic } = useLocalization("en");

	// Only render after client-side hydration
	if (!mounted) return null;

	return <div>{/* component */}</div>;
};
```

## Usage Examples

### Basic Translation

```tsx
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export const Hero = () => {
	const { t } = useTranslation();

	return (
		<section>
			<h1>{t("hero.title")}</h1>
			<p>{t("hero.subtitle")}</p>
		</section>
	);
};
```

### Language Switcher

```tsx
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export const LanguageSwitcher = () => {
	const { locale, setLocale, t } = useTranslation();

	return (
		<button onClick={() => setLocale(locale === "en" ? "ar" : "en")}>
			{locale === "en" ? t("language.ar") : t("language.en")}
		</button>
	);
};
```

### RTL Styling

```tsx
"use client";
import { useTranslation } from "@/hooks/useTranslation";

export const Card = () => {
	const { isArabic } = useTranslation();

	return <div className={isArabic ? "text-right" : "text-left"}>Content</div>;
};
```

## Adding New Translations

1. Open `src/i18n/translations.ts`
2. Add your key to both `en` and `ar` objects:

```typescript
export const translations = {
	en: {
		"page.title": "My Title",
		"page.description": "My Description",
	},
	ar: {
		"page.title": "عنواني",
		"page.description": "وصفي",
	},
};
```

3. Use in component:

```tsx
const { t } = useTranslation();
console.log(t("page.title")); // "My Title" or "عنواني"
```

## LocalStorage Details

- **Key**: `user-language`
- **Values**: `'en'` or `'ar'`
- **Auto-persists**: When user changes language
- **Auto-loads**: On app start
- **Example**: Open DevTools → Application → Local Storage → user-language

## Features

✅ Simple and clean API
✅ Type-safe translations
✅ Automatic localStorage persistence
✅ RTL/LTR handling
✅ HTML lang attribute updates
✅ No external dependencies needed
✅ Client-side rendering compatible
✅ Hydration-safe with `mounted` flag

## Best Practices

1. **Use the `mounted` flag for hydration-sensitive code**:

```tsx
const { mounted, locale } = useLocalization("en");
if (!mounted) return null;
return <div>{/* component */}</div>;
```

2. **Group translation keys logically**:

```typescript
"nav.home", "nav.services", "nav.about";
"hero.title", "hero.subtitle";
"error.notFound", "error.unauthorized";
```

3. **Always provide both EN and AR translations** to avoid missing keys

4. **Use TypeScript for type safety**:

```tsx
const { t } = useTranslation();
t("nonexistent.key"); // TypeScript error if properly typed
```

## Troubleshooting

**Language not persisting?**

- Check browser localStorage is enabled
- Check DevTools → Application → Local Storage → user-language

**RTL not applying?**

- Ensure `useTranslation()` is called in a client component (`'use client'`)
- Check Tailwind RTL is configured if using RTL utilities

**Missing translation?**

- Verify key exists in both `en` and `ar` in `src/i18n/translations.ts`
- Add missing translation keys

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.tsx      # Context provider
├── hooks/
│   ├── useTranslation.ts        # Main hook (recommended)
│   └── useLocalization.ts       # Advanced hook
├── i18n/
│   ├── translations.ts          # All translations
│   └── locales.ts               # Locale types
└── components/
    ├── LanguageSwitcher.tsx     # Language switcher button
    └── TranslationExample.tsx   # Example component
```
