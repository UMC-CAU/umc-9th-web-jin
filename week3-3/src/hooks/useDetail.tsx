import { useState, useEffect } from "react";
import type { Detail } from "../types/detail";
import axios from "axios";


export function useCustomFetchDetail(movieId: string) {
    const [data, setData] = useState<Detail | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!movieId) return;

    const fetchDetail = async () => {
    setIsPending(true);
    setIsError(false);
    try {
        const res = await axios.get<Detail>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
        );
        setData(res.data);
    } catch {
        setIsError(true);
    } finally {
        setIsPending(false);
    }
    };

    void fetchDetail();
}, [movieId]);

return { data, isPending, isError };
}
