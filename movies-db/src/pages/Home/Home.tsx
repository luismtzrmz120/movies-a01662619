import React, { useEffect, useState } from "react";
import { getPopular, getTopRated, getNowPlaying } from "../../services";
import { IMovieResponse } from "../../components/MovieCard/types";
import MovieCard from "../../components/MovieCard/MovieCard";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [ratedMovies, setRatedMovies] = useState<IMovieResponse[]>([]);
    const [playingMovies, setPlayingMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getMovies = async () => {
        try {
            const popularData = await getPopular();
            const ratedData = await getTopRated();
            const playingData = await getNowPlaying();

            const filterMovies = (data: any) => {
                if (data && data.data) {
                    return data.data.results.filter(
                        (movie: IMovieResponse) => movie.vote_average >= 7
                    );
                }
                return [];
            };

            setPopularMovies(filterMovies(popularData));
            setRatedMovies(filterMovies(ratedData).slice(0, 8));
            setPlayingMovies(filterMovies(playingData));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div style={{ overflow: "auto", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
            {isLoading && <div>Loading...</div>}
            <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                <h1 className="text-3xl font-bold mb-2 pt-5">Popular</h1>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    {popularMovies.map((movie) => (
                        <div key={movie.id} style={{ marginRight: "10px", flexShrink: 0, width: "20%" }}>
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

                <h1 className="text-3xl font-bold mb-2 pt-5">Top Rated</h1>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    {ratedMovies.map((movie) => (
                        <div key={movie.id} style={{ marginRight: "10px", flexShrink: 0, width: "20%" }}>
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

                <h1 className="text-3xl font-bold mb-2 pt-5">Now Playing</h1>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    {playingMovies.map((movie) => (
                        <div key={movie.id} style={{ marginRight: "10px", flexShrink: 0, width: "20%" }}>
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
        </div>
    );
}

export default Home;
