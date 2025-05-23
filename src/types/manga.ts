import type {
    Title,
    Image,
    FuzzyDate,
    MediaFormat,
    MediaStatus,
    MediaSource,
    MediaFilterOptions
} from "./common";

/**
 * Manga object
 */
export interface Manga {
    /**
     * Manga ID
     */
    id: number;

    /**
     * Manga titles
     */
    title: Title;

    /**
     * Cover images
     */
    coverImage: Image;

    /**
     * Banner image
     */
    bannerImage?: string;

    /**
     * Manga format
     */
    format?: MediaFormat;

    /**
     * Manga status
     */
    status?: MediaStatus;

    /**
     * Manga description (HTML)
     */
    description?: string;

    /**
     * Number of chapters
     */
    chapters?: number;

    /**
     * Number of volumes
     */
    volumes?: number;

    /**
     * When the manga started publishing
     */
    startDate?: FuzzyDate;

    /**
     * When the manga finished publishing
     */
    endDate?: FuzzyDate;

    /**
     * Genres
     */
    genres?: string[];

    /**
     * Average score (0-100)
     */
    averageScore?: number;

    /**
     * Mean score (0-100)
     */
    meanScore?: number;

    /**
     * Popularity
     */
    popularity?: number;

    /**
     * Favorites
     */
    favourites?: number;

    /**
     * Source material
     */
    source?: MediaSource;

    /**
     * Hashtag
     */
    hashtag?: string;

    /**
     * Updated at
     */
    updatedAt?: number;

    /**
     * Is the manga adult only
     */
    isAdult?: boolean;
}

/**
 * Manga filter options
 */
export interface MangaFilterOptions extends MediaFilterOptions {
    /**
     * Filter by chapter count
     */
    chapters?: number;

    /**
     * Filter by volume count
     */
    volumes?: number;
}
