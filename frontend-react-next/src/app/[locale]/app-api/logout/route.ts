import { NextResponse } from "next/server";

export async function POST() {
    console.log("Logging out...");
    const response = NextResponse.json({ success: true });

    response.cookies.delete("refreshToken");

    response.cookies.delete("accessToken");


    return response;
}
