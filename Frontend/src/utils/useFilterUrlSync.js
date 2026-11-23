import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setFilters } from "../features/MovieDetailsSlice";
import { filtersToSearchParams, searchParamsToFilters } from "./filterParams";

export function useFilterUrlSync() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const genre = useSelector((state) => state.movieDetails.selectedGenre);
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const rating = useSelector((state) => state.movieDetails.rating);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const readUrl = useRef(false);
  const skipNextWrite = useRef(false);

  useEffect(() => {
    if (readUrl.current) return;
    readUrl.current = true;
    const fromUrl = searchParamsToFilters(searchParams, genreList);
    if (fromUrl) {
      skipNextWrite.current = true;
      dispatch(setFilters(fromUrl));
    }
  }, [searchParams, genreList, dispatch]);

  useEffect(() => {
    if (!readUrl.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const next = filtersToSearchParams(
      { genre, runtime, rating, selectedYear, sortBy, showMovie },
      searchParams
    );
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next.toString().replace(/%2C/gi, ","), { replace: true });
    }
  }, [genre, runtime, rating, selectedYear, sortBy, showMovie, searchParams, setSearchParams]);
}
