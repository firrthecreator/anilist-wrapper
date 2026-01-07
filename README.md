# AniList Wrapper

> A production-ready TypeScript/JavaScript wrapper for the AniList GraphQL API with full type support, rate limiting, and modular architecture.

<div align="center">

[![npm version](https://img.shields.io/npm/v/anilist-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/anilist-wrapper)
[![npm downloads](https://img.shields.io/npm/dm/anilist-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/anilist-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=flat-square)](https://www.typescriptlang.org/)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/firrthecreator/anilist-wrapper/ci.yml?style=flat-square&branch=main)](https://github.com/firrthecreator/anilist-wrapper/actions/workflows/ci.yml)

[Installation](#installation) • [Documentation](#documentation) • [Examples](#examples) • [Contributing](#contributing)

</div>

---

## Overview

**AniList Wrapper** is a modern, fully-typed TypeScript library for seamless interaction with the AniList GraphQL API. Built with developer experience in mind, it provides an intuitive API, comprehensive error handling, and efficient rate limiting out of the box.

### Key Features

- **🎯 Type-Safe**: Full TypeScript support with comprehensive type definitions for all API responses
- **⚡ Performance**: Built-in rate limiting to respect API quotas and optimize request handling
- **🧩 Modular**: Clean separation of concerns with dedicated modules for anime, manga, characters, staff, and users
- **📦 GraphQL**: Complete GraphQL query execution with custom query support
- **🔐 Authenticated Requests**: OAuth 2.0 token support for user-specific operations
- **🧪 Well-Tested**: Comprehensive test suite using Vitest
- **📚 Documented**: Extensive documentation and examples for all features
- **🚀 Tree-Shakeable**: Optimized for modern bundlers with ES modules support

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [Modules](#modules)
- [API Reference](#api-reference)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Via npm

```bash
npm install anilist-wrapper
```

### Via yarn

```bash
yarn add anilist-wrapper
```

### Via pnpm

```bash
pnpm add anilist-wrapper
```

### Requirements

- Node.js 16 or higher
- TypeScript 4.5 or higher (for TypeScript projects)

## Quick Start

### Basic Usage

Get started with just a few lines of code:

```typescript
import { AniListClient } from 'anilist-wrapper';

const client = new AniListClient();

// Fetch anime by ID
async function getAnimeInfo() {
  try {
    const anime = await client.anime.getById(1);
    console.log(`Title: ${anime.title.english || anime.title.romaji}`);
    console.log(`Episodes: ${anime.episodes}`);
    console.log(`Status: ${anime.status}`);
  } catch (error) {
    console.error('Failed to fetch anime:', error);
  }
}

getAnimeInfo();
```

### Search Anime

```typescript
// Search for anime by name
async function searchAnime() {
  const results = await client.anime.search({
    search: 'Attack on Titan',
    perPage: 5
  });
  
  console.log(`Found ${results.pageInfo.total} results`);
  results.data.forEach(anime => {
    console.log(`- ${anime.title.english || anime.title.romaji} (${anime.seasonYear})`);
  });
}

searchAnime();
```

## Modules

The wrapper is organized into modules for different types of content:

| Module | Purpose | Example |
|--------|---------|---------|
| **`anime`** | Anime queries and operations | Get anime info, search, trending |
| **`manga`** | Manga queries and operations | Get manga info, search, trending |
| **`character`** | Character queries and operations | Get character info, search |
| **`staff`** | Staff queries and operations | Get staff info, search |
| **`user`** | User queries and operations | Get user profiles, authenticate |
| **`search`** | Cross-type search functionality | Search all content types at once |

## Authentication

### Get Your OAuth Token

To use authenticated features, you'll need an AniList OAuth token:

1. Visit [AniList Developer Settings](https://anilist.co/settings/developer)
2. Create a new API client
3. Copy your access token

### Using Authentication

```typescript
import { AniListClient } from 'anilist-wrapper';

// Method 1: Pass token during initialization
const client = new AniListClient({
  token: 'your_oauth_token_here'
});

// Method 2: Set token later
const client = new AniListClient();
client.setToken('your_oauth_token_here');

// Now you can access authenticated endpoints
async function getCurrentUser() {
  const user = await client.user.getCurrentUser();
  console.log(`Welcome, ${user.name}!`);
  console.log(`Level: ${user.statistics.manga.statuses}`);
}

getCurrentUser();
```

### Authenticated Operations

```typescript
// Get user's anime list
async function getUserAnimeList() {
  const user = await client.user.getCurrentUser();
  // Access user-specific data
}

// Get user by ID
async function getUserData() {
  const user = await client.user.getById(12345);
  console.log(`User: ${user.name}`);
}

// Get user by username
async function searchUser() {
  const user = await client.user.getByName('username');
  console.log(`ID: ${user.id}`);
}
```

## Examples

### Get Trending Anime

```typescript
/**
 * Fetch currently trending anime
 * Results are ordered by trending score
 */
async function getTrendingAnime() {
  try {
    const trending = await client.anime.getTrending({
      perPage: 10,
      page: 1
    });
    
    console.log('📈 Trending Anime:');
    trending.data.forEach((anime, index) => {
      console.log(`${index + 1}. ${anime.title.english || anime.title.romaji}`);
      console.log(`   Status: ${anime.status}`);
      console.log(`   Score: ${anime.meanScore}/100\n`);
    });
  } catch (error) {
    console.error('Failed to fetch trending anime:', error);
  }
}
```

### Search for Characters

```typescript
/**
 * Search for characters by name
 * Returns matching characters with their roles and media appearances
 */
async function findCharacters() {
  const results = await client.character.search({
    search: 'Monkey D. Luffy',
    perPage: 5
  });
  
  console.log(`Found ${results.pageInfo.total} characters:`);
  results.data.forEach(character => {
    const fullName = character.name.full;
    const nativeName = character.name.native || 'N/A';
    console.log(`- ${fullName} (${nativeName})`);
  });
}

findCharacters();
```

### Get Manga by ID

```typescript
/**
 * Fetch detailed manga information
 * Includes chapters, volumes, and publication status
 */
async function getMangaDetails() {
  const manga = await client.manga.getById(30002); // Fullmetal Alchemist
  
  console.log(`Title: ${manga.title.english || manga.title.romaji}`);
  console.log(`Chapters: ${manga.chapters || 'Ongoing'}`);
  console.log(`Volumes: ${manga.volumes || 'Ongoing'}`);
  console.log(`Status: ${manga.status}`);
  console.log(`Score: ${manga.meanScore}/100`);
}

getMangaDetails();
```

### Search Multiple Types (All-in-One)

```typescript
/**
 * Search across all content types at once
 * Returns anime, manga, characters, and staff matches
 */
async function searchAll() {
  const results = await client.search.searchAll('Naruto', {
    perPage: 3
  });
  
  if (results.anime?.length) {
    console.log('📺 Anime:');
    results.anime.forEach(a => console.log(`  - ${a.title.romaji}`));
  }
  
  if (results.manga?.length) {
    console.log('📚 Manga:');
    results.manga.forEach(m => console.log(`  - ${m.title.romaji}`));
  }
  
  if (results.characters?.length) {
    console.log('👤 Characters:');
    results.characters.forEach(c => console.log(`  - ${c.name.full}`));
  }
}

searchAll();
```

### Custom GraphQL Query

```typescript
/**
 * Execute custom GraphQL queries for advanced use cases
 * Allows full control over the query structure and returned fields
 */
const customQuery = `
  query {
    GenreCollection
    MediaTagCollection(status: OFFICIAL)
  }
`;

async function getCustomData() {
  const result = await client.rawQuery(customQuery);
  console.log('Available genres:', result.GenreCollection);
  console.log('Media tags:', result.MediaTagCollection);
}

getCustomData();
```

## Rate Limiting

AniList enforces rate limits on API requests. This wrapper includes built-in rate limiting to help you manage requests efficiently.

### Understanding Rate Limits

- **Limit**: 90 requests per minute per IP
- **Window**: 1 minute rolling window
- **Rate Limiter**: Built into the client automatically

### Using the Rate Limiter

```typescript
import { RateLimiter } from 'anilist-wrapper';

/**
 * Create a rate limiter for managing concurrent requests
 * Useful when making many requests in parallel
 * 
 * @param requestsPerMinute - Maximum requests per minute (default: 60)
 */
const rateLimiter = new RateLimiter(60);

// Queue requests through the rate limiter
async function fetchMultipleAnime() {
  const animeIds = [1, 5, 6, 7, 8]; // Attack on Titan, Cowboy Bebop, etc.
  
  const promises = animeIds.map(id =>
    rateLimiter.add(() => client.anime.getById(id))
  );
  
  const animes = await Promise.all(promises);
  console.log('Fetched all anime with rate limiting applied');
}

fetchMultipleAnime();
```

### Batch Operations

```typescript
/**
 * Best practice: Batch your requests to minimize API calls
 * Use the rate limiter for heavy workloads
 */
async function batchSearch() {
  const queries = ['One Piece', 'Naruto', 'Bleach', 'My Hero Academia'];
  
  const results = await Promise.all(
    queries.map(query =>
      rateLimiter.add(() =>
        client.anime.search({ search: query, perPage: 5 })
      )
    )
  );
  
  results.forEach((result, index) => {
    console.log(`${queries[index]}: ${result.pageInfo.total} matches`);
  });
}

batchSearch();
```

## API Reference

### AniListClient

The main client for interacting with the AniList API.

```typescript
/**
 * Initialize the AniList client
 * @param options - Configuration options
 * @param options.token - OAuth token for authenticated requests (optional)
 * @param options.baseUrl - GraphQL endpoint URL (optional, defaults to official API)
 */
const client = new AniListClient({
  token: 'YOUR_OAUTH_TOKEN',
  baseUrl: 'https://graphql.anilist.co'
});
```

#### Client Methods

| Method | Description | Returns |
|--------|-------------|---------|
| **`setToken(token: string)`** | Set or update the OAuth token | `void` |
| **`rawQuery<T>(query: string, variables?)`** | Execute raw GraphQL queries with full control | `Promise<T>` |

---

### AnimeModule

Comprehensive anime queries and operations.

#### Methods

| Method | Description | Parameters |
|--------|-------------|-----------|
| **`getById(id: number)`** | Get anime by ID | `id: number` |
| **`search(options, pagination?)`** | Search for anime | `AnimeFilterOptions, PaginationOptions?` |
| **`getTrending(pagination?)`** | Get trending anime | `PaginationOptions?` |
| **`getPopular(pagination?)`** | Get popular anime | `PaginationOptions?` |
| **`getUpcoming(pagination?)`** | Get upcoming anime | `PaginationOptions?` |
| **`getAiring(pagination?)`** | Get currently airing anime | `PaginationOptions?` |

```typescript
// Example: Get anime by ID
const anime = await client.anime.getById(1);
console.log(anime.title.english); // "Attack on Titan"

// Example: Search with filters
const results = await client.anime.search({
  search: 'Death Note',
  status: 'FINISHED',
  sort: ['SCORE_DESC'],
  perPage: 10,
  page: 1
});
```

---

### MangaModule

Complete manga queries and operations.

#### Methods

| Method | Description | Parameters |
|--------|-------------|-----------|
| **`getById(id: number)`** | Get manga by ID | `id: number` |
| **`search(options, pagination?)`** | Search for manga | `MangaFilterOptions, PaginationOptions?` |
| **`getTrending(pagination?)`** | Get trending manga | `PaginationOptions?` |
| **`getPopular(pagination?)`** | Get popular manga | `PaginationOptions?` |
| **`getUpcoming(pagination?)`** | Get upcoming manga | `PaginationOptions?` |
| **`getReleasing(pagination?)`** | Get currently releasing manga | `PaginationOptions?` |

```typescript
// Example: Get manga by ID
const manga = await client.manga.getById(30002);
console.log(manga.title.english); // "Fullmetal Alchemist"

// Example: Find trending manga
const trending = await client.manga.getTrending({
  perPage: 5,
  page: 1
});
```

---

### CharacterModule

Character-related queries and operations.

#### Methods

| Method | Description | Parameters |
|--------|-------------|-----------|
| **`getById(id: number)`** | Get character by ID | `id: number` |
| **`search(options, pagination?)`** | Search for characters | `CharacterFilterOptions, PaginationOptions?` |
| **`getPopular(pagination?)`** | Get popular characters | `PaginationOptions?` |
| **`getByMedia(mediaId, pagination?)`** | Get characters from anime/manga | `mediaId: number, PaginationOptions?` |

```typescript
// Example: Search for a character
const characters = await client.character.search({
  search: 'Luffy',
  perPage: 5
});

// Example: Get characters from a specific anime
const characters = await client.character.getByMedia(1); // Characters from Attack on Titan
```

---

### UserModule

User-related queries and operations.

#### Methods

| Method | Description | Parameters | Requires Auth |
|--------|-------------|-----------|---------------|
| **`getById(id: number)`** | Get user by ID | `id: number` | No |
| **`getByName(name: string)`** | Get user by username | `name: string` | No |
| **`search(options, pagination?)`** | Search for users | `UserFilterOptions, PaginationOptions?` | No |
| **`getCurrentUser()`** | Get authenticated user info | None | ✅ Yes |

```typescript
// Example: Get user by name
const user = await client.user.getByName('username');
console.log(user.about); // User bio

// Example: Get current authenticated user
const currentUser = await client.user.getCurrentUser();
console.log(`Welcome, ${currentUser.name}`);
```

---

### StaffModule

Staff-related queries and operations.

#### Methods

| Method | Description | Parameters |
|--------|-------------|-----------|
| **`getById(id: number)`** | Get staff by ID | `id: number` |
| **`search(options, pagination?)`** | Search for staff | `StaffFilterOptions, PaginationOptions?` |
| **`getPopular(pagination?)`** | Get popular staff | `PaginationOptions?` |
| **`getByMedia(mediaId, pagination?)`** | Get staff from anime/manga | `mediaId: number, PaginationOptions?` |

```typescript
// Example: Search for voice actors
const staff = await client.staff.search({
  search: 'Yuki Kaji',
  perPage: 5
});

// Example: Get staff from a specific anime
const staffList = await client.staff.getByMedia(1); // Staff of Attack on Titan
```

---

### SearchModule

Cross-type search functionality.

#### Methods

| Method | Description | Parameters |
|--------|-------------|-----------|
| **`searchAll(query: string, pagination?)`** | Search all content types | `query: string, PaginationOptions?` |

```typescript
// Example: Search across all types
const results = await client.search.searchAll('Fate', {
  perPage: 5,
  page: 1
});

console.log(results.anime); // Anime matches
console.log(results.manga); // Manga matches
console.log(results.characters); // Character matches
console.log(results.staff); // Staff matches
```

---

## Error Handling

The wrapper provides structured error handling for API operations:

```typescript
import { AniListClient } from 'anilist-wrapper';

const client = new AniListClient();

async function safeApiCall() {
  try {
    const anime = await client.anime.getById(1);
    console.log('Success:', anime.title);
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
      
      // Handle specific error types
      if (error.message.includes('404')) {
        console.error('Anime not found');
      } else if (error.message.includes('rate')) {
        console.error('Rate limit exceeded, please wait');
      }
    }
  }
}

safeApiCall();
```

### Best Practices for Error Handling

```typescript
/**
 * Wrapper function for safe API calls with retry logic
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

// Usage
const anime = await withRetry(() => client.anime.getById(1));
```

---

## Best Practices

### 1. Pagination

Always use pagination for search results to minimize API calls:

```typescript
async function getAllResults(search: string) {
  const allData = [];
  let page = 1;
  let hasNextPage = true;
  
  while (hasNextPage) {
    const results = await client.anime.search({
      search,
      perPage: 50, // Maximum allowed
      page
    });
    
    allData.push(...results.data);
    hasNextPage = results.pageInfo.hasNextPage;
    page++;
  }
  
  return allData;
}
```

### 2. Caching

Implement caching to reduce redundant API calls:

```typescript
const cache = new Map();

async function getCachedAnime(id: number) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  const anime = await client.anime.getById(id);
  cache.set(id, anime);
  return anime;
}
```

### 3. Parallel Requests

Use the rate limiter for parallel requests:

```typescript
const rateLimiter = new RateLimiter(60);

const animes = await Promise.all([
  rateLimiter.add(() => client.anime.getById(1)),
  rateLimiter.add(() => client.anime.getById(2)),
  rateLimiter.add(() => client.anime.getById(3))
]);
```

### 4. Environment Variables

Store tokens securely:

```typescript
const client = new AniListClient({
  token: process.env.ANILIST_TOKEN
});
```

---

## Troubleshooting

### Common Issues

#### 401 Unauthorized

**Problem**: Authentication token is invalid or expired.

**Solution**:
```typescript
// Refresh your token from AniList developer settings
client.setToken('new_valid_token');
```

#### 429 Rate Limited

**Problem**: Too many requests made too quickly.

**Solution**:
```typescript
// Use the built-in rate limiter
const limiter = new RateLimiter(60);
const result = await limiter.add(() => client.anime.search(...));
```

#### Network Timeout

**Problem**: Request took too long to complete.

**Solution**:
```typescript
// Implement retry logic
async function withTimeout<T>(
  fn: () => Promise<T>,
  ms = 10000
): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}
```

#### Empty Results

**Problem**: Search returned no results.

**Solution**:
```typescript
const results = await client.anime.search({
  search: 'query',
  perPage: 25 // Try with fewer results first
});

if (results.pageInfo.total === 0) {
  console.log('No results found');
}
```


## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

### Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/firrthecreator/anilist-wrapper.git
   cd anilist-wrapper
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Development Workflow

```bash
# Build the project
npm run build

# Run tests
npm test

# Watch mode for development
npm run test:watch

# Check code coverage
npm run test:coverage

# Lint code
npm run lint
```

### Submitting Changes

1. **Make** your changes and commit them:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
2. **Push** to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
3. **Create** a Pull Request with a clear description of your changes

### Code Standards

- Use TypeScript for all code
- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Write clear, descriptive commit messages

### Testing Requirements

- All new features must include tests
- Maintain or improve code coverage
- Tests should be in the `tests/` directory
- Use Vitest as the testing framework

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation**: Check the [examples/](examples/) folder for usage patterns
- 🐛 **Issues**: Found a bug? [Report it here](https://github.com/firrthecreator/anilist-wrapper/issues)
- 💬 **Discussions**: Have questions? Start a [discussion](https://github.com/firrthecreator/anilist-wrapper/discussions)

---

<div align="center">

Made with ❤️ by Firr, The Creator.

[⬆ back to top](#anilist-wrapper)

</div>
