import { BaseModule } from "./base-module";
import type {
    User,
    UserFilterOptions,
    PaginationOptions,
    PagedResponse
} from "../types";
import { USER_FIELDS } from "../utils/fragments";

/**
 * User module for interacting with user-related endpoints
 */
export class UserModule extends BaseModule {
    /**
     * Get user by ID
     *
     * @param id User ID
     * @returns User object
     */
    public async getById(id: number): Promise<User> {
        const query = `
      query GetUser($id: Int) {
        User(id: $id) {
          ${USER_FIELDS}
        }
      }
    `;

        const response = await this.request<{ User: User }>(query, { id });
        return response.User;
    }

    /**
     * Get user by username
     *
     * @param name Username
     * @returns User object
     */
    public async getByName(name: string): Promise<User> {
        const query = `
      query GetUserByName($name: String) {
        User(name: $name) {
          ${USER_FIELDS}
        }
      }
    `;

        const response = await this.request<{ User: User }>(query, { name });
        return response.User;
    }

    /**
     * Search for users
     *
     * @param options Search options
     * @param pagination Pagination options
     * @returns Paged response of users
     */
    public async search(
        options: UserFilterOptions,
        pagination?: PaginationOptions
    ): Promise<PagedResponse<User>> {
        const query = `
      query SearchUsers($page: Int, $perPage: Int, $name: String, $isModerator: Boolean) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          users(name: $name, isModerator: $isModerator) {
            ${USER_FIELDS}
          }
        }
      }
    `;

        const variables = {
            ...this.createPaginationVariables(pagination),
            ...options
        };

        const response = await this.request(query, variables);
        return this.processPagedResponse<User>(response, "users");
    }

    /**
     * Get current authenticated user
     *
     * @returns Current user
     */
    public async getCurrentUser(): Promise<User> {
        const query = `
      query {
        Viewer {
          ${USER_FIELDS}
        }
      }
    `;

        const response = await this.request<{ Viewer: User }>(query);
        return response.Viewer;
    }
}
