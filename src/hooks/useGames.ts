import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosError, CanceledError } from "axios";

export interface Games {
  id: number;
  name: string;
  background_image: string;
}
const useGames = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");

  interface FetchGames {
    count: number;
    results: Games;
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchGames = async () => {
      try {
        const res = await apiClient.get<FetchGames>("/games", {
          signal: controller.signal,
        });
        setGames(res.data.results);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      }
    };
    fetchGames();

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
