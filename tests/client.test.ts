import { describe, it, expect, vi, beforeEach } from "vitest";
import { AniListClient } from "../src/client";

// Mock GraphQLClient
vi.mock("graphql-request", () => {
    return {
        GraphQLClient: vi.fn().mockImplementation(() => {
            return {
                request: vi.fn().mockImplementation((query, variables) => {
                    if (query.includes("GetAnime")) {
                        return {
                            Media: {
                                id: 1,
                                title: {
                                    romaji: "Test Anime",
                                    english: "Test Anime",
                                    native: "テストアニメ",
                                    userPreferred: "Test Anime"
                                }
                            }
                        };
                    }
                    return {};
                }),
                url: "https://graphql.anilist.co"
            };
        })
    };
});

describe("AniListClient", () => {
    let client: AniListClient;

    beforeEach(() => {
        client = new AniListClient();
    });

    it("should create a client without token", () => {
        expect(client).toBeDefined();
        expect(client.anime).toBeDefined();
        expect(client.manga).toBeDefined();
        expect(client.character).toBeDefined();
        expect(client.user).toBeDefined();
        expect(client.staff).toBeDefined();
        expect(client.search).toBeDefined();
    });

    it("should create a client with token", () => {
        const clientWithToken = new AniListClient({ token: "test-token" });
        expect(clientWithToken).toBeDefined();
    });

    it("should set token after initialization", () => {
        client.setToken("new-token");
        expect(client).toBeDefined();
    });

    it("should execute raw queries", async () => {
        const result = await client.rawQuery("query { test }");
        expect(result).toBeDefined();
    });
});
