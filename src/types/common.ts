/**
 * Media formats available on AniList
 */
export enum MediaFormat {
    TV = "TV",
    TV_SHORT = "TV_SHORT",
    MOVIE = "MOVIE",
    SPECIAL = "SPECIAL",
    OVA = "OVA",
    ONA = "ONA",
    MUSIC = "MUSIC",
    MANGA = "MANGA",
    NOVEL = "NOVEL",
    ONE_SHOT = "ONE_SHOT"
}

/**
 * Media status
 */
export enum MediaStatus {
    FINISHED = "FINISHED",
    RELEASING = "RELEASING",
    NOT_YET_RELEASED = "NOT_YET_RELEASED",
    CANCELLED = "CANCELLED",
    HIATUS = "HIATUS"
}

/**
 * Media season
 */
export enum MediaSeason {
    WINTER = "WINTER",
    SPRING = "SPRING",
    SUMMER = "SUMMER",
    FALL = "FALL"
}

/**
 * Media source
 */
export enum MediaSource {
    ORIGINAL = "ORIGINAL",
    MANGA = "MANGA",
    LIGHT_NOVEL = "LIGHT_NOVEL",
    VISUAL_NOVEL = "VISUAL_NOVEL",
    VIDEO_GAME = "VIDEO_GAME",
    OTHER = "OTHER",
    NOVEL = "NOVEL",
    DOUJINSHI = "DOUJINSHI",
    ANIME = "ANIME",
    WEB_NOVEL = "WEB_NOVEL",
    LIVE_ACTION = "LIVE_ACTION",
    GAME = "GAME",
    COMIC = "COMIC",
    MULTIMEDIA_PROJECT = "MULTIMEDIA_PROJECT",
    PICTURE_BOOK = "PICTURE_BOOK"
}

/**
 * Media type
 */
export enum MediaType {
    ANIME = "ANIME",
    MANGA = "MANGA"
}

/**
 * Title object containing different title versions
 */
export interface Title {
    /**
     * Romanized title
     */
    romaji?: string;

    /**
     * English title
     */
    english?: string;

    /**
     * Native title
     */
    native?: string;

    /**
     * User's preferred title language
     */
    userPreferred?: string;
}

/**
 * Image object containing different image sizes
 */
export interface Image {
    /**
     * Extra large image
     */
    extraLarge?: string;

    /**
     * Large image
     */
    large?: string;

    /**
     * Medium image
     */
    medium?: string;

    /**
     * Color used in image
     */
    color?: string;
}

/**
 * Date object
 */
export interface FuzzyDate {
    /**
     * Year
     */
    year?: number;

    /**
     * Month
     */
    month?: number;

    /**
     * Day
     */
    day?: number;
}

/**
 * Common filter options for media queries
 */
export interface MediaFilterOptions {
    /**
     * Filter by ID
     */
    id?: number;

    /**
     * Filter by title
     */
    search?: string;

    /**
     * Filter by format
     */
    format?: MediaFormat;

    /**
     * Filter by status
     */
    status?: MediaStatus;

    /**
     * Filter by season
     */
    season?: MediaSeason;

    /**
     * Filter by year
     */
    seasonYear?: number;

    /**
     * Filter by genres
     */
    genres?: string[];

    /**
     * Filter by tags
     */
    tags?: string[];

    /**
     * Filter by source
     */
    source?: MediaSource;

    /**
     * Filter by minimum score
     */
    minimumScore?: number;

    /**
     * Filter by start date
     */
    startDate?: FuzzyDate;

    /**
     * Filter by end date
     */
    endDate?: FuzzyDate;
}
