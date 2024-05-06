import React from 'react';
import { IMovieResponse } from '../MovieCard/types';
import MovieCard from '../MovieCard/MovieCard';

interface MovieScrollProps {
    movies: IMovieResponse[];
    cardWidth?: string; 
}

const MovieCarousel: React.FC<MovieScrollProps> = ({ movies, cardWidth }) => {
    return (
        <div className="flex overflow-x-auto space-x-4">
            {movies.map((movie) => (
                <div key={movie.id} className={`relative ${cardWidth || 'w-48'}`}>
                    <MovieCard
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAvergae={movie.vote_average}
                        genreId={movie.genre_ids[0]}
                    />
                </div>
            ))}
        </div>
    );
};

export default MovieCarousel;
