import { NextRequest, NextResponse } from "next/server";

const debug = true;

const TMDB_ORIGIN = "https://api.themoviedb.org/3";
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
  const url = new URL(request.url);

  try {
    const token = process.env.TMDB_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "TMDB_ACCESS_TOKEN is not configured" },
        { status: 503 }
      );
    }

    const pathname = url.pathname;
    const upstreamPath = pathname.replace(/^\/api\/tmdb/, "") || "/";
    const targetUrl = `${TMDB_ORIGIN}${upstreamPath}${url.search}`;

    // Only send necessary headers - don't forward all incoming headers
    // TMDB rejects requests with too many proxy/infrastructure headers
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");
    // Forward content-type for requests with body
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

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

    if (debug) {
      console.log("[TMDB Proxy] Request:", {
        method: request.method,
        url: targetUrl,
        headers: Object.fromEntries(headers.entries()),
      });
    }

    const upstreamStart = performance.now();
    const response = await fetch(targetUrl, requestOptions);
    const upstreamMs = performance.now() - upstreamStart;

    if (debug) {
      console.log("[TMDB Proxy] Response:", {
        status: response.status,
        statusText: response.statusText,
        url: targetUrl,
        responseTime: `${upstreamMs.toFixed(3)}ms`,
        headers: Object.fromEntries(response.headers.entries()),
      });
    }

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

    const err = error as Error;
    const cause = (err as NodeJS.ErrnoException)?.cause as Error | undefined;

    // Build RFC 7807 Problem Details response
    const problemDetails = {
      type: "https://httpwg.org/http-spec/rfc7807.html",
      title: "Upstream Connection Failed",
      status: 502,
      detail: cause?.message || err.message || "Unknown error",
      instance: url.pathname,
      upstream: {
        host: TMDB_ORIGIN,
        error: {
          code: (err as NodeJS.ErrnoException)?.code || "UNKNOWN",
          name: cause?.name || err.name,
        },
      },
    };

    return NextResponse.json(problemDetails, {
      status: 502,
      headers: { "Content-Type": "application/problem+json" },
    });
  }
}
