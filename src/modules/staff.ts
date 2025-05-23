import { BaseModule } from "./base-module";
import type {
    Staff,
    StaffFilterOptions,
    PaginationOptions,
    PagedResponse
} from "../types";
import { STAFF_FIELDS } from "../utils/fragments";

/**
 * Staff module for interacting with staff-related endpoints
 */
export class StaffModule extends BaseModule {
    /**
     * Get staff by ID
     *
     * @param id Staff ID
     * @returns Staff object
     */
    public async getById(id: number): Promise<Staff> {
        const query = `
      query GetStaff($id: Int) {
        Staff(id: $id) {
          ${STAFF_FIELDS}
        }
      }
    `;

        const response = await this.request<{ Staff: Staff }>(query, { id });
        return response.Staff;
    }

    /**
     * Search for staff
     *
     * @param options Search options
     * @param pagination Pagination options
     * @returns Paged response of staff
     */
    public async search(
        options: StaffFilterOptions,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Staff>> {
        const query = `
      query SearchStaff($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          staff(search: $search) {
            ${STAFF_FIELDS}
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            search: options.search
        };

        const response = await this.request(query, variables);
        return this.processPagedResponse<Staff>(response, "staff");
    }

    /**
     * Get popular staff
     *
     * @param pagination Pagination options
     * @returns Paged response of popular staff
     */
    public async getPopular(
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Staff>> {
        const query = `
      query PopularStaff($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          staff(sort: FAVOURITES_DESC) {
            ${STAFF_FIELDS}
          }
        }
      }
    `;

        const variables = this.createPaginationVariables(pagination);
        const response = await this.request(query, variables);
        return this.processPagedResponse<Staff>(response, "staff");
    }

    /**
     * Get staff for a specific anime or manga
     *
     * @param mediaId Media ID
     * @param pagination Pagination options
     * @returns Paged response of staff
     */
    public async getByMedia(
        mediaId: number,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<Staff>> {
        // For getting staff by media, we need to query the media first and then get its staff
        const query = `
      query StaffByMedia($mediaId: Int, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(id: $mediaId) {
            staff {
              nodes {
                ${STAFF_FIELDS}
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
        const staff = Page.media[0]?.staff?.nodes || [];

        return {
            pageInfo: Page.pageInfo,
            data: staff
        };
    }
}
