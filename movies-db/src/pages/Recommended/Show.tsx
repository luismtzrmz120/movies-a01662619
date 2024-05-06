import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieInfo, getSimilar } from "../../services";
import { IMovieResponse } from "../../components/MovieCard/types";
import { MovieInformation } from "../../components/MovieInformation";
import MovieCard from "../../components/MovieCard/MovieCard";
import { IMovieDetail } from "./types";

const Show: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieDetail | null>(null);
    const [similarMovies, setSimilarMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            getMovieInfo(id)
                .then((data) => {
                    if (data && data.data) {
                        setMovie(data.data);
                    }
                })
                .finally(() => setIsLoading(false));

            getSimilar(id)
                .then((data) => {
                    if (data && data.data) {
                        setSimilarMovies(data.data.results);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    return (
        <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
            {isLoading && <div>Loading...</div>}
            {movie && (
                <>
                    <div className="pt-5 pb-5">
                        <MovieInformation {...movie} />
                    </div>
                    <div className="pt-5">
                        <h1 className="text-3xl font-bold mb-4 ml-5">Recommended Movies</h1>
                        <div style={{ marginLeft: "20px", overflowX: "auto" }} className="flex space-x-4">
                            {similarMovies.map((movie) => (
                                <div key={movie.id} style={{ flexShrink: 0, width: "250px" }}>
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
                    </div>
                </>
            )}
        </div>
    );
};

export default Show;
