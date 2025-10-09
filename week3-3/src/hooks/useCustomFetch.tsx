import { useState, useEffect } from "react";
import type { MovieResponse } from "../types/movie";
import axios from "axios";
import { useParams } from "react-router-dom";

export function useCustomFetch() {
    const [data, setData] = useState<MovieResponse | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const { category } = useParams<{ category?: string }>();
    const [page, setPage] = useState(1);

  useEffect(() => {
    if (!category) return;

    const fetchMovies = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const res = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setData(res.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  return { data, isPending, isError, page, setPage };
}
