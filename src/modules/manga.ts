import { BaseModule } from "./base-module";
import type {
    Manga,
    MangaFilterOptions,
    PaginationOptions,
    PagedResponse
} from "../types";
import { MANGA_FIELDS } from "../utils/fragments";

/**
 * Manga module for interacting with manga-related endpoints
 */
export class MangaModule extends BaseModule {
    /**
     * Get manga by ID
     *
     * @param id Manga ID
     * @returns Manga object
     */
    public async getById(id: number): Promise<Manga> {
        const query = `
      query GetManga($id: Int) {
        Media(id: $id, type: MANGA) {
          ${MANGA_FIELDS}
        }
      }
    `;

        const response = await this.request<{ Media: Manga }>(query, { id });
        return response.Media;
    }

    /**
     * Search for manga
     *
     * @param options Search options
     * @param pagination Pagination options
     * @returns Paged response of manga
     */
    public async search(
        options: MangaFilterOptions,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Manga>> {
        const query = `
      query SearchManga($page: Int, $perPage: Int, $search: String, $format: MediaFormat, $status: MediaStatus, $genres: [String], $tags: [String], $minimumScore: Int, $chapters: Int, $volumes: Int, $source: MediaSource) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, search: $search, format: $format, status: $status, genre_in: $genres, tag_in: $tags, averageScore_greater: $minimumScore, chapters: $chapters, volumes: $volumes, source: $source) {
            ${MANGA_FIELDS}
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            ...options
        };

        const response = await this.request(query, variables);
        return this.processPagedResponse<Manga>(response, "media");
    }

    /**
     * Get trending manga
     *
     * @param pagination Pagination options
     * @returns Paged response of trending manga
     */
    public async getTrending(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Manga>> {
        const query = `
      query TrendingManga($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, sort: TRENDING_DESC) {
            ${MANGA_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Manga>(response, "media");
    }

    /**
     * Get popular manga
     *
     * @param pagination Pagination options
     * @returns Paged response of popular manga
     */
    public async getPopular(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Manga>> {
        const query = `
      query PopularManga($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, sort: POPULARITY_DESC) {
            ${MANGA_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Manga>(response, "media");
    }

    /**
     * Get upcoming manga
     *
     * @param pagination Pagination options
     * @returns Paged response of upcoming manga
     */
    public async getUpcoming(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Manga>> {
        const query = `
      query UpcomingManga($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
            ${MANGA_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Manga>(response, "media");
    }

    /**
     * Get releasing manga
     *
     * @param pagination Pagination options
     * @returns Paged response of releasing manga
     */
    public async getReleasing(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Manga>> {
        const query = `
      query ReleasingManga($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, status: RELEASING, sort: POPULARITY_DESC) {
            ${MANGA_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Manga>(response, "media");
    }
}
