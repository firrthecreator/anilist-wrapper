import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnimeModule } from "../src/modules/anime";
import type { GraphQLClient } from "graphql-request";

// Mock data
const mockAnime = {
    id: 1,
    title: {
        romaji: "Test Anime",
        english: "Test Anime",
        native: "テストアニメ",
        userPreferred: "Test Anime"
    },
    coverImage: {
        extraLarge: "https://example.com/image.jpg",
        large: "https://example.com/image.jpg",
        medium: "https://example.com/image.jpg",
        color: "#FF0000"
    }
};

// Mock GraphQLClient
const mockRequest = vi.fn().mockImplementation((query, variables) => {
    if (query.includes("GetAnime")) {
        return { Media: mockAnime };
    }

    if (query.includes("SearchAnime")) {
        return {
            Page: {
                pageInfo: {
                    total: 1,
                    currentPage: 1,
                    lastPage: 1,
                    hasNextPage: false,
                    perPage: 20
                },
                media: [mockAnime]
            }
        };
    }

    if (
        query.includes("TrendingAnime") ||
        query.includes("PopularAnime") ||
        query.includes("UpcomingAnime") ||
        query.includes("AiringAnime")
    ) {
        return {
            Page: {
                pageInfo: {
                    total: 1,
                    currentPage: 1,
                    lastPage: 1,
                    hasNextPage: false,
                    perPage: 20
                },
                media: [mockAnime]
            }
        };
    }

    return {};
});

const mockClient = {
    request: mockRequest,
    url: "https://graphql.anilist.co"
} as unknown as GraphQLClient;

describe("AnimeModule", () => {
    let animeModule: AnimeModule;

    beforeEach(() => {
        animeModule = new AnimeModule(mockClient);
        mockRequest.mockClear();
    });

    it("should get anime by ID", async () => {
        const anime = await animeModule.getById(1);
        expect(anime).toEqual(mockAnime);
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("GetAnime"),
            { id: 1 }
        );
    });

    it("should search for anime", async () => {
        const result = await animeModule.search({ search: "test" });
        expect(result.data).toEqual([mockAnime]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("SearchAnime"),
            expect.objectContaining({ search: "test" })
        );
    });

    it("should get trending anime", async () => {
        const result = await animeModule.getTrending();
        expect(result.data).toEqual([mockAnime]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("TrendingAnime"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });

    it("should get popular anime", async () => {
        const result = await animeModule.getPopular();
        expect(result.data).toEqual([mockAnime]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("PopularAnime"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });

    it("should get upcoming anime", async () => {
        const result = await animeModule.getUpcoming();
        expect(result.data).toEqual([mockAnime]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("UpcomingAnime"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });

    it("should get airing anime", async () => {
        const result = await animeModule.getAiring();
        expect(result.data).toEqual([mockAnime]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("AiringAnime"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });
});
