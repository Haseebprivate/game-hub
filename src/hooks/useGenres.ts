import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenre {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGenre>("/genres", {
          signal: controller.signal,
        });
        setGenres(res.data.results);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setIsLoading(false);
      }
    };
    fetchGames();

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
