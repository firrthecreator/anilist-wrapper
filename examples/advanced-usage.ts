import { AniListClient } from "anilist-wrapper";
import { RateLimiter } from "anilist-wrapper/utils";

// Create a new client
const client = new AniListClient();

// Create a rate limiter to prevent hitting API limits
const rateLimiter = new RateLimiter(60); // 60 requests per minute

// Example: Search for multiple things in parallel with rate limiting
async function searchMultiple() {
    try {
        // Queue up multiple requests through the rate limiter
        const animePromise = rateLimiter.add(() =>
            client.anime.search({ search: "One Piece" })
        );

        const mangaPromise = rateLimiter.add(() =>
            client.manga.search({ search: "Naruto" })
        );

        const charactersPromise = rateLimiter.add(() =>
            client.character.search({ search: "Luffy" })
        );

        // Wait for all requests to complete
        const [animeResults, mangaResults, characterResults] =
            await Promise.all([animePromise, mangaPromise, charactersPromise]);

        console.log(`Found ${animeResults.data.length} anime results`);
        console.log(`Found ${mangaResults.data.length} manga results`);
        console.log(`Found ${characterResults.data.length} character results`);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example: Custom GraphQL query
async function customQuery() {
    try {
        const query = `
      query {
        GenreCollection
        MediaTagCollection {
          name
          description
          category
        }
      }
    `;

        const result = await client.rawQuery(query);
        console.log("Available genres:", result.GenreCollection);
        console.log(
            "Available tags:",
            result.MediaTagCollection.map((tag: any) => tag.name)
        );
    } catch (error) {
        console.error("Error:", error);
    }
}
// Run examples
(async () => {
    await searchMultiple();
    await customQuery();
})();
