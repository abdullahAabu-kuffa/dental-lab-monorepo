"use client";

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	defaultValue: string;
	label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
	const router = useRouter();

	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value;
		router.replace(
			// @ts-expect-error -- TypeScript will validate that only known `params`
			// are used in combination with a given `pathname`. Since the two will
			// always match for the current route, we can skip runtime checks.
			{ pathname, params },
			{ locale: nextLocale as Locale }
		);
	}

	return (
		<div>
			<label htmlFor="locale-switcher" className="sr-only">
				{label}
			</label>
			<select
				id="locale-switcher"
				defaultValue={defaultValue}
				onChange={onSelectChange}
				className="text-primary h-8 cursor-pointer border border-gray-300 rounded focus:ring focus:ring-offset-0"
				aria-label={label}
			>
				{routing.locales.map((locale) => (
					<option key={locale} value={locale}>
						{locale}
					</option>
				))}
			</select>
		</div>
	);
}
