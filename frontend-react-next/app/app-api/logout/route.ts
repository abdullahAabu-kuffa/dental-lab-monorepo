import { NextResponse } from "next/server";

export async function POST() {
    console.log("Logging out...");
    const response = NextResponse.json({ success: true });

    // Clear refresh token cookie
    response.cookies.delete("refreshToken");

    // Clear access token cookie
    response.cookies.delete("accessToken");

    // response.cookies.set("refreshToken", "", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "strict",
    //     path: "/",
    //     expires: new Date(0),
    // });

    // response.cookies.set("accessToken", "", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "strict",
    //     path: "/",
    //     expires: new Date(0),
    // });


    return response;
}
