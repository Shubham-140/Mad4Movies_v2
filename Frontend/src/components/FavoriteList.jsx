import Filters from "./Filters";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import FullScreenLoader from "./FullScreenLoader";
import { fetchTmdbMoviesByIds } from "../utils/tmdb";
import { filterSavedMovies } from "../utils/tmdbFilters";

function FavoriteList() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const favorites = useSelector((state) => state.movieDetails.favorites);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const rating = useSelector((state) => state.movieDetails.rating);
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const watched = useSelector((state) => state.movieDetails.watched);
  const selectedGenre = useSelector(
    (state) => state.movieDetails.selectedGenre
  );
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;
  const cardWidth = screenWidth < 1024 ? 130 : 140;

  const awaitingAuth =
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("auth_token")) &&
    !currentUser;

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setGenre(selectedGenre?.map((name) => genreList?.[name]).filter(Boolean));
  }, [genreList, selectedGenre]);

  useEffect(() => {
    if (awaitingAuth) {
      return;
    }

    if (!favorites.length) {
      setMovies([]);
      setHasLoadedOnce(true);
      return;
    }

    let cancelled = false;

    fetchTmdbMoviesByIds(favorites)
      .then((data) => {
        if (!cancelled) setMovies(data);
      })
      .finally(() => {
        if (!cancelled) setHasLoadedOnce(true);
      });

    return () => {
      cancelled = true;
    };
  }, [favorites, awaitingAuth]);

  const list = useMemo(
    () =>
      filterSavedMovies(movies, {
        genreIds: genre,
        rating,
        runtime,
        selectedYear,
        sortBy,
        showMovie,
        watched,
      }),
    [movies, genre, rating, runtime, selectedYear, sortBy, showMovie, watched]
  );

  if (awaitingAuth || !hasLoadedOnce) {
    return <FullScreenLoader />;
  }

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
                Your Favorites
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                    color: lightMode ? "#4a5568" : "#a0aec0",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3.5rem",
                      marginBottom: "1rem",
                      opacity: "0.7",
                    }}
                  >
                    {favorites.length === 0 ? "â¤ï¸" : "ð"}
                  </div>
                  <p>
                    {favorites.length === 0
                      ? "Your favorites list is empty"
                      : "No movies match your filters"}
                  </p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    {favorites.length === 0
                      ? "Add movies to your favorites"
                      : "Try adjusting your filters"}
                  </p>
                </div>
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
                  top: "-15px",
                  marginBottom: "-50px",
                }}
              >
                Your Favorites
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
                    gridTemplateColumns: `repeat(auto-fill, ${cardWidth}px)`,
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
                      isMobile={false}
                      cardWidth={cardWidth}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50vh",
                    color: lightMode ? "#4a5568" : "#a0aec0",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3.5rem",
                      marginBottom: "1rem",
                      opacity: "0.7",
                    }}
                  >
                    {favorites.length === 0 ? "â¤ï¸" : "ð"}
                  </div>
                  <p>
                    {favorites.length === 0
                      ? "Your favorites list is empty"
                      : "No movies match your filters"}
                  </p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    {favorites.length === 0
                      ? "Add movies to your favorites"
                      : "Try adjusting your filters"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default FavoriteList;
