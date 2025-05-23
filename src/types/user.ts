import type { Image } from "./common";

/**
 * User object
 */
export interface User {
    /**
     * User ID
     */
    id: number;

    /**
     * Username
     */
    name: string;

    /**
     * User avatar
     */
    avatar?: Image;

    /**
     * User banner
     */
    bannerImage?: string;

    /**
     * User about (HTML)
     */
    about?: string;

    /**
     * User bio
     */
    bio?: string;

    /**
     * User's anime statistics
     */
    statistics?: {
        anime?: {
            count: number;
            meanScore: number;
            standardDeviation: number;
            minutesWatched: number;
            episodesWatched: number;
            genresCount: { genre: string; count: number; meanScore: number }[];
        };
        manga?: {
            count: number;
            meanScore: number;
            standardDeviation: number;
            chaptersRead: number;
            volumesRead: number;
            genresCount: { genre: string; count: number; meanScore: number }[];
        };
    };

    /**
     * User's favorites
     */
    favourites?: {
        anime?: { nodes: { id: number; title: { userPreferred: string } }[] };
        manga?: { nodes: { id: number; title: { userPreferred: string } }[] };
        characters?: { nodes: { id: number; name: { full: string } }[] };
        staff?: { nodes: { id: number; name: { full: string } }[] };
        studios?: { nodes: { id: number; name: string }[] };
    };

    /**
     * User's site URL
     */
    siteUrl?: string;

    /**
     * When the user was created
     */
    createdAt?: number;

    /**
     * When the user was last updated
     */
    updatedAt?: number;
}

/**
 * User filter options
 */
export interface UserFilterOptions {
    /**
     * Filter by ID
     */
    id?: number;

    /**
     * Filter by username
     */
    name?: string;

    /**
     * Filter by whether the user is a moderator
     */
    isModerator?: boolean;
}
