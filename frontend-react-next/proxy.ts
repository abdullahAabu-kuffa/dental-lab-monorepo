//All Dashboard Code Need to refactor

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const HostIP = process.env.NEXT_PUBLIC_API_URL;

export function proxy(req: NextRequest) {
   
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        try {
            fetch(`${HostIP}/api/users/me`)
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
