import { BaseModule } from "./base-module";
import type {
    Anime,
    Manga,
    Character,
    Staff,
    User,
    PaginationOptions,
    PagedResponse
} from "../types";
import {
    ANIME_FIELDS,
    MANGA_FIELDS,
    CHARACTER_FIELDS,
    STAFF_FIELDS,
    USER_FIELDS
} from "../utils/fragments";

/**
 * Search module for general search functionality
 */
export class SearchModule extends BaseModule {
    /**
     * Search for all types of content
     *
     * @param query Search query
     * @param pagination Pagination options
     * @returns Object containing paged responses for each content type
     */
    public async searchAll(
        query: string,
        pagination?: PaginationOptions
    ): Promise<{
        anime: PagedResponse<Anime>;
        manga: PagedResponse<Manga>;
        characters: PagedResponse<Character>;
        staff: PagedResponse<Staff>;
        users: PagedResponse<User>;
    }> {
        const gqlQuery = `
      query SearchAll($query: String, $page: Int, $perPage: Int) {
        animeResults: Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, search: $query) {
            ${ANIME_FIELDS}
          }
        }
        mangaResults: Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: MANGA, search: $query) {
            ${MANGA_FIELDS}
          }
        }
        characterResults: Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          characters(search: $query) {
            ${CHARACTER_FIELDS}
          }
        }
        staffResults: Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          staff(search: $query) {
            ${STAFF_FIELDS}
          }
        }
        userResults: Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          users(search: $query) {
            ${USER_FIELDS}
          }
        }
      }
    `;

        const variables = {
            query,
            ...this.createPaginationVariables(pagination)
        };

        const response = await this.request(gqlQuery, variables);

        return {
            anime: this.processPagedResponse<Anime>(
                response.animeResults,
                "media"
            ),
            manga: this.processPagedResponse<Manga>(
                response.mangaResults,
                "media"
            ),
            characters: this.processPagedResponse<Character>(
                response.characterResults,
                "characters"
            ),
            staff: this.processPagedResponse<Staff>(
                response.staffResults,
                "staff"
            ),
            users: this.processPagedResponse<User>(
                response.userResults,
                "users"
            )
        };
    }
}
