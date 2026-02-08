import { fetchFromTMDB } from '@/lib/tmdb';

export const tvResolvers = {
  Query: {
    tv: async (_: unknown, { id }: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch TV show: ${response.status}`);
      }
      return response.json();
    },
    
    tvBasic: async (_: unknown, { id }: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch TV basic: ${response.status}`);
      }
      return response.json();
    },
  },
  
  TVShow: {
    genres: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}`);
      const data = await response.json();
      return data.genres || [];
    },
    
    credits: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/credits`);
      if (!response.ok) {
        return { cast: [], crew: [] };
      }
      return response.json();
    },
    
    videos: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/videos`);
      if (!response.ok) {
        return { results: [] };
      }
      return response.json();
    },
    
    images: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/images`);
      if (!response.ok) {
        return { backdrops: [], posters: [], logos: [] };
      }
      return response.json();
    },
    
    recommendations: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/recommendations`);
      if (!response.ok) {
        return { page: 1, total_results: 0, total_pages: 1, results: [] };
      }
      return response.json();
    },
    
    similar: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/similar`);
      if (!response.ok) {
        return { page: 1, total_results: 0, total_pages: 1, results: [] };
      }
      return response.json();
    },
    
    content_ratings: async (parent: { id: string }) => {
      const response = await fetchFromTMDB(`/tv/${parent.id}/content_ratings`);
      if (!response.ok) {
        return { results: [] };
      }
      return response.json();
    },
  },
};
