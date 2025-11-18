import { NextResponse } from "next/server";

const HostIP = "http://localhost:3001"; // سيرفرك الخارجي
const Token = process.env.TOKEN;

async function fetchUpstream(endpoint: string, method: "GET" | "POST" = "GET", body?: unknown) {
  if (!HostIP) throw new Error("Host IP is not valid");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (Token) headers.set("Authorization", `Bearer ${Token}`);

    const upstream = await fetch(`${HostIP}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = upstream.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await upstream.json() : await upstream.text();

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set("Content-Type", isJson ? "application/json" : "text/plain; charset=utf-8");

    return { data, status: upstream.status, headers: responseHeaders };
  } catch (err: any) {
    clearTimeout(timeout);
    const aborted = err?.name === "AbortError";
    throw new Error(aborted ? "Upstream request timed out" : "Unable to reach upstream service");
  }
}

export async function GET() {
  try {
    const { data, status, headers } = await fetchUpstream("/api/orders", "GET");
    return new NextResponse(JSON.stringify(data), { status, headers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const { data, status, headers } = await fetchUpstream("/api/orders/create", "POST", body);
    return new NextResponse(JSON.stringify(data), { status, headers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 504 });
  }
}
