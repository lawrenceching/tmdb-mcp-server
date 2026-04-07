import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB, getTMDBApiUrl } from '@/lib/tmdb';

const debug = true;

/**
 * POST /api/debug/curl
 * Tests connectivity to TMDB API by making an actual request
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const path = '/movie/popular?page=1';
  const url = getTMDBApiUrl(path);
  const token = process.env.TMDB_ACCESS_TOKEN;

  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  if (debug) {
    console.log("[TMDB Curl] Request:", {
      method: 'GET',
      url: url,
      headers: Object.fromEntries(new Headers(headers).entries()),
    });
  }

  try {
    // Test the TMDB API by fetching popular movies (a lightweight endpoint)
    const response = await fetchFromTMDB('/movie/popular?page=1');

    const duration = Date.now() - startTime;

    if (debug) {
      console.log("[TMDB Curl] Response:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
        responseTime: `${duration}ms`,
        headers: Object.fromEntries(response.headers.entries()),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          duration: `${duration}ms`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      duration: `${duration}ms`,
      data: {
        page: data.page,
        results: data.results?.length || 0,
        total_pages: data.total_pages,
        total_results: data.total_results,
        first_movie: data.results?.[0]?.title || 'N/A',
      },
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
