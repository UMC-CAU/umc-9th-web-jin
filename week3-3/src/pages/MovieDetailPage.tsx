import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../types/detail";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";


const MovieDetailPage = () => {

    const { movieId } = useParams<{ movieId: string }>();

    const [details, setDetails] = useState<Detail | null>(null);

    const [isPending, setIsPending] = useState(false);

    const [isError, setIsError] = useState(false);


    useEffect(() => {
    const fetchDetails = async () => {
    if (!movieId) return; 
        setIsPending(true);

    try {

        const { data } = await axios.get<Detail>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
            }
        );

        setDetails(data); 
        } catch {
        setIsError(true);
        } finally {
        setIsPending(false);
        }
    };

    fetchDetails();
    }, [movieId]);


    if (isError) {


    return (
        <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
        </div>
        );
    }


return (
<div className="flex flex-col items-center w-full">
    {isPending && (
    <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
    </div>
    )}

    {!isPending && details && (
    <div className="relative w-full max-w-6xl">
        {details.backdrop_path && (
        <img
            src={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
            alt={details.title}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-2xl"
        />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent rounded-2xl"></div>

        <div className="absolute bottom-4 left-4 text-white p-4 rounded max-w-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{details.title}</h1>
        <p className="mt-1">평균 {details.vote_average}</p>
        <p>{details.runtime}분</p>
        {details.tagline && (
            <h2 className="text-md sm:text-lg md:text-xl font-bold">"{details.tagline}"</h2>
        )}
        <p className="mt-2">{details.overview}</p>
        </div>
    </div>
    )}
</div>
);

}

export default MovieDetailPage;