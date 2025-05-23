import { AniListClient } from "anilist-wrapper";

// Create a new client
const client = new AniListClient();

// Example: Get anime by ID
async function getAnimeById() {
    try {
        const anime = await client.anime.getById(1);
        console.log("Anime:", anime.title.english);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example: Search for anime
async function searchAnime() {
    try {
        const results = await client.anime.search({
            search: "Attack on Titan"
        });
        console.log(`Found ${results.data.length} results`);
        results.data.forEach(anime => {
            console.log(`- ${anime.title.english || anime.title.romaji}`);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example: Get trending anime
async function getTrendingAnime() {
    try {
        const trending = await client.anime.getTrending();
        console.log("Trending anime:");
        trending.data.forEach(anime => {
            console.log(`- ${anime.title.english || anime.title.romaji}`);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
// Run examples
(async () => {
    await getAnimeById();
    await searchAnime();
    await getTrendingAnime();
})();
