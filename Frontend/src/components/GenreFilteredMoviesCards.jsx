import { useSelector } from "react-redux";
import Filters from "./Filters";
import MovieCard from "./MovieCard";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function GenreFilteredMoviesCards() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [list, setList] = useState([]);
  const genreList = useSelector((state) => state.movieDetails.genreList);
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort);
  const rating = useSelector((state) => state.movieDetails.rating);
  const showMovie = useSelector((state) => state.movieDetails.showMovie);
  const watched = useSelector((state) => state.movieDetails.watched);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&with_genres=${id}`
        );
        const data = await response.json();
        let allMovies = data?.results || [];

        const moviesWithRuntime = await Promise.all(
          allMovies.map(async (movie) => {
            const detailsRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
                import.meta.env.VITE_TMDB_API_KEY
              }`
            );
            const detailsData = await detailsRes.json();
            return { ...movie, runtime: detailsData.runtime || 0 };
          })
        );

        let filteredMovies = moviesWithRuntime.filter((movie) => {
          return (
            (!rating[0] || movie.vote_average >= Number(rating[0])) &&
            (!rating[1] || movie.vote_average <= Number(rating[1])) &&
            (!runtime[0] || movie.runtime >= Number(runtime[0])) &&
            (!runtime[1] || movie.runtime <= Number(runtime[1])) &&
            (!selectedYear[0] ||
              (movie.release_date &&
                movie.release_date.slice(0, 4) >= Number(selectedYear[0]))) &&
            (!selectedYear[1] ||
              (movie.release_date &&
                movie.release_date.slice(0, 4) <= Number(selectedYear[1])))
          );
        });

        if (sortBy === "Release Date (Asc)") {
          filteredMovies.sort(
            (a, b) =>
              new Date(a.release_date || "1900-01-01") -
              new Date(b.release_date || "1900-01-01")
          );
        } else if (sortBy === "Release Date (Desc)") {
          filteredMovies.sort(
            (a, b) =>
              new Date(b.release_date || "1900-01-01") -
              new Date(a.release_date || "1900-01-01")
          );
        } else if (sortBy === "Rating") {
          filteredMovies.sort(
            (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
          );
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
      } catch {
        console.log("");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [id, runtime, selectedYear, rating, sortBy, watched, showMovie]);

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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                </div>
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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                </div>
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

export default GenreFilteredMoviesCards;
