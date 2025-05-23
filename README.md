# anilist-wrapper

A comprehensive TypeScript-based AniList API wrapper utilizing GraphQL.

[![npm version](https://img.shields.io/npm/v/anilist-wrapper.svg)](https://www.npmjs.com/package/anilist-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/firrthecreator/anilist-wrapper/actions/workflows/ci.yml/badge.svg)](https://github.com/firrthecreator/anilist-wrapper/actions/workflows/ci.yml)

## Features

* 🚀 Full TypeScript support with comprehensive type definitions
* 🔄 Complete GraphQL query handling
* 🧩 Modular architecture for easy extension
* 📚 Comprehensive documentation
* ⚡ Efficient rate limiting
* 🧪 Thoroughly tested with Vitest

## Installation

```bash
npm install anilist-wrapper
```

## Quick Start

```typescript
import { AniListClient } from 'anilist-wrapper';

// Create a new client
const client = new AniListClient();

// Get anime by ID
async function getAnime() {
  const anime = await client.anime.getById(1);
  console.log(anime.title.english);
}

// Search for anime
async function searchAnime() {
  const results = await client.anime.search({ search: 'Attack on Titan' });
  console.log(`Found ${results.data.length} results`);
}

getAnime();
searchAnime();
```

## Modules

The wrapper is organized into modules for different types of content:

* `anime` - Anime-related queries
* `manga` - Manga-related queries
* `character` - Character-related queries
* `staff` - Staff-related queries
* `user` - User-related queries
* `search` - General search functionality

## Authentication

For authenticated requests, you need to provide an OAuth token:

```typescript
// Create a client with authentication
const client = new AniListClient({ token: 'YOUR_TOKEN_HERE' });

// Or set the token later
client.setToken('YOUR_TOKEN_HERE');

// Get the current user's information
const user = await client.user.getCurrentUser();
console.log(`Logged in as: ${user.name}`);
```

## Examples

### Get Trending Anime

```typescript
const trending = await client.anime.getTrending();
console.log('Trending anime:');
trending.data.forEach(anime => {
  console.log(`- ${anime.title.english || anime.title.romaji}`);
});
```

### Search for a Character

```typescript
const characters = await client.character.search({ search: 'Luffy' });
console.log(`Found ${characters.data.length} characters`);
characters.data.forEach(character => {
  console.log(`- ${character.name.full}`);
});
```

### Custom GraphQL Query

```typescript
const query = `
  query {
    GenreCollection
  }
`;

const result = await client.rawQuery(query);
console.log('Available genres:', result.GenreCollection);
```

## Rate Limiting

The wrapper includes a rate limiter to prevent hitting API limits:

```typescript
import { AniListClient, RateLimiter } from 'anilist-wrapper';

const client = new AniListClient();
const rateLimiter = new RateLimiter(60); // 60 requests per minute

// Queue up requests through the rate limiter
const animePromise = rateLimiter.add(() => 
  client.anime.search({ search: 'One Piece' })
);

const mangaPromise = rateLimiter.add(() => 
  client.manga.search({ search: 'Naruto' })
);

// Wait for all requests to complete
const [animeResults, mangaResults] = await Promise.all([
  animePromise,
  mangaPromise
]);
```

## API Reference

### AniListClient

The main client for interacting with the AniList API.

```typescript
const client = new AniListClient({
  token: 'YOUR_TOKEN_HERE', // Optional
  baseUrl: 'https://graphql.anilist.co' // Optional, default shown
});
```

#### Methods

* `setToken(token: string)` - Set the authentication token
* `rawQuery<T>(query: string, variables?: Record<string, any>)` - Execute a raw GraphQL query

### AnimeModule

Module for anime-related queries.

* `getById(id: number)` - Get anime by ID
* `search(options: AnimeFilterOptions, pagination?: PaginationOptions)` - Search for anime
* `getTrending(pagination?: PaginationOptions)` - Get trending anime
* `getPopular(pagination?: PaginationOptions)` - Get popular anime
* `getUpcoming(pagination?: PaginationOptions)` - Get upcoming anime
* `getAiring(pagination?: PaginationOptions)` - Get currently airing anime

### MangaModule

Module for manga-related queries.

* `getById(id: number)` - Get manga by ID
* `search(options: MangaFilterOptions, pagination?: PaginationOptions)` - Search for manga
* `getTrending(pagination?: PaginationOptions)` - Get trending manga
* `getPopular(pagination?: PaginationOptions)` - Get popular manga
* `getUpcoming(pagination?: PaginationOptions)` - Get upcoming manga
* `getReleasing(pagination?: PaginationOptions)` - Get currently releasing manga

### CharacterModule

Module for character-related queries.

* `getById(id: number)` - Get character by ID
* `search(options: CharacterFilterOptions, pagination?: PaginationOptions)` - Search for characters
* `getPopular(pagination?: PaginationOptions)` - Get popular characters
* `getByMedia(mediaId: number, pagination?: PaginationOptions)` - Get characters for a specific anime or manga

### UserModule

Module for user-related queries.

* `getById(id: number)` - Get user by ID
* `getByName(name: string)` - Get user by username
* `search(options: UserFilterOptions, pagination?: PaginationOptions)` - Search for users
* `getCurrentUser()` - Get the current authenticated user

### StaffModule

Module for staff-related queries.

* `getById(id: number)` - Get staff by ID
* `search(options: StaffFilterOptions, pagination?: PaginationOptions)` - Search for staff
* `getPopular(pagination?: PaginationOptions)` - Get popular staff
* `getByMedia(mediaId: number, pagination?: PaginationOptions)` - Get staff for a specific anime or manga

### SearchModule

Module for general search functionality.

* `searchAll(query: string, pagination?: PaginationOptions)` - Search for all types of content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
