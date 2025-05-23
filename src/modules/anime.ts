import { BaseModule } from "./base-module";
import type {
    Anime,
    AnimeFilterOptions,
    PaginationOptions,
    PagedResponse
} from "../types";
import { ANIME_FIELDS } from "../utils/fragments";

/**
 * Anime module for interacting with anime-related endpoints
 */
export class AnimeModule extends BaseModule {
    /**
     * Get anime by ID
     *
     * @param id Anime ID
     * @returns Anime object
     */
    public async getById(id: number): Promise<Anime> {
        const query = `
      query GetAnime($id: Int) {
        Media(id: $id, type: ANIME) {
          ${ANIME_FIELDS}
        }
      }
    `;

        const response = await this.request<{ Media: Anime }>(query, { id });
        return response.Media;
    }

    /**
     * Search for anime
     *
     * @param options Search options
     * @param pagination Pagination options
     * @returns Paged response of anime
     */
    public async search(
        options: AnimeFilterOptions,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Anime>> {
        const query = `
      query SearchAnime($page: Int, $perPage: Int, $search: String, $format: MediaFormat, $status: MediaStatus, $season: MediaSeason, $seasonYear: Int, $genres: [String], $tags: [String], $minimumScore: Int, $episodes: Int, $duration: Int, $source: MediaSource) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, search: $search, format: $format, status: $status, season: $season, seasonYear: $seasonYear, genre_in: $genres, tag_in: $tags, averageScore_greater: $minimumScore, episodes: $episodes, duration: $duration, source: $source) {
            ${ANIME_FIELDS}
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            ...options
        };

        const response = await this.request(query, variables);
        return this.processPagedResponse<Anime>(response, "media");
    }

    /**
     * Get trending anime
     *
     * @param pagination Pagination options
     * @returns Paged response of trending anime
     */
    public async getTrending(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Anime>> {
        const query = `
      query TrendingAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, sort: TRENDING_DESC) {
            ${ANIME_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Anime>(response, "media");
    }

    /**
     * Get popular anime
     *
     * @param pagination Pagination options
     * @returns Paged response of popular anime
     */
    public async getPopular(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Anime>> {
        const query = `
      query PopularAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, sort: POPULARITY_DESC) {
            ${ANIME_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Anime>(response, "media");
    }

    /**
     * Get upcoming anime
     *
     * @param pagination Pagination options
     * @returns Paged response of upcoming anime
     */
    public async getUpcoming(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Anime>> {
        const query = `
      query UpcomingAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
            ${ANIME_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Anime>(response, "media");
    }

    /**
     * Get airing anime
     *
     * @param pagination Pagination options
     * @returns Paged response of airing anime
     */
    public async getAiring(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Anime>> {
        const query = `
      query AiringAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
            ${ANIME_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Anime>(response, "media");
    }
}
