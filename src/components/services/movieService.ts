import axios from "axios";
import { type Movie } from "../types/movie";

interface MovieResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_result: number;
}
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie"; 
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(BASE_URL, {
        params: {
            query,
        }, 

        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    });
  
        return response.data.results;
    };
















