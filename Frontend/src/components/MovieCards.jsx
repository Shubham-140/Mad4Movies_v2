import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { filterBySeen } from "../utils/movieFilters";
import { useMovieFilters } from "../utils/useMovieFilters";
import { movieListPath } from "../utils/filterParams";
import { tmdbApiUrl } from "../utils/tmdb";

function MovieCards({
  type,
  isGridLayout = false,
  containerWidth,
  discover,
  trending,
  sort,
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);
  const requestId = useRef(0);
  const lightMode = useSelector((state) => state.color.isDarkMode);

  const filters = useMovieFilters();

  const listPath = useMemo(
    () => movieListPath({ type, trending, discover, query: sort }, filters),
    [type, trending, discover, sort, filters]
  );

  const visibleMovies = useMemo(
    () => filterBySeen(movies, filters.showMovie, filters.watched),
    [movies, filters.showMovie, filters.watched]
  );

  const windowWidth = window.innerWidth;
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    requestId.current += 1;
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    fetchMovies(1);
  }, [listPath]);

  async function fetchMovies(pageToFetch) {
    const currentRequest = requestId.current;

    try {
      const res = await fetch(`${tmdbApiUrl(listPath)}&page=${pageToFetch}`);
      const response = await res.json();
      if (currentRequest !== requestId.current) return;
      const data = response?.results || [];

      if (!data.length || pageToFetch >= Math.min(response.total_pages || 1, 500)) {
        setHasMore(false);
      }

      if (!data.length) {
        setIsLoading(false);
        return;
      }

      setMovies((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newMovies = data.filter(
          (movie) => !existingIds.has(movie.id)
        );
        return [...prev, ...newMovies];
      });

      setIsLoading(false);

      if (loadMoreRef.current && pageToFetch > 1) {
        loadMoreRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    } catch {
      if (currentRequest !== requestId.current) return;
      setHasMore(false);
      setIsLoading(false);
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoading(true);
    fetchMovies(nextPage);
  };

  const containerStyles = {
    display: "grid",
    position: "relative",
    minHeight: "500px",
    ...(isMobile && {
      gridTemplateColumns: "repeat(3, 1fr)",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "calc(100vw - 19px)",
      padding: "0 10px",
      boxSizing: "border-box",
      rowGap: "15px",
      columnGap: "15px",
    }),
    ...(!isMobile &&
      isGridLayout && {
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "18px",
      }),
    ...(!isMobile &&
      !isGridLayout && {
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        rowGap: "60px",
      }),
  };

  const loadingStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    color: lightMode ? "#4b5563" : "#9ca3af",
  };

  const loadMoreButtonStyles = {
    gridColumn: "1 / -1",
    justifySelf: "center",
    alignSelf: "start",
    padding: "10px 20px",
    margin: "20px 0",
    backgroundColor: lightMode ? "#3b82f6" : "#60a5fa",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
  };

  return (
    <div style={containerStyles}>
      {isLoading && movies.length === 0 ? (
        <FullScreenLoader />
      ) : visibleMovies.length > 0 ? (
        <>
          {visibleMovies.map((elem, index) => (
            <MovieCard
              key={elem.id}
              title={elem.title}
              date={elem.release_date}
              rating={elem.vote_average}
              image={elem.poster_path}
              index={index}
              movies={visibleMovies}
              lightMode={lightMode}
              containerWidth={containerWidth}
              isMobile={isMobile}
            />
          ))}
          {hasMore && (
            <button
              ref={loadMoreRef}
              style={loadMoreButtonStyles}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      ) : (
        <div
          style={{
            ...loadingStyles,
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: lightMode ? "#374151" : "#e5e7eb",
            }}
          >
            No movies found matching your criteria
          </p>
          <p
            style={{
              fontSize: "16px",
              color: lightMode ? "#6b7280" : "#9ca3af",
              marginTop: "8px",
            }}
          >
            Try adjusting your filters
          </p>
          {hasMore && movies.length > 0 && (
            <button
              style={loadMoreButtonStyles}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieCards;
