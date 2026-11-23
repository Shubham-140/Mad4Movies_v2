import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { applyMovieFilters } from "../utils/movieFilters";
import { useMovieFilters } from "../utils/useMovieFilters";

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
  const lightMode = useSelector((state) => state.color.isDarkMode);

  const filters = useMovieFilters();

  const windowWidth = window.innerWidth;
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    fetchMovies(1);
  }, [
    type,
    trending,
    discover,
    sort,
    filters,
  ]);

  async function fetchMovies(pageToFetch) {
    let filteredMovies = [];
    let baseUrl = `https://api.themoviedb.org/3/${
      discover
        ? "discover/movie"
        : trending
        ? `trending/movie/${type}`
        : `movie/${type}`
    }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

    try {
      const res = await fetch(
        `${baseUrl}&page=${pageToFetch}${sort ? `&${sort}` : ""}`
      );
      const response = await res.json();
      const data = response?.results || [];

      if (!data.length) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      filteredMovies = applyMovieFilters(data, filters);

      setMovies((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newMovies = filteredMovies.filter(
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
      console.log("");
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
      ) : movies.length > 0 ? (
        <>
          {movies.map((elem, index) => (
            <MovieCard
              key={elem.id}
              title={elem.title}
              date={elem.release_date}
              rating={elem.vote_average}
              image={elem.poster_path}
              index={index}
              movies={movies}
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
        </div>
      )}
    </div>
  );
}

export default MovieCards;
