import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import EmptyState from "./EmptyState";
import Filters from "./Filters";
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { setUrlQuery } from "../features/MovieDetailsSlice";
import { tmdbApiUrl } from "../utils/tmdb";
import { applyMovieFilters } from "../utils/movieFilters";
import { useMovieFilters } from "../utils/useMovieFilters";

function fetchSearchPage(searchQuery, page) {
  return fetch(
    tmdbApiUrl(`/search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}`)
  ).then((response) => (response.ok ? response.json() : null));
}

function MovieSearchResults() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useParams();
  const dispatch = useDispatch();
  const filters = useMovieFilters();

  const searchQuery = useMemo(() => {
    if (!query) return "";
    let decoded = query;
    try {
      decoded = decodeURIComponent(query);
    } catch {
      decoded = query;
    }
    return decoded.replace(/-/g, " ").trim();
  }, [query]);

  const list = useMemo(() => applyMovieFilters(movies, filters), [movies, filters]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;
  
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setMovies([]);
    setPage(1);
    setTotalPages(0);

    if (!searchQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchSearchPage(searchQuery, 1)
      .then((data) => {
        if (cancelled) return;
        setMovies(data?.results || []);
        setPage(data?.page ?? 1);
        setTotalPages(data?.total_pages ?? 0);
      })
      .catch(() => {
        if (!cancelled) setMovies([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  function handleLoadMore() {
    if (isLoadingMore || !searchQuery || page >= totalPages) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);
    fetchSearchPage(searchQuery, nextPage)
      .then((data) => {
        const newMovies = data?.results || [];
        setMovies((prev) => {
          const existingIds = new Set(prev.map((movie) => movie.id));
          return [...prev, ...newMovies.filter((movie) => !existingIds.has(movie.id))];
        });
        setPage(data?.page ?? nextPage);
        setTotalPages(data?.total_pages ?? totalPages);
      })
      .catch(() => {})
      .finally(() => setIsLoadingMore(false));
  }

  const loadMoreButton =
    !isLoading && page < totalPages ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "28px",
          marginBottom: "24px",
        }}
      >
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          style={{
            padding: "12px 28px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: lightMode ? "#4299e1" : "#63b3ed",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: isLoadingMore ? "wait" : "pointer",
            opacity: isLoadingMore ? 0.75 : 1,
          }}
        >
          {isLoadingMore ? "Loading..." : "Load more"}
        </button>
      </div>
    ) : null;

  useEffect(() => {
    if (query) {
      dispatch(setUrlQuery(query));
    }
  }, [query, dispatch]);

  return (
    <>
      {isMobile ? (
        <div
          style={{
            display: "flex",
            backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
            minHeight: "100vh",
            padding: "10px 0.5%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Filters />

          <div
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ 
              marginBottom: "40px", 
              position: "relative",
              paddingLeft: "15px"
            }}>
              <h1
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  margin: "0 0 15px 0",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  marginBottom: "-15px"
                }}
              >
                Your Search Results
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "0",
                    width: "80px",
                    height: "4px",
                    background: lightMode ? "#4299e1" : "#63b3ed",
                    borderRadius: "2px",
                  }}
                ></span>
              </h1>
            </div>

            <div style={{ position: "relative", minHeight: "500px" }}>
              {isLoading ? (
                <FullScreenLoader />
              ) : list.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "calc(100vw - 19px)",
                    padding: "0 10px",
                    boxSizing: "border-box",
                    rowGap: "15px",
                    columnGap: "15px",
                    position: "relative",
                  }}
                >
                  {list.map((elem, index) => (
                    <MovieCard
                      key={elem.id}
                      title={elem.original_title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={list}
                      lightMode={lightMode}
                      isMobile={true}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={movies.length === 0 ? "No results found" : "No movies match your filters"}
                  message={
                    movies.length === 0
                      ? "Try a different search term"
                      : "Try adjusting your filters"
                  }
                />
              )}
            </div>
            {loadMoreButton}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
            minHeight: "100vh",
            padding: "20px 2%",
            position: "relative",
            overflow: "hidden",
            gap: "40px",
          }}
        >
          {/* Filters Sidebar - same as FavoriteList desktop */}
          <div
            style={{
              width: "270px",
              position: "relative",
              zIndex: 1,
              left: '-20px',
              marginRight: '-20px',
              top: '-10px'
            }}
          >
            <Filters />
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
            }}
            ref={containerRef}
          >
            <div style={{ 
              marginBottom: "40px", 
              position: "relative" 
            }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  top: '-15px',
                  marginBottom: '-50px'
                }}
              >
                Your Search Results
                <span
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "0",
                    width: "80px",
                    height: "4px",
                    background: lightMode ? "#4299e1" : "#63b3ed",
                    borderRadius: "2px",
                  }}
                ></span>
              </h1>
            </div>

            <div style={{ position: "relative", minHeight: "500px" }}>
              {isLoading ? (
                <FullScreenLoader />
              ) : list.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "18px",
                  }}
                >
                  {list.map((elem, index) => (
                    <MovieCard
                      key={elem.id}
                      title={elem.original_title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={list}
                      lightMode={lightMode}
                      containerWidth={containerWidth}
                      isMobile={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title={movies.length === 0 ? "No results found" : "No movies match your filters"}
                  message={
                    movies.length === 0
                      ? "Try a different search term"
                      : "Try adjusting your filters"
                  }
                />
              )}
            </div>
            {loadMoreButton}
          </div>
        </div>
      )}
    </>
  );
}

export default MovieSearchResults;