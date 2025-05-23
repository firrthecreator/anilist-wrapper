/**
 * AniList client configuration options
 */
export interface AniListClientOptions {
    /**
     * OAuth token for authenticated requests
     */
    token?: string;

    /**
     * Base URL for the AniList GraphQL API
     * @default 'https://graphql.anilist.co'
     */
    baseUrl?: string;
}

/**
 * Pagination options for list queries
 */
export interface PaginationOptions {
    /**
     * Page number
     * @default 1
     */
    page?: number;

    /**
     * Number of items per page
     * @default 20
     */
    perPage?: number;
}

/**
 * Response with pagination info
 */
export interface PagedResponse<T> {
    /**
     * Pagination information
     */
    pageInfo: {
        /**
         * Total number of items
         */
        total: number;

        /**
         * Current page number
         */
        currentPage: number;

        /**
         * Last page number
         */
        lastPage: number;

        /**
         * Whether there is a next page
         */
        hasNextPage: boolean;

        /**
         * Whether there is a previous page
         */
        hasPreviousPage: boolean;
    };

    /**
     * List of items
     */
    data: T[];
}
