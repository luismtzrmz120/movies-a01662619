import React, { useEffect, useState } from "react";
import { IMovieDetail } from "../Recommended/types";
import { MovieCard } from "../../components/MovieCard";
import { AxiosResponse } from 'axios';
import { getMovieInfo } from "../../services";

const Favorite = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const favorites: string | null = localStorage.getItem('favorites');

    const runGetFavorite = async () => {
        setLoading(true);
        if (favorites) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) => {
                    return getMovieInfo(favorite)
                        .then((res: AxiosResponse) => {
                            if (res && res.data){
                                return res.data;
                            }
                        })
                        .catch((err: Error) => {
                            console.log(err, "err");
                        });
                })
            );
            setShow(newShows.filter((show) => show !== undefined));
        }
        setLoading(false);
    }

    useEffect(() => {
        runGetFavorite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {show.length > 0 ? (
                        <div style={{ marginLeft: "20px", overflow: "hidden" }}>
                            <h1 className="text-3xl font-bold mb-4 pt-5">My favorites</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                {show.map((show: IMovieDetail) => (
                                    <MovieCard
                                        key={show.id}
                                        movieId={show.id}
                                        title={show.title}
                                        genreId={show.genres[0].id}
                                        voteAvergae={show.vote_average}
                                        posterPath={show.poster_path}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-screen">
                            <h2 className="text-3xl font-bold">It looks like you don't have favorite movies :(</h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Favorite;
