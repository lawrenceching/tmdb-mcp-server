import { NextRequest, NextResponse } from "next/server";

const TMDB_ORIGIN = "https://api.themoviedb.org";
const PROXY_VIA_PSEUDONYM = "tmdb-mcp-server";
const SERVER_IDENT = "tmdb-mcp-server";

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function HEAD(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PUT(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  try {
    const token = process.env.TMDB_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "TMDB_ACCESS_TOKEN is not configured" },
        { status: 503 }
      );
    }

    const url = new URL(request.url);
    const pathname = url.pathname;
    const upstreamPath = pathname.replace(/^\/api\/tmdb/, "") || "/";
    const targetUrl = `${TMDB_ORIGIN}${upstreamPath}${url.search}`;

    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token}`);
    headers.delete("host");
    headers.delete("connection");

    const requestOptions: RequestInit & { duplex?: "half" } = {
      method: request.method,
      headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      const body = request.body;
      if (body) {
        requestOptions.body = body;
        requestOptions.duplex = "half";
      }
    }

    const upstreamStart = performance.now();
    const response = await fetch(targetUrl, requestOptions);
    const upstreamMs = performance.now() - upstreamStart;

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    const viaHop = `1.1 ${PROXY_VIA_PSEUDONYM}`;
    const existingVia = responseHeaders.get("Via");
    responseHeaders.set("Via", existingVia ? `${existingVia}, ${viaHop}` : viaHop);
    responseHeaders.set("Server", SERVER_IDENT);
    responseHeaders.set("X-Upstream-Response-Time", upstreamMs.toFixed(3));
    responseHeaders.set("X-Upstream-Status", String(response.status));

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error handling TMDB proxy request:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
