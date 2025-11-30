import { NextResponse } from "next/server";

const HostIP = process.env.NEXT_PUBLIC_API_URL;
export async function POST(req: Request) {
  if (!HostIP) {
    return NextResponse.json({ error: "Host ip not valid" }, { status: 500 });
  }

  let data: unknown;
  try {
    data = await req.json();
    console.log(
      "login data = ",
      data,
      " , after adding",
      JSON.stringify({
        ...(data as Record<string, unknown>),
        clientType: "web",
  }).toString()
    );
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  // this is for control the requests using network abort
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
      const userAgent = req.headers.get('user-agent') || 'unknown';


  try {
    const upstream = await fetch(`${HostIP}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'user-agent': userAgent},
      body: JSON.stringify({
        ...(data as Record<string, unknown>),
        clientType: "web",
      }),
      signal: controller.signal,
      //credentials: "include"
    });
    clearTimeout(timeout);
    const contentType = upstream.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const ResData = isJson ? await upstream.json() : await upstream.text();

    const headers = new Headers(upstream.headers);
    // Make sure content-type is set correctly
    headers.set(
      "Content-Type",
      isJson ? "application/json" : "text/plain; charset=utf-8"
    );
    return new NextResponse(
      isJson ? JSON.stringify(ResData) : String(ResData),
      {
        status: upstream.status,
        headers,
      }
    );
  } catch (err) {
    clearTimeout(timeout);
    const aborted = (err as Error).name === "AbortError";
    return NextResponse.json(
      {
        error: aborted
          ? "Upstream request timed out"
          : "Unable to reach auth service",
      },
      { status: 504 }
    );
  }
}
