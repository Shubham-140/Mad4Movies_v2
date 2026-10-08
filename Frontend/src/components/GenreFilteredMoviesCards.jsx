import { useSelector } from "react-redux";
import Filters from "./Filters";
import MovieCard from "./MovieCard";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  applySeenUnseenFilter,
  buildDiscoverSearchParams,
} from "../utils/tmdbFilters";

function GenreFilteredMoviesCards() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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

  const fetchGenrePage = useCallback(
    async (pageToFetch) => {
      if (!id || Number.isNaN(id)) return null;

      const params = buildDiscoverSearchParams({
        genreIds: [id],
        rating,
        runtime,
        selectedYear,
        sortBy,
        page: pageToFetch,
      });
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
      );
      return response.json();
    },
    [id, rating, runtime, selectedYear, sortBy]
  );

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    setIsLoading(true);
    setList([]);
    setPage(1);

    fetchGenrePage(1)
      .then((data) => {
        setList(data?.results || []);
        setPage(data?.page ?? 1);
        setTotalPages(data?.total_pages ?? 0);
      })
      .catch(() => console.log(""))
      .finally(() => setIsLoading(false));
  }, [id, fetchGenrePage]);

  function handleLoadMore() {
    if (isLoadingMore || page >= totalPages) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);
    fetchGenrePage(nextPage)
      .then((data) => {
        setList((prev) => [...prev, ...(data?.results || [])]);
        setPage(data?.page ?? nextPage);
        setTotalPages(data?.total_pages ?? totalPages);
      })
      .catch(() => console.log(""))
      .finally(() => setIsLoadingMore(false));
  }

  const displayList = useMemo(
    () => applySeenUnseenFilter(list, showMovie, watched),
    [list, showMovie, watched]
  );

  const genreName = Object.keys(genreList).find((key) => genreList[key] === id);

  const loadMoreButton =
    page < totalPages ? (
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
              ) : displayList.length > 0 ? (
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
                  {displayList.map((elem, index) => (
                    <MovieCard
                      key={elem.id}
                      title={elem.title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={displayList}
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
                  <p>No movies found matching your filters</p>
                </div>
              )}
              {!isLoading && loadMoreButton}
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
              ) : displayList.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "18px",
                  }}
                >
                  {displayList.map((elem, index) => (
                    <MovieCard
                      key={elem.id}
                      title={elem.title}
                      date={elem.release_date}
                      rating={elem.vote_average}
                      image={elem.poster_path}
                      index={index}
                      movies={displayList}
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
                  <p>No movies found matching your filters</p>
                </div>
              )}
              {!isLoading && loadMoreButton}
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
