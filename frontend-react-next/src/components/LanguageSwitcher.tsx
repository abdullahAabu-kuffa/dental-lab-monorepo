"use client";

import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Props = {
	label: string;
};

export default function LanguageSwitcher({ label }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();

	// 👇 THIS IS THE FIX: get actual current locale from next-intl
	const locale = useLocale();
	const isEnglish = locale === "en";

	const didInit = useRef(false);

	useEffect(() => {
		if (didInit.current) return;
		didInit.current = true;

		const saved = localStorage.getItem("preferredLocale") as Locale | null;

		if (saved && saved !== locale) {
			router.replace({ pathname, query: params }, { locale: saved });
		}
	}, [locale, pathname, params, router]);

	function handleToggle() {
		const nextLocale: Locale = locale === "en" ? "ar" : "en";

		localStorage.setItem("preferredLocale", nextLocale);

		router.replace({ pathname, query: params }, { locale: nextLocale });
	}

	return (
		<button
			onClick={handleToggle}
			aria-label={label}
			className="
        relative flex items-center gap-2
        px-3 py-1.5
        rounded-full
        bg-[#F4E4A6]
        border border-[#D4AF37]/60
        text-xs font-semibold
        text-[#D4AF37]
        shadow-sm
        transition-all duration-200
        hover:shadow-md
        hover:bg-[#F4E4A6]/90
        focus:outline-none
        focus:ring-2 focus:ring-[#D4AF37]/40
    "
		>
			<Globe size={14} className="text-[#D4AF37]" />

			<span
				className={`
          px-2 py-0.5 rounded-full transition-all duration-200
          ${isEnglish ? "bg-[#D4AF37] text-white" : "text-[#D4AF37]"}
        `}
			>
				EN
			</span>

			<span
				className={`
          px-2 py-0.5 rounded-full transition-all duration-200
          ${!isEnglish ? "bg-[#D4AF37] text-white" : "text-[#D4AF37]"}
        `}
			>
				AR
			</span>
		</button>
	);
}
