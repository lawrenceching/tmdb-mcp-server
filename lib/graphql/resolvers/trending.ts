import { fetchFromTMDB } from '@/lib/tmdb';

export const trendingResolvers = {
  Query: {
    trending: async (_: unknown, { mediaType, timeWindow }: { mediaType?: string; timeWindow?: string }) => {
      const response = await fetchFromTMDB(`/trending/${mediaType || 'all'}/${timeWindow || 'day'}`);
      if (!response.ok) {
        throw new Error(`Trending fetch failed: ${response.status}`);
      }
      return response.json();
    },
  },
};
