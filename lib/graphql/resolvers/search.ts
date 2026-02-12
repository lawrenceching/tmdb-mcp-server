import { fetchFromTMDB } from '@/lib/tmdb';

export const searchResolvers = {
  Query: {
    searchMovie: async (_: unknown, { query, page, language }: { query: string; page?: number; language?: string }) => {
      const params = new URLSearchParams({
        query,
        page: String(page || 1),
      });

      if (language) {
        params.set('language', language);
      }

      const response = await fetchFromTMDB(`/search/movie?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      return response.json();
    },

    searchTV: async (_: unknown, { query, page, language }: { query: string; page?: number; language?: string }) => {
      const params = new URLSearchParams({
        query,
        page: String(page || 1),
      });

      if (language) {
        params.set('language', language);
      }

      const response = await fetchFromTMDB(`/search/tv?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      return response.json();
    },

    searchMulti: async (_: unknown, { query, page }: { query: string; page?: number }) => {
      const params = new URLSearchParams({
        query,
        page: String(page || 1),
      });

      const response = await fetchFromTMDB(`/search/multi?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Multi-search failed: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    },
  },
};
