import { NextRequest, NextResponse } from 'next/server';
import { getTMDBApiUrl } from '@/lib/tmdb';

const debug = true;

/**
 * POST /api/debug/ping
 * Pings the TMDB API base URL to test basic connectivity
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const url = getTMDBApiUrl('/');
    const token = process.env.TMDB_ACCESS_TOKEN;

    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (debug) {
      console.log("[TMDB Ping] Request:", {
        method: 'GET',
        url: url,
        headers: Object.fromEntries(new Headers(headers).entries()),
      });
    }

    // Use a simple HEAD request or GET to test connectivity
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const duration = Date.now() - startTime;

    if (debug) {
      console.log("[TMDB Ping] Response:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
        responseTime: `${duration}ms`,
        headers: Object.fromEntries(response.headers.entries()),
      });
    }

    const text = await response.text();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      duration: `${duration}ms`,
      responsePreview: text.substring(0, 200),
    });

  } catch (error) {
    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
      },
      { status: 500 }
    );
  }
}
