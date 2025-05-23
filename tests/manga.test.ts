import { describe, it, expect, vi, beforeEach } from "vitest";
import { MangaModule } from "../src/modules/manga";
import type { GraphQLClient } from "graphql-request";

// Mock data
const mockManga = {
    id: 1,
    title: {
        romaji: "Test Manga",
        english: "Test Manga",
        native: "テストマンガ",
        userPreferred: "Test Manga"
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
    if (query.includes("GetManga")) {
        return { Media: mockManga };
    }

    if (query.includes("SearchManga")) {
        return {
            Page: {
                pageInfo: {
                    total: 1,
                    currentPage: 1,
                    lastPage: 1,
                    hasNextPage: false,
                    perPage: 20
                },
                media: [mockManga]
            }
        };
    }

    if (
        query.includes("TrendingManga") ||
        query.includes("PopularManga") ||
        query.includes("UpcomingManga") ||
        query.includes("ReleasingManga")
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
                media: [mockManga]
            }
        };
    }

    return {};
});

const mockClient = {
    request: mockRequest,
    url: "https://graphql.anilist.co"
} as unknown as GraphQLClient;

describe("MangaModule", () => {
    let mangaModule: MangaModule;

    beforeEach(() => {
        mangaModule = new MangaModule(mockClient);
        mockRequest.mockClear();
    });

    it("should get manga by ID", async () => {
        const manga = await mangaModule.getById(1);
        expect(manga).toEqual(mockManga);
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("GetManga"),
            { id: 1 }
        );
    });

    it("should search for manga", async () => {
        const result = await mangaModule.search({ search: "test" });
        expect(result.data).toEqual([mockManga]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("SearchManga"),
            expect.objectContaining({ search: "test" })
        );
    });

    it("should get trending manga", async () => {
        const result = await mangaModule.getTrending();
        expect(result.data).toEqual([mockManga]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("TrendingManga"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });

    it("should get popular manga", async () => {
        const result = await mangaModule.getPopular();
        expect(result.data).toEqual([mockManga]);
        expect(result.pageInfo).toBeDefined();
        expect(mockRequest).toHaveBeenCalledWith(
            expect.stringContaining("PopularManga"),
            expect.objectContaining({ page: 1, perPage: 20 })
        );
    });
});
