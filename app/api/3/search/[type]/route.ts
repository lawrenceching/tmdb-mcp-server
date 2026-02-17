import { NextRequest, NextResponse } from 'next/server';
import { getTMDBApiUrl, getTMDBHeaders } from '@/lib/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  // Validate type - only allow movie and tv search
  if (type !== 'movie' && type !== 'tv') {
    return NextResponse.json(
      { error: 'Invalid type. Must be either "movie" or "tv"' },
      { status: 400 }
    );
  }

  // Build the target TMDB URL with all query parameters
  const targetUrl = getTMDBApiUrl(`/search/${type}`);
  const url = new URL(targetUrl);

  // Forward all query parameters from the original request
  const searchParams = request.nextUrl.searchParams;
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    // Make the request to TMDB with the access token injected
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
    console.error('Error in search proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
