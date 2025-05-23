import type {
    Title,
    Image,
    FuzzyDate,
    MediaFormat,
    MediaStatus,
    MediaSeason,
    MediaSource,
    MediaFilterOptions
} from "./common";

/**
 * Anime object
 */
export interface Anime {
    /**
     * Anime ID
     */
    id: number;

    /**
     * Anime titles
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
     * Anime format
     */
    format?: MediaFormat;

    /**
     * Anime status
     */
    status?: MediaStatus;

    /**
     * Anime description (HTML)
     */
    description?: string;

    /**
     * Season the anime aired
     */
    season?: MediaSeason;

    /**
     * Year the anime aired
     */
    seasonYear?: number;

    /**
     * Number of episodes
     */
    episodes?: number;

    /**
     * Episode duration in minutes
     */
    duration?: number;

    /**
     * When the anime started airing
     */
    startDate?: FuzzyDate;

    /**
     * When the anime finished airing
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
     * Trailer
     */
    trailer?: {
        id: string;
        site: string;
        thumbnail: string;
    };

    /**
     * Updated at
     */
    updatedAt?: number;

    /**
     * Is the anime adult only
     */
    isAdult?: boolean;

    /**
     * Studios that produced the anime
     */
    studios?: {
        nodes: {
            id: number;
            name: string;
            isAnimationStudio: boolean;
        }[];
    };
}

/**
 * Anime filter options
 */
export interface AnimeFilterOptions extends MediaFilterOptions {
    /**
     * Filter by episode count
     */
    episodes?: number;

    /**
     * Filter by episode duration
     */
    duration?: number;

    /**
     * Filter by studio ID
     */
    studioId?: number;
}
