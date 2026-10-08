import MovieCard from "./MovieCard";
import { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  applySeenUnseenFilter,
  buildDiscoverSearchParams,
  hasDiscoverFilters,
  parseSortFromDiscoverProp,
} from "../utils/tmdbFilters";

function MovieCards({
  type,
  isGridLayout,
  containerWidth,
  discover,
  trending,
  sort,
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null); 
  const lightMode = useSelector((state) => state.color.isDarkMode);

  const runtime = useSelector((state) => state.movieDetails.runtime);
  const rating = useSelector((state) => state.movieDetails.rating);
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const [genre, setGenre] = useState([]);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const watched = useSelector((state) => state.movieDetails.watched);
  const selectedGenre = useSelector(
    (state) => state.movieDetails.selectedGenre
  );

  const windowWidth = window.innerWidth;
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    setGenre(selectedGenre?.map((name) => genreList?.[name]).filter(Boolean));
  }, [genreList, selectedGenre]);

  const useDiscover = useMemo(
    () =>
      discover ||
      hasDiscoverFilters({
        genreIds: genre,
        rating,
        runtime,
        selectedYear,
        sortBy,
      }),
    [discover, genre, rating, runtime, selectedYear, sortBy]
  );

  const displayMovies = useMemo(
    () => applySeenUnseenFilter(movies, showMovie, watched),
    [movies, showMovie, watched]
  );

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
    sortBy,
    rating,
    runtime,
    genre,
    selectedYear,
    useDiscover,
  ]);

  async function fetchMovies(pageToFetch) {
    try {
      let url;
      if (useDiscover) {
        const params = buildDiscoverSearchParams({
          genreIds: genre,
          rating,
          runtime,
          selectedYear,
          sortBy,
          defaultSort: parseSortFromDiscoverProp(sort) || "popularity.desc",
          page: pageToFetch,
        });
        url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
      } else {
        const baseUrl = `https://api.themoviedb.org/3/${
          trending ? `trending/movie/${type}` : `movie/${type}`
        }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
        url = `${baseUrl}&page=${pageToFetch}${sort ? sort : ""}`;
      }

      const res = await fetch(url);
      const response = await res.json();
      const data = response?.results || [];
      const apiTotalPages = response?.total_pages ?? 1;

      setTotalPages(apiTotalPages);
      setHasMore(pageToFetch < apiTotalPages);

      setMovies((prev) => {
        if (pageToFetch === 1) {
          return data;
        }
        const existingIds = new Set(prev.map((movie) => movie.id));
        const newMovies = data.filter((movie) => !existingIds.has(movie.id));
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

  const loadingSpinner = {
    width: "50px",
    height: "50px",
    border: `4px solid ${
      lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
    }`,
    borderTop: `4px solid ${lightMode ? "#3b82f6" : "#60a5fa"}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
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
      {isLoading && displayMovies.length === 0 ? (
        <div style={loadingStyles}>
          <div style={loadingSpinner} />
          <p style={{ fontSize: "18px", fontWeight: 500 }}>Loading Movies...</p>
        </div>
      ) : displayMovies.length > 0 ? (
        <>
          {displayMovies.map((elem, index) => (
            <MovieCard
              key={elem.id}
              title={elem.title}
              date={elem.release_date}
              rating={elem.vote_average}
              image={elem.poster_path}
              index={index}
              movies={displayMovies}
              lightMode={lightMode}
              containerWidth={containerWidth}
              isMobile={isMobile}
            />
          ))}
          {hasMore && page < totalPages && (
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

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

MovieCards.propTypes = {
  isGridLayout: PropTypes.bool,
  containerWidth: PropTypes.number,
  type: PropTypes.string.isRequired,
  trending: PropTypes.bool,
  discover: PropTypes.bool,
  sort: PropTypes.string,
};

MovieCards.defaultProps = {
  isGridLayout: false,
};

export default MovieCards;
