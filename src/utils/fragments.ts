/**
 * GraphQL fragment for anime fields
 */
export const ANIME_FIELDS = `
  id
  title {
    romaji
    english
    native
    userPreferred
  }
  coverImage {
    extraLarge
    large
    medium
    color
  }
  bannerImage
  format
  status
  description
  season
  seasonYear
  episodes
  duration
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  genres
  averageScore
  meanScore
  popularity
  favourites
  source
  hashtag
  trailer {
    id
    site
    thumbnail
  }
  updatedAt
  isAdult
  studios {
    nodes {
      id
      name
      isAnimationStudio
    }
  }
`;

/**
 * GraphQL fragment for manga fields
 */
export const MANGA_FIELDS = `
  id
  title {
    romaji
    english
    native
    userPreferred
  }
  coverImage {
    extraLarge
    large
    medium
    color
  }
  bannerImage
  format
  status
  description
  chapters
  volumes
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  genres
  averageScore
  meanScore
  popularity
  favourites
  source
  hashtag
  updatedAt
  isAdult
`;

/**
 * GraphQL fragment for character fields
 */
export const CHARACTER_FIELDS = `
  id
  name {
    first
    last
    full
    native
    alternative
    alternativeSpoiler
    userPreferred
  }
  image {
    large
    medium
  }
  description
  gender
  dateOfBirth {
    year
    month
    day
  }
  age
  bloodType
  isFavourite
  favourites
  media {
    nodes {
      id
      title {
        userPreferred
      }
      type
    }
  }
`;

/**
 * GraphQL fragment for staff fields
 */
export const STAFF_FIELDS = `
  id
  name {
    first
    last
    full
    native
    alternative
    userPreferred
  }
  language
  image {
    large
    medium
  }
  description
  gender
  dateOfBirth {
    year
    month
    day
  }
  dateOfDeath {
    year
    month
    day
  }
  age
  yearsActive
  homeTown
  bloodType
  isFavourite
  favourites
  staffMedia {
    nodes {
      id
      title {
        userPreferred
      }
      type
    }
  }
  characters {
    nodes {
      id
      name {
        full
      }
    }
  }
`;

/**
 * GraphQL fragment for user fields
 */
export const USER_FIELDS = `
  id
  name
  avatar {
    large
    medium
  }
  bannerImage
  about
  bio
  statistics {
    anime {
      count
      meanScore
      standardDeviation
      minutesWatched
      episodesWatched
      genresCount {
        genre
        count
        meanScore
      }
    }
    manga {
      count
      meanScore
      standardDeviation
      chaptersRead
      volumesRead
      genresCount {
        genre
        count
        meanScore
      }
    }
  }
  favourites {
    anime {
      nodes {
        id
        title {
          userPreferred
        }
      }
    }
    manga {
      nodes {
        id
        title {
          userPreferred
        }
      }
    }
    characters {
      nodes {
        id
        name {
          full
        }
      }
    }
    staff {
      nodes {
        id
        name {
          full
        }
      }
    }
    studios {
      nodes {
        id
        name
      }
    }
  }
  siteUrl
  createdAt
  updatedAt
`;
