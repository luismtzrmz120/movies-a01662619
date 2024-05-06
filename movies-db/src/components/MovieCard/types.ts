export interface IMovieCard {
    title: string;
    genreId: number;
    movieId: number;
    voteAvergae: number;
    posterPath: string;
    cardWidth?: string;
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IMovieResponse {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number;
}