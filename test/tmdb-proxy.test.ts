/**
 * e2e test for TMDB reverse proxy
 */
import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';

describe('TMDB Reverse Proxy - Search', () => {
  it('should search movies', async () => {
    const response = await fetch(
      `${BASE_URL}/3/search/movie?query=Jack+Reacher`
    );

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);

    // Verify the first result is a movie (has title, no name)
    expect(data.results[0]).toHaveProperty('title');
    expect(data.results[0]).not.toHaveProperty('name');
  });

  it('should search TV shows', async () => {
    const response = await fetch(
      `${BASE_URL}/3/search/tv?query=Breaking+Bad`
    );

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);

    // Verify the first result is a TV show (has name, no title)
    expect(data.results[0]).toHaveProperty('name');
    expect(data.results[0]).not.toHaveProperty('title');
  });
});

describe('TMDB Reverse Proxy - Details', () => {
  it('should get movie details', async () => {
    // Using Jack Reacher movie ID from search results (75780)
    const response = await fetch(
      `${BASE_URL}/3/movie/75780`
    );

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data).toHaveProperty('id', 75780);
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('overview');
  });

  it('should get TV show details', async () => {
    // Using Breaking Bad TV show ID (1396)
    const response = await fetch(
      `${BASE_URL}/3/tv/1396`
    );

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data).toHaveProperty('id', 1396);
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('overview');
  });
});
