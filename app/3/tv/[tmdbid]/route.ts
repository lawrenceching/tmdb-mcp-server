import { NextRequest, NextResponse } from 'next/server';
import { getTMDBApiUrl, getTMDBHeaders } from '@/lib/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tmdbid: string }> }
) {
  const { tmdbid } = await params;

  const tmdbIdNumber = parseInt(tmdbid, 10);
  if (isNaN(tmdbIdNumber) || tmdbIdNumber <= 0) {
    return NextResponse.json(
      { error: 'Invalid TMDB ID. Must be a positive integer' },
      { status: 400 }
    );
  }

  // Build the target TMDB URL with all query parameters
  const targetUrl = getTMDBApiUrl(`/tv/${tmdbid}`);
  const url = new URL(targetUrl);

  // Forward all query parameters from the original request
  const searchParams = request.nextUrl.searchParams;
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getTMDBHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.status_message || 'TMDB API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in TV details proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
