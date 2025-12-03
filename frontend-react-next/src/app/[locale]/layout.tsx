import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import NavbarWrapper from "@/components/organisms/Navbar/NavbarWrapper";
import { useLocale } from "next-intl";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<NextIntlClientProvider messages={messages} locale={locale}>
			<NavbarWrapper />
			{children}
		</NextIntlClientProvider>
	);
}
