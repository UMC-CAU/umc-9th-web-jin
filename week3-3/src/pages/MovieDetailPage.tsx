import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetchDetail } from "../hooks/useDetail";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

export default function MovieDetailPage() {
const { movieId } = useParams<{ movieId?: string }>();
const { data, isPending, isError } = useCustomFetchDetail(movieId ?? ""); 

    if (isPending)
        return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
        </div>
        );

    if (isError || !data) return <NotFoundPage/>

    if (data && !isPending)
    return (
    <div className="flex flex-col items-center w-full">
        <div className="relative w-full max-w-6xl">
            {data.backdrop_path && (
            <img
                src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`}
                alt={data.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-2xl"
            />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-4 left-4 text-white p-4 rounded max-w-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{data.title}</h1>
            <p className="mt-1">평균 {data.vote_average}</p>
            <p>{data.runtime}분</p>
            {data.tagline && (
                <h2 className="text-md sm:text-lg md:text-xl font-bold">"{data.tagline}"</h2>
            )}
            <p className="mt-2">{data.overview}</p>
            </div>
        </div>
    </div>
    );
}
