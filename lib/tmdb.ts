const TMDB_API_BASE = 'https://api.themoviedb.org/3';

export function getTMDBApiUrl(path: string): string {
  return `${TMDB_API_BASE}${path}`;
}

export function logHttpRequest(method: string, path: string, startTime: number, duration?: number): void {
  const timestamp = new Date().toISOString();
  const durationStr = duration !== undefined ? ` | Duration: ${duration.toFixed(2)}ms` : '';
  console.log(`[${timestamp}] ${method} ${path}${durationStr}`);
}

export async function fetchFromTMDB(
  path: string,
  method: string = 'GET',
  options?: RequestInit
): Promise<Response> {
  const startTime = performance.now();
  const url = getTMDBApiUrl(path);

  logHttpRequest(method, path, startTime);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const duration = performance.now() - startTime;
    logHttpRequest(method, path, startTime, duration);

    return response;
  } catch (error) {
    const duration = performance.now() - startTime;
    logHttpRequest(method, path, startTime, duration);
    throw error;
  }
}

export interface SearchMoviesParams {
  query: string;
  language?: string;
  page?: number;
  include_adult?: boolean;
}

export async function searchMovies(params: SearchMoviesParams): Promise<any> {
  const queryParams = new URLSearchParams({
    query: params.query,
    language: params.language || 'en-US',
    page: String(params.page || 1),
    include_adult: String(params.include_adult || false),
  });

  const response = await fetchFromTMDB(`/search/movie?${queryParams.toString()}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TMDB API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}
