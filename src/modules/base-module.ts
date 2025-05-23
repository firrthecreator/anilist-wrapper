import type { GraphQLClient } from "graphql-request";
import type { PaginationOptions, PagedResponse } from "../types";

/**
 * Base module for all API modules
 */
export abstract class BaseModule {
    protected client: GraphQLClient;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    /**
     * Execute a GraphQL query
     *
     * @param query GraphQL query
     * @param variables Query variables
     * @returns Query result
     */
    protected async request<T = any>(
        query: string,
        variables?: Record<string, any>
    ): Promise<T> {
        try {
            return await this.client.request<T>(query, variables);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Process a paged response
     *
     * @param response Raw API response
     * @param dataKey Key to extract data from
     * @returns Processed paged response
     */
    protected processPagedResponse<T>(
        response: any,
        dataKey: string
    ): PagedResponse<T> {
        const { Page } = response;

        return {
            pageInfo: Page.pageInfo,
            data: Page[dataKey]
        };
    }

    /**
     * Create pagination variables
     *
     * @param options Pagination options
     * @returns Pagination variables
     */
    protected createPaginationVariables(
        options?: PaginationOptions
    ): Record<string, any> {
        return {
            page: options?.page || 1,
            perPage: options?.perPage || 20
        };
    }

    /**
     * Handle GraphQL errors
     */
    private handleError(error: any): Error {
        // If it's already an Error instance, just return it
        if (error instanceof Error) {
            return error;
        }

        // Handle GraphQL errors
        if (error.response?.errors) {
            const message = error.response.errors
                .map((e: any) => e.message)
                .join(", ");
            return new Error(`GraphQL Error: ${message}`);
        }

        // Handle network errors
        if (error.message) {
            return new Error(`Network Error: ${error.message}`);
        }

        // Fallback
        return new Error("Unknown error occurred");
    }
}
