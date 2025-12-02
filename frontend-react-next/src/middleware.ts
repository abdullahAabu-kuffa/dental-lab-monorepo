import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split('/');
    const locale = segments[1];

    if (locales.includes(locale)) {
        return NextResponse.next();
    }

    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
