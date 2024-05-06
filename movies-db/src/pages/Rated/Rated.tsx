import React, { useEffect, useState } from "react";
import { getTopRated } from "../../services";
import { IMovieResponse } from "../../components/MovieCard/types";
import { MovieCard } from "../../components/MovieCard";

const Rated: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getTopRatedMovies = async () => {
        await getTopRated().then((data) => {
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
        getTopRatedMovies();
    }, []);
    
    return(
        <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
            {isLoading && <div>Loading...</div>}
            <div style={{marginLeft: "20px", overflow: "hidden"}}>
                <h1 className="text-3xl font-bold mb-4 pt-5">Top Rated</h1>
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

export default Rated;