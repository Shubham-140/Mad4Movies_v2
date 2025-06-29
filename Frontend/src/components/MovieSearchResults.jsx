import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import Filters from "./Filters";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { setUrlQuery } from "../features/MovieDetailsSlice";

function MovieSearchResults() {
  const [movies, setMovies] = useState([]);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useParams();
  const dispatch = useDispatch();
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
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data?.results || []));
  }, [query]);

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
              <p
                style={{
                  fontSize: "1.1rem",
                  color: lightMode ? "#4a5568" : "#a0aec0",
                  margin: "0",
                  maxWidth: "600px",
                  lineHeight: "1.6",
                }}
              >
                {movies?.length === 0 && "No results found"}
              </p>
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
                    Loading results...
                  </p>
                </div>
              ) : movies?.length > 0 ? (
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
                  {movies.map((elem, index) => (
                    <MovieCard
                      key={index}
                      title={elem.original_title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={movies}
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
                    🔍
                  </div>
                  <p>No results found</p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    Try a different search term
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
              <p
                style={{
                  fontSize: "1.1rem",
                  color: lightMode ? "#4a5568" : "#a0aec0",
                  margin: "0",
                  maxWidth: "600px",
                  lineHeight: "1.6",
                }}
              >
                {movies?.length === 0 && "No results found"}
              </p>
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
                    Loading results...
                  </p>
                </div>
              ) : movies?.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "18px",
                  }}
                >
                  {movies.map((elem, index) => (
                    <MovieCard
                      key={index}
                      title={elem.original_title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={movies}
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
                    🔍
                  </div>
                  <p>No results found</p>
                  <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                    Try a different search term
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
    </>
  );
}

export default MovieSearchResults;