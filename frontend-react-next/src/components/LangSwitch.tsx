import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { routing } from "@/i18n/routing";

export default function LangSwitch() {
	const locale = useLocale();

	return (
		<div className="mt-2 flex items-center">
			<LocaleSwitcherSelect defaultValue={locale} label="Select a locale">
				{routing.locales.map((cur) => (
					<option key={cur} value={cur} className="text-primary">
						{cur}
					</option>
				))}
			</LocaleSwitcherSelect>
		</div>
	);
}
