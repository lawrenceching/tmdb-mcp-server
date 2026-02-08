import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/lib/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; tmdbid: string }> }
) {
  const { type, tmdbid } = await params;

  if (type !== 'movie' && type !== 'tv') {
    return NextResponse.json(
      { error: 'Invalid type. Must be either "movie" or "tv"' },
      { status: 400 }
    );
  }

  const tmdbIdNumber = parseInt(tmdbid, 10);
  if (isNaN(tmdbIdNumber) || tmdbIdNumber <= 0) {
    return NextResponse.json(
      { error: 'Invalid TMDB ID. Must be a positive integer' },
      { status: 400 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = searchParams.toString();

    const response = await fetchFromTMDB(
      `/${type}/${tmdbid}${queryParams ? `?${queryParams}` : ''}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData || 'TMDB API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in details endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
