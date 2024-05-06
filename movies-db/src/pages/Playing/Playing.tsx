import React, { useEffect, useState } from "react";
import { getNowPlaying } from "../../services";
import { MovieCard } from "../../components/MovieCard";
import { IMovieResponse } from "../../components/MovieCard/types";

const Playing: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getNowPlayingMovies = async () => {
        await getNowPlaying().then((data) => {
            if (data && data.data){
                setMovies(data.data.results);
                setIsLoading(false);
            }
        })

        .catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        setIsLoading(true);
        getNowPlayingMovies();
    }, []);
    return(
        <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
            {isLoading && <div>Loading...</div>}
            <div style={{marginLeft: "20px", overflow: "hidden"}}>
                <h1 className="text-3xl font-bold mb-4 pt-5">Now Playing</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {movies?.length > 0 && 
                        movies.map((movie) => (
                            <MovieCard
                            title={movie.title}
                            genreId={movie.genre_ids[0]}
                            movieId={movie.id}
                            voteAvergae={movie.vote_average}
                            posterPath={movie.poster_path}
                        />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Playing;