import { NextResponse } from "next/server";

const HostIP = process.env.auth_local_ip;

export async function POST() {
    const upstream = await fetch(`${HostIP}/api/auth/refreshToken`, {
        method: "POST",
        credentials: "include",
    });

    if (!upstream.ok) {
        return NextResponse.json({ status: upstream.status });
    }

    // const data = await upstream.json();
    return NextResponse.json({ status: upstream.status });
}
