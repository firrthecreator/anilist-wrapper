import { BaseModule } from "./base-module";
import type {
    Character,
    CharacterFilterOptions,
    PaginationOptions,
    PagedResponse
} from "../types";
import { CHARACTER_FIELDS } from "../utils/fragments";

/**
 * Character module for interacting with character-related endpoints
 */
export class CharacterModule extends BaseModule {
    /**
     * Get character by ID
     *
     * @param id Character ID
     * @returns Character object
     */
    public async getById(id: number): Promise<Character> {
        const query = `
      query GetCharacter($id: Int) {
        Character(id: $id) {
          ${CHARACTER_FIELDS}
        }
      }
    `;

        const response = await this.request<{ Character: Character }>(query, {
            id
        });
        return response.Character;
    }

    /**
     * Search for characters
     *
     * @param options Search options
     * @param pagination Pagination options
     * @returns Paged response of characters
     */
    public async search(
        options: CharacterFilterOptions,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Character>> {
        // Build the query with the correct filter arguments
        const query = `
      query SearchCharacters($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          characters(search: $search) {
            ${CHARACTER_FIELDS}
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            search: options.search
        };

        const response = await this.request(query, variables);
        return this.processPagedResponse<Character>(response, "characters");
    }

    /**
     * Get popular characters
     *
     * @param pagination Pagination options
     * @returns Paged response of popular characters
     */
    public async getPopular(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Character>> {
        const query = `
      query PopularCharacters($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          characters(sort: FAVOURITES_DESC) {
            ${CHARACTER_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Character>(response, "characters");
    }

    /**
     * Get characters for a specific anime or manga
     *
     * @param mediaId Media ID
     * @param pagination Pagination options
     * @returns Paged response of characters
     */
    public async getByMedia(
        mediaId: number,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Character>> {
        // For getting characters by media, we need to query the media first and then get its characters
        const query = `
      query CharactersByMedia($mediaId: Int, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(id: $mediaId) {
            characters {
              nodes {
                ${CHARACTER_FIELDS}
              }
            }
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            mediaId
        };

        const response = await this.request(query, variables);

        // Process the response differently since the structure is different
        const { Page } = response;
        const characters = Page.media[0]?.characters?.nodes || [];

        return {
            pageInfo: Page.pageInfo,
            data: characters
        };
    }
}
