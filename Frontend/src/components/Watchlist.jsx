import Filters from "./Filters";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";

function WatchList() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const watchList = useSelector((state) => state.movieDetails.watchList);
  const [list, setList] = useState([]);
  const [genre, setGenre] = useState([]);
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const rating = useSelector((state) => state.movieDetails.rating);
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const watched = useSelector((state) => state.movieDetails.watched);
  const selectedGenre = useSelector((state) => state.movieDetails.selectedGenre);
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
    setGenre(selectedGenre?.map((name) => genreList?.[name]).filter(Boolean));
  }, [genreList, selectedGenre]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await Promise.all(
          watchList.map((id) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
            ).then((response) => response.json())
          )
        );

        const allMovies = [...result];

        let filteredMovies = allMovies
          .map((movie) => ({
            ...movie,
            genre_ids: movie.genres?.map((genre) => genre.id) || [],
          }))
          .filter(
            (movie) =>
              (!genre.length ||
                movie.genre_ids.some((g) => genre.includes(g))) &&
              (!rating[0] || movie.vote_average >= Number(rating[0])) &&
              (!rating[1] || movie.vote_average <= Number(rating[1])) &&
              (!runtime[0] || movie.runtime >= Number(runtime[0])) &&
              (!runtime[1] || movie.runtime <= Number(runtime[1])) &&
              (!selectedYear[0] ||
                movie.release_date.slice(0, 4) >= Number(selectedYear[0])) &&
              (!selectedYear[1] ||
                movie.release_date.slice(0, 4) <= Number(selectedYear[1]))
          );

        if (sortBy === "Release Date (Asc)") {
          filteredMovies.sort(
            (a, b) => new Date(a.release_date) - new Date(b.release_date)
          );
        } else if (sortBy === "Release Date (Desc)") {
          filteredMovies.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
        } else if (sortBy === "Rating") {
          filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
        }

        if (showMovie === "Seen") {
          filteredMovies = filteredMovies.filter((movie) =>
            watched.includes(movie.id)
          );
        } else if (showMovie === "Unseen") {
          filteredMovies = filteredMovies.filter(
            (movie) => !watched.includes(movie.id)
          );
        }

        setList(filteredMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (watchList.length) fetchData();
    else setList([]);
  }, [
    watchList,
    genre,
    runtime,
    selectedYear,
    rating,
    sortBy,
    showMovie,
    watched,
  ]);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: `4px solid ${lightMode ? "#e2e8f0" : "#4a5568"}`,
              borderTop: `4px solid ${lightMode ? "#4299e1" : "#63b3ed"}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p
            style={{
              marginTop: "16px",
              color: lightMode ? "#4a5568" : "#a0aec0",
              fontSize: "1rem",
            }}
          >
            Loading...
          </p>
        </div>
      )}

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
                    {watchList.length === 0 ? "📋" : "🔍"}
                  </div>
                  <p>
                    {watchList.length === 0
                      ? "Your watchlist is empty"
                      : "No movies match your filters"}
                  </p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    {watchList.length === 0
                      ? "Add movies to watch later"
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
                    {watchList.length === 0 ? "📋" : "🔍"}
                  </div>
                  <p>
                    {watchList.length === 0
                      ? "Your watchlist is empty"
                      : "No movies match your filters"}
                  </p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    {watchList.length === 0
                      ? "Add movies to watch later"
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

export default WatchList;