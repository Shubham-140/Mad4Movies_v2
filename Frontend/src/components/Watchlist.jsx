import Filters from "./Filters";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef, useMemo } from "react";
import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import EmptyState from "./EmptyState";
import { fetchTmdbMoviesByIds } from "../utils/tmdb";
import { applyMovieFilters } from "../utils/movieFilters";
import { useMovieFilters } from "../utils/useMovieFilters";

function WatchList() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const watchList = useSelector((state) => state.movieDetails.watchList);
  const [movies, setMovies] = useState([]);
  const filters = useMovieFilters();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!watchList.length) {
      setMovies([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetchTmdbMoviesByIds(watchList)
      .then((result) => {
        if (!cancelled) setMovies(result);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [watchList]);

  const list = useMemo(() => applyMovieFilters(movies, filters), [movies, filters]);

  return (
    <div>
      {isLoading && <FullScreenLoader />}

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
          <div
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ marginBottom: "40px", position: "relative" }}>
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
                  marginBottom: "-15px",
                  marginLeft: "15px",
                }}
              >
                Your Watchlist
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
              {list.length > 0 ? (
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
                      title={elem.title}
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
                  icon={watchList.length === 0 ? "📋" : "🔍"}
                  title={
                    watchList.length === 0
                      ? "Your watchlist is empty"
                      : "No movies match your filters"
                  }
                  message={
                    watchList.length === 0
                      ? "Add movies to watch later"
                      : "Try adjusting your filters"
                  }
                />
              )}
            </div>
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
            <div style={{ marginBottom: "40px", position: "relative" }}>
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
                Your Watchlist
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
              {list.length > 0 ? (
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
                      title={elem.title}
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
                  icon={watchList.length === 0 ? "📋" : "🔍"}
                  title={
                    watchList.length === 0
                      ? "Your watchlist is empty"
                      : "No movies match your filters"
                  }
                  message={
                    watchList.length === 0
                      ? "Add movies to watch later"
                      : "Try adjusting your filters"
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchList;