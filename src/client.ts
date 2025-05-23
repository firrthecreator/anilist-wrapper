import { GraphQLClient } from "graphql-request";
import { AnimeModule } from "./modules/anime";
import { MangaModule } from "./modules/manga";
import { CharacterModule } from "./modules/character";
import { UserModule } from "./modules/user";
import { StaffModule } from "./modules/staff";
import { SearchModule } from "./modules/search";
import type { AniListClientOptions } from "./types";

/**
 * AniList API client
 *
 * Main client for interacting with the AniList GraphQL API
 */
export class AniListClient {
    private client: GraphQLClient;
    private token?: string;
    private baseUrl: string;

    // Modules
    public anime: AnimeModule;
    public manga: MangaModule;
    public character: CharacterModule;
    public user: UserModule;
    public staff: StaffModule;
    public search: SearchModule;

    /**
     * Create a new AniList API client
     *
     * @param options Client configuration options
     */
    constructor(options: AniListClientOptions = {}) {
        const { token, baseUrl = "https://graphql.anilist.co" } = options;

        this.token = token;
        this.baseUrl = baseUrl;
        this.client = new GraphQLClient(baseUrl, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        // Initialize modules
        this.anime = new AnimeModule(this.client);
        this.manga = new MangaModule(this.client);
        this.character = new CharacterModule(this.client);
        this.user = new UserModule(this.client);
        this.staff = new StaffModule(this.client);
        this.search = new SearchModule(this.client);
    }

    /**
     * Set authentication token for authenticated requests
     *
     * @param token OAuth token from AniList
     */
    public setToken(token: string): void {
        this.token = token;
        // Create a new client with the stored baseUrl and updated headers
        this.client = new GraphQLClient(this.baseUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Reinitialize modules with new client
        this.anime = new AnimeModule(this.client);
        this.manga = new MangaModule(this.client);
        this.character = new CharacterModule(this.client);
        this.user = new UserModule(this.client);
        this.staff = new StaffModule(this.client);
        this.search = new SearchModule(this.client);
    }

    /**
     * Execute a raw GraphQL query
     *
     * @param query GraphQL query
     * @param variables Query variables
     * @returns Query result
     */
    public async rawQuery<T = any>(
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
