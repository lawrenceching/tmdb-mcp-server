import { fetchFromTMDB } from '@/lib/tmdb';

export const movieResolvers = {
  Query: {
    movie: async (_: unknown, { id }: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie: ${response.status}`);
      }
      return response.json();
    },
    
    movieBasic: async (_: unknown, { id }: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie basic: ${response.status}`);
      }
      return response.json();
    },
  },
  
  Movie: {
    genres: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}`);
      const data = await response.json();
      return data.genres || [];
    },
    
    credits: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/credits`);
      if (!response.ok) {
        return { cast: [], crew: [] };
      }
      return response.json();
    },
    
    videos: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/videos`);
      if (!response.ok) {
        return { results: [] };
      }
      return response.json();
    },
    
    images: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/images`);
      if (!response.ok) {
        return { backdrops: [], posters: [], logos: [] };
      }
      return response.json();
    },
    
    release_dates: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/release_dates`);
      if (!response.ok) {
        return { results: [] };
      }
      return response.json();
    },
    
    recommendations: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/recommendations`);
      if (!response.ok) {
        return { page: 1, total_results: 0, total_pages: 1, results: [] };
      }
      return response.json();
    },
    
    similar: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/movie/${parent.id}/similar`);
      if (!response.ok) {
        return { page: 1, total_results: 0, total_pages: 1, results: [] };
      }
      return response.json();
    },
  },
};
