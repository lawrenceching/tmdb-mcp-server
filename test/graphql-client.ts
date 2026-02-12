/**
 * The test client for the GraphQL API.
 * The API is implemented in the lib/graphql/schema/index.ts file.
 * And the server is served at "https://tmdb-mcp-server.imlc.me/api/graphql"
 *
 * Run this client by:
 * bun test/graphql-client.ts --host https://tmdb-mcp-server.imlc.me
 */

import { GraphQLClient, gql } from 'graphql-request';
import type {
  Movie,
  MovieBasic,
  TvShow,
  TvShowBasic,
  SearchResult,
} from '../lib/graphql/generated/graphql';

// GraphQL Query Definitions

const MOVIE_QUERY = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      id
      title
      original_title
      overview
      poster_path
      backdrop_path
      release_date
      vote_average
      vote_count
      popularity
      adult
      runtime
      status
      tagline
      genres {
        id
        name
      }
      credits {
        cast {
          id
          name
          original_name
          character
          profile_path
          order
          known_for_department
        }
        crew {
          id
          name
          original_name
          job
          department
          profile_path
        }
      }
      videos {
        results {
          id
          key
          name
          site
          type
          official
        }
      }
      images {
        backdrops {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
        posters {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
        logos {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
      }
      release_dates {
        results {
          iso_3166_1
          release_dates {
            certification
            release_date
            type
            notes
          }
        }
      }
      recommendations {
        page
        total_results
        total_pages
        results {
          id
          title
          poster_path
          backdrop_path
          release_date
          vote_average
        }
      }
      similar {
        page
        total_results
        total_pages
        results {
          id
          title
          poster_path
          backdrop_path
          release_date
          vote_average
        }
      }
    }
  }
`;

const MOVIE_BASIC_QUERY = gql`
  query MovieBasic($id: ID!) {
    movieBasic(id: $id) {
      id
      title
      original_title
      overview
      poster_path
      backdrop_path
      release_date
      vote_average
      vote_count
      popularity
      adult
      genre_ids
    }
  }
`;

const TV_QUERY = gql`
  query TVShow($id: ID!) {
    tv(id: $id) {
      id
      name
      original_name
      overview
      poster_path
      backdrop_path
      first_air_date
      last_air_date
      vote_average
      vote_count
      popularity
      genres {
        id
        name
      }
      seasons {
        id
        season_number
        name
        overview
        episode_count
        poster_path
        air_date
      }
      credits {
        cast {
          id
          name
          original_name
          character
          profile_path
          order
          known_for_department
        }
        crew {
          id
          name
          original_name
          job
          department
          profile_path
        }
      }
      videos {
        results {
          id
          key
          name
          site
          type
          official
        }
      }
      images {
        backdrops {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
        posters {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
        logos {
          file_path
          width
          height
          aspect_ratio
          vote_average
          vote_count
        }
      }
      recommendations {
        page
        total_results
        total_pages
        results {
          id
          name
          poster_path
          backdrop_path
          first_air_date
          vote_average
        }
      }
      similar {
        page
        total_results
        total_pages
        results {
          id
          name
          poster_path
          backdrop_path
          first_air_date
          vote_average
        }
      }
      content_ratings {
        results {
          iso_3166_1
          rating
        }
      }
    }
  }
`;

const TV_BASIC_QUERY = gql`
  query TVShowBasic($id: ID!) {
    tvBasic(id: $id) {
      id
      name
      original_name
      overview
      poster_path
      backdrop_path
      first_air_date
      last_air_date
      vote_average
      vote_count
      popularity
      genre_ids
    }
  }
`;

const SEARCH_MOVIE_QUERY = gql`
  query SearchMovie($query: String!, $page: Int = 1) {
    searchMovie(query: $query, page: $page) {
      page
      total_results
      total_pages
      results {
        id
        media_type
        title
        original_title
        overview
        poster_path
        backdrop_path
        vote_average
        vote_count
        popularity
        adult
        genre_ids
        release_date
      }
    }
  }
`;

const SEARCH_TV_QUERY = gql`
  query SearchTV($query: String!, $page: Int = 1) {
    searchTV(query: $query, page: $page) {
      page
      total_results
      total_pages
      results {
        id
        media_type
        name
        original_name
        overview
        poster_path
        backdrop_path
        vote_average
        vote_count
        popularity
        adult
        genre_ids
        first_air_date
      }
    }
  }
`;

const SEARCH_MULTI_QUERY = gql`
  query SearchMulti($query: String!, $page: Int = 1) {
    searchMulti(query: $query, page: $page) {
      ... on Movie {
        id
        title
        overview
        poster_path
        backdrop_path
        release_date
        vote_average
        media_type
      }
      ... on TvShow {
        id
        name
        overview
        poster_path
        backdrop_path
        first_air_date
        vote_average
        media_type
      }
    }
  }
`;

// Type definitions for query arguments
interface MovieArgs {
  id: string;
}

interface MovieBasicArgs {
  id: string;
}

interface TvArgs {
  id: string;
}

interface TvBasicArgs {
  id: string;
}

interface SearchMovieArgs {
  query: string;
  page?: number;
}

interface SearchTVArgs {
  query: string;
  page?: number;
}

interface SearchMultiArgs {
  query: string;
  page?: number;
}

// TMDB GraphQL Client Class
export class TMDBGraphQLClient {
  private client: GraphQLClient;

  constructor(endpoint: string = 'https://tmdb-mcp-server.imlc.me/api/graphql') {
    this.client = new GraphQLClient(endpoint);
  }

  /**
   * Execute a raw GraphQL query with variables
   */
  async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    try {
      return await this.client.request<T>(query, variables);
    } catch (error) {
      console.error('GraphQL Request Error:', error);
      throw error;
    }
  }

  /**
   * Fetch full movie details
   */
  async getMovie(id: string): Promise<Movie> {
    const data = await this.request<{ movie: Movie }>(MOVIE_QUERY, { id });
    return data.movie;
  }

  /**
   * Fetch basic movie information
   */
  async getMovieBasic(id: string): Promise<MovieBasic> {
    const data = await this.request<{ movieBasic: MovieBasic }>(MOVIE_BASIC_QUERY, { id });
    return data.movieBasic;
  }

  /**
   * Fetch full TV show details
   */
  async getTV(id: string): Promise<TvShow> {
    const data = await this.request<{ tv: TvShow }>(TV_QUERY, { id });
    return data.tv;
  }

  /**
   * Fetch basic TV show information
   */
  async getTVBasic(id: string): Promise<TvShowBasic> {
    const data = await this.request<{ tvBasic: TvShowBasic }>(TV_BASIC_QUERY, { id });
    return data.tvBasic;
  }

  /**
   * Search for movies
   */
  async searchMovies(query: string, page: number = 1): Promise<SearchResult> {
    const data = await this.request<{ searchMovie: SearchResult }>(SEARCH_MOVIE_QUERY, { query, page });
    return data.searchMovie;
  }

  /**
   * Search for TV shows
   */
  async searchTVShows(query: string, page: number = 1): Promise<SearchResult> {
    const data = await this.request<{ searchTV: SearchResult }>(SEARCH_TV_QUERY, { query, page });
    return data.searchTV;
  }

  /**
   * Search for movies and TV shows
   */
  async searchMulti(query: string, page: number = 1): Promise<Array<Movie | TvShow>> {
    const data = await this.request<{ searchMulti: Array<Movie | TvShow> }>(SEARCH_MULTI_QUERY, { query, page });
    return data.searchMulti;
  }
}

// CLI Execution
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  let endpoint = 'https://tmdb-mcp-server.imlc.me/api/graphql';
  let customQuery: string | null = null;
  let customVariables: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--host':
      case '-h':
        if (i + 1 < args.length) {
          endpoint = args[i + 1];
          i++;
        }
        break;
      case '--data':
      case '-d':
        if (i + 1 < args.length) {
          customQuery = args[i + 1];
          i++;
        }
        break;
      case '--variables':
      case '-v':
        if (i + 1 < args.length) {
          customVariables = args[i + 1];
          i++;
        }
        break;
      case '--help':
      case '-?':
        printHelp();
        process.exit(0);
        break;
    }
  }

  // If custom query provided, execute it and exit
  if (customQuery) {
    await executeCustomQuery(endpoint, customQuery, customVariables);
    return;
  }

  // Default test mode
  console.log('TMDB GraphQL API Test Client');
  console.log('============================');
  console.log(`Endpoint: ${endpoint}`);
  console.log('');
  console.log('Usage:');
  console.log('  bun test/graphql-client.ts                    # Run default tests');
  console.log('  bun test/graphql-client.ts --host <url>       # Specify custom endpoint');
  console.log('  bun test/graphql-client.ts -d "<query>"       # Execute custom query');
  console.log('  bun test/graphql-client.ts -d "<query>" -v \'{"id":"123"}\'  # With variables');
  console.log('');

  const client = new TMDBGraphQLClient(endpoint);

  try {
    // Test 1: Fetch a movie (Inception - ID: 27205)
    console.log('Test 1: Fetching movie "Inception" (ID: 27205)...');
    const movie = await client.getMovie('27205');
    console.log(`Title: ${movie.title}`);
    console.log(`Release Date: ${movie.release_date}`);
    console.log(`Rating: ${movie.vote_average}/10`);
    console.log(`Runtime: ${movie.runtime} minutes`);
    console.log(`Genres: ${movie.genres?.map(g => g.name).join(', ')}`);
    console.log('');

    // Test 2: Search for movies
    console.log('Test 2: Searching for "Batman"...');
    const searchResults = await client.searchMovies('Batman', 1);
    console.log(`Found ${searchResults.total_results} results (showing first 5):`);
    searchResults.results.slice(0, 5).forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.title} (${result.release_date?.split('-')[0] || 'N/A'}) - Rating: ${result.vote_average}`);
    });
    console.log('');

    // Test 3: Search for TV shows
    console.log('Test 3: Searching for "Breaking Bad"...');
    const tvResults = await client.searchTVShows('Breaking Bad', 1);
    console.log(`Found ${tvResults.total_results} results:`);
    tvResults.results.slice(0, 3).forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.name} (${result.first_air_date?.split('-')[0] || 'N/A'}) - Rating: ${result.vote_average}`);
    });
    console.log('');

    // Test 4: Multi-search
    console.log('Test 4: Multi-search for "Spider"...');
    const multiResults = await client.searchMulti('Spider', 1);
    console.log(`Found ${multiResults.length} results (showing first 5):`);
    multiResults.slice(0, 5).forEach((result, index) => {
      const mediaType = 'title' in result ? 'Movie' : 'TV';
      const name = 'title' in result ? result.title : result.name;
      const date = 'release_date' in result ? result.release_date : 'first_air_date' in result ? result.first_air_date : null;
      console.log(`  ${index + 1}. [${mediaType}] ${name} (${date?.split('-')[0] || 'N/A'})`);
    });
    console.log('');

    // Test 5: Fetch TV show (Breaking Bad - ID: 1396)
    console.log('Test 5: Fetching TV show "Breaking Bad" (ID: 1396)...');
    const tv = await client.getTV('1396');
    console.log(`Title: ${tv.name}`);
    console.log(`First Air Date: ${tv.first_air_date}`);
    console.log(`Rating: ${tv.vote_average}/10`);
    console.log(`Seasons: ${tv.seasons?.length}`);
    console.log('');

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
TMDB GraphQL API Test Client
============================

Usage:
  bun test/graphql-client.ts [options] [-d "<query>"]

Options:
  --host, -h <url>    GraphQL endpoint URL (default: https://tmdb-mcp-server.imlc.me/api/graphql)
  --data, -d <query>  Execute a custom GraphQL query
  --variables, -v <json>  Variables as JSON string (used with -d)
  --help, -?          Show this help message

Examples:
  # Run default test suite
  bun test/graphql-client.ts

  # Custom endpoint
  bun test/graphql-client.ts --host http://localhost:3000/api/graphql

  # Execute custom query
  bun test/graphql-client.ts -d 'query { movie(id: "27205") { title release_date } }'

  # Execute query with variables
  bun test/graphql-client.ts -d 'query($id: ID!) { movie(id: $id) { title } }' -v '{"id":"27205"}'
`);
}

async function executeCustomQuery(endpoint: string, query: string, variablesJson: string | null) {
  const client = new TMDBGraphQLClient(endpoint);

  try {
    let variables: Record<string, unknown> | undefined;

    if (variablesJson) {
      try {
        variables = JSON.parse(variablesJson);
      } catch (e) {
        console.error('Error parsing variables JSON:', e);
        process.exit(1);
      }
    }

    console.log('Executing custom GraphQL query...');
    console.log(`Endpoint: ${endpoint}`);
    console.log('');

    if (variables) {
      console.log('Variables:', JSON.stringify(variables, null, 2));
      console.log('');
    }

    const result = await client.request(query, variables);
    console.log('Result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Query execution failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
main().catch(console.error);

export { MOVIE_QUERY, MOVIE_BASIC_QUERY, TV_QUERY, TV_BASIC_QUERY, SEARCH_MOVIE_QUERY, SEARCH_TV_QUERY, SEARCH_MULTI_QUERY };
