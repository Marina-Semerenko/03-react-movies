import { useState } from 'react'
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from '../types/movie';;
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { searchMovies } from '../../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {   
   const [movies, setMovies] = useState<Movie[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState<Movie | null>(null); 
   const [error, setError] = useState(false);
   
   const fetchMovies = async (query: string) => {
      try {
         setMovies([]);    
         setError(false);
         setIsLoading(true);     
     
         const data = await searchMovies(query);

            if (data.length === 0) {
               toast.error('No movies found for your request.');
               return;
            }
            setMovies(data);
         }  catch {
            setError(true);
         }  finally {
            setIsLoading(false);
         }
   };
    
   return (
       <>
         <Toaster />
         <SearchBar onSubmit={fetchMovies} />

          {isLoading && <Loader />}
          {error && <ErrorMessage />}          
           
          {movies.length > 0 && (
        <MovieGrid movies={movies}
          onSelect={setSearchQuery} />
      )}
           {searchQuery && (
        <MovieModal
          movie={searchQuery}
          onClose={() => setSearchQuery(null)}
        />
      )}
    </>
   );
}













































/*
{ 
  params:  { 
    // твои параметры 
  },
   headers:  { 
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmE2N2Y5MjFmYmMxNDY2NDUzMmRlNWZlYWQ0MGU0YiIsIm5iZiI6MTc3NDQ2MjYzOC4xOTUwMDAyLCJzdWIiOiI2OWM0MjZhZTBiMTM0NzNmNWMwNmM2YjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o_5VONV9jfrAqUx_BQG5_eBWfvxpAx-g_fNv7t6pwrg`
   }
}
*/