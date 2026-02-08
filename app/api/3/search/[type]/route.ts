import { NextRequest, NextResponse } from 'next/server';
import { fetchFromTMDB } from '@/lib/tmdb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  if (type !== 'movie' && type !== 'tv') {
    return NextResponse.json(
      { error: 'Invalid type. Must be either "movie" or "tv"' },
      { status: 400 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing required parameter: query' },
      { status: 400 }
    );
  }

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'query') {
        queryParams.append(key, value);
      }
    }

    const response = await fetchFromTMDB(
      `/search/${type}?${queryParams.toString()}`
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
    console.error('Error in search endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
