import { useSelector } from "react-redux";
import Filters from "./Filters";
import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import EmptyState from "./EmptyState";
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { tmdbApiUrl } from "../utils/tmdb";
import { filterBySeen } from "../utils/movieFilters";
import { useMovieFilters } from "../utils/useMovieFilters";
import { movieListPath } from "../utils/filterParams";

function GenreFilteredMoviesCards() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [movies, setMovies] = useState([]);
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const filters = useMovieFilters();
  const { genreId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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

  const id = Number(genreId);

  const listPath = useMemo(
    () =>
      movieListPath(
        { discover: true, query: `with_genres=${id}` },
        { ...filters, genre: [] }
      ),
    [id, filters]
  );

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(tmdbApiUrl(listPath));
        const data = response.ok ? await response.json() : null;
        if (!cancelled) setMovies(data?.results || []);
      } catch {
        if (!cancelled) setMovies([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [listPath]);

  const list = useMemo(
    () => filterBySeen(movies, filters.showMovie, filters.watched),
    [movies, filters.showMovie, filters.watched]
  );

  const genreName = Object.keys(genreList).find((key) => genreList[key] === id);

  return (
    <div>
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
            <div
              style={{
                marginBottom: "40px",
                position: "relative",
                paddingLeft: "15px", 
              }}
            >
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
                }}
              >
                {genreName} Movies
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
                  title="No movies match your filters"
                  message="Try adjusting your filters"
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
              left: "-20px",
              marginRight: "-20px",
              top: "-10px",
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
            <div
              style={{
                marginBottom: "40px",
                position: "relative",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  top: "-15px",
                  marginBottom: "-50px",
                }}
              >
                {genreName} Movies
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
                  title="No movies match your filters"
                  message="Try adjusting your filters"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenreFilteredMoviesCards;
