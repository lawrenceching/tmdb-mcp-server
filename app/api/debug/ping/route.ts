import { NextRequest, NextResponse } from 'next/server';
import { getTMDBApiUrl } from '@/lib/tmdb';

/**
 * POST /api/debug/ping
 * Pings the TMDB API base URL to test basic connectivity
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const url = getTMDBApiUrl('/');

    // Use a simple HEAD request or GET to test connectivity
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const duration = Date.now() - startTime;
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
