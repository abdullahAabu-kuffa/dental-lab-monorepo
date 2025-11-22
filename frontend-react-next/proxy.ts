//All Dashboard Code Need to refactor

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const HostIP = process.env.auth_local_ip;

export function proxy(req: NextRequest) {
    //to stop loading dashboard until refactor it 
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        try {
            fetch(`${HostIP}/users/me`)
        } catch {

        }
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};
