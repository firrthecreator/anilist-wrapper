import type { Image, FuzzyDate } from "./common";

/**
 * Staff object
 */
export interface Staff {
    /**
     * Staff ID
     */
    id: number;

    /**
     * Staff name
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
         * User's preferred name
         */
        userPreferred?: string;
    };

    /**
     * Staff language
     */
    language?: string;

    /**
     * Staff images
     */
    image?: Image;

    /**
     * Staff description (HTML)
     */
    description?: string;

    /**
     * Staff gender
     */
    gender?: string;

    /**
     * Staff date of birth
     */
    dateOfBirth?: FuzzyDate;

    /**
     * Staff date of death
     */
    dateOfDeath?: FuzzyDate;

    /**
     * Staff age
     */
    age?: number;

    /**
     * Staff years active
     */
    yearsActive?: number[];

    /**
     * Staff hometown
     */
    homeTown?: string;

    /**
     * Staff blood type
     */
    bloodType?: string;

    /**
     * Is the staff a favorite
     */
    isFavourite?: boolean;

    /**
     * Number of favorites
     */
    favourites?: number;

    /**
     * Media the staff has worked on
     */
    staffMedia?: {
        nodes: {
            id: number;
            title: {
                userPreferred: string;
            };
            type: string;
        }[];
    };

    /**
     * Characters the staff has voiced
     */
    characters?: {
        nodes: {
            id: number;
            name: {
                full: string;
            };
        }[];
    };
}

/**
 * Staff filter options
 */
export interface StaffFilterOptions {
    /**
     * Filter by ID
     */
    id?: number;

    /**
     * Filter by search query
     */
    search?: string;

    /**
     * Filter by ID of media the staff has worked on
     */
    mediaId?: number;

    /**
     * Filter by whether the staff is a favorite
     */
    isFavourite?: boolean;
}
