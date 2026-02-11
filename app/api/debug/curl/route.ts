import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/lib/tmdb';

/**
 * POST /api/debug/curl
 * Tests connectivity to TMDB API by making an actual request
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Test the TMDB API by fetching popular movies (a lightweight endpoint)
    const response = await fetchFromTMDB('/movie/popular?page=1');

    const duration = Date.now() - startTime;

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
