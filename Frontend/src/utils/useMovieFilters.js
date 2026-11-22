import { useMemo } from "react";
import { useSelector } from "react-redux";

export function useMovieFilters() {
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const selectedGenre = useSelector((state) => state.movieDetails.selectedGenre);
  const rating = useSelector((state) => state.movieDetails.rating);
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const watched = useSelector((state) => state.movieDetails.watched);

  const genre = useMemo(
    () => (selectedGenre || []).map((name) => genreList?.[name]).filter(Boolean),
    [genreList, selectedGenre]
  );

  return useMemo(
    () => ({ genre, rating, runtime, selectedYear, sortBy, showMovie, watched }),
    [genre, rating, runtime, selectedYear, sortBy, showMovie, watched]
  );
}
