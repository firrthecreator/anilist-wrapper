import type { Image, FuzzyDate } from "./common";

/**
 * Character object
 */
export interface Character {
    /**
     * Character ID
     */
    id: number;

    /**
     * Character name
     */
    name: {
        /**
         * First name
         */
        first?: string;

        /**
         * Last name
         */
        last?: string;

        /**
         * Full name
         */
        full?: string;

        /**
         * Native name
         */
        native?: string;

        /**
         * Alternative names
         */
        alternative?: string[];

        /**
         * Alternative spellings
         */
        alternativeSpoiler?: string[];

        /**
         * User's preferred name
         */
        userPreferred?: string;
    };

    /**
     * Character images
     */
    image?: Image;

    /**
     * Character description (HTML)
     */
    description?: string;

    /**
     * Character gender
     */
    gender?: string;

    /**
     * Character date of birth
     */
    dateOfBirth?: FuzzyDate;

    /**
     * Character age
     */
    age?: string;

    /**
     * Character blood type
     */
    bloodType?: string;

    /**
     * Is the character a favorite
     */
    isFavourite?: boolean;

    /**
     * Number of favorites
     */
    favourites?: number;

    /**
     * Media the character appears in
     */
    media?: {
        nodes: {
            id: number;
            title: {
                userPreferred: string;
            };
            type: string;
        }[];
    };
}

/**
 * Character filter options
 */
export interface CharacterFilterOptions {
    /**
     * Filter by ID
     */
    id?: number;

    /**
     * Filter by search query
     */
    search?: string;

    /**
     * Filter by ID of media the character appears in
     */
    mediaId?: number;

    /**
     * Filter by whether the character is a favorite
     */
    isFavourite?: boolean;
}
