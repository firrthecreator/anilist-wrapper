import { AniListClient } from "anilist-wrapper";

// Create a new client with authentication
// You need to get a token from AniList: https://anilist.co/api/v2/oauth/authorize
const token = "YOUR_TOKEN_HERE";
const client = new AniListClient({ token });

// Example: Get current user
async function getCurrentUser() {
    try {
        const user = await client.user.getCurrentUser();
        console.log(`Logged in as: ${user.name}`);
        console.log(`Anime watched: ${user.statistics?.anime?.count || 0}`);
        console.log(`Manga read: ${user.statistics?.manga?.count || 0}`);
    } catch (error) {
        console.error("Error:", error);
    }
}
// Run examples
(async () => {
    await getCurrentUser();
})();
