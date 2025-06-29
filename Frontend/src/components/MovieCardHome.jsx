import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { FiStar } from "react-icons/fi";
import { FaPlay, FaPlus, FaInfoCircle } from "react-icons/fa";
import { setRecentlyViewed } from "../features/MovieDetailsSlice";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

function MovieCardHome({
  upcoming,
  trending,
  week,
  nowPlaying,
  recommendations,
  ID,
  similar,
}) {
  const [movies, setMovies] = useState([]);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleClickTitle(movie) {
    dispatch(setRecentlyViewed(movie.id));
    navigate(`/movie/${movie.id}/${createSlug(movie.title)}`);
  }

  const createSlug = (title) => {
    return encodeURIComponent(slugify(title, { lower: true, strict: true }));
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${
        recommendations && ID
          ? `movie/${ID}/recommendations`
          : similar && ID
          ? `movie/${ID}/similar`
          : trending
          ? "trending/movie/week"
          : upcoming
          ? "movie/upcoming"
          : nowPlaying
          ? "movie/now_playing"
          : "movie/popular"
      }?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, [upcoming, week, trending, nowPlaying, ID, recommendations, similar]);

  const getCardStyles = () => {
    if (windowWidth < 768) { 
      return {
        width: "125px",
        height: "250px",
        margin: "0 0px",
      };
    } else if (windowWidth < 1024) { 
      return {
        width: "160px",
        height: "300px",
        margin: "0 10px",
      };
    } else { 
      return {
        width: "185px",
        height: "375px",
        margin: "0 5px",
      };
    }
  };

  const getImageContainerStyles = () => {
    if (windowWidth < 768) {
      return { height: "190px" };
    } else if (windowWidth < 1024) {
      return { height: "240px" };
    } else {
      return { height: "300px" };
    }
  };

  const getInfoContainerStyles = () => {
    if (windowWidth < 768) {
      return { padding: "12px", height: "60px" };
    } else if (windowWidth < 1024) {
      return { padding: "14px", height: "70px" };
    } else {
      return { padding: "16px", height: "80px" };
    }
  };

  const getTitleStyles = () => {
    if (windowWidth < 768) {
      return { fontSize: "12px" };
    } else if (windowWidth < 1024) {
      return { fontSize: "14px" };
    } else {
      return { fontSize: "16px" };
    }
  };

  const getTitleContainerStyles = () => {
    if (windowWidth < 768) {
      return { width: "100%" };
    } else if (windowWidth < 1024) {
      return { width: "100%" };
    } else {
      return { width: "100%" };
    }
  };

  const getMetaStyles = () => {
    if (windowWidth < 768) {
      return { fontSize: "10px", gap: "4px" };
    } else if (windowWidth < 1024) {
      return { fontSize: "11px", gap: "6px" };
    } else {
      return { fontSize: "13px", gap: "8px" };
    }
  };

  const getRatingStyles = () => {
    if (windowWidth < 768) {
      return { 
        width: "28px", 
        height: "28px", 
        fontSize: "10px",
        top: "-14px",
        right: "12px"
      };
    } else if (windowWidth < 1024) {
      return { 
        width: "32px", 
        height: "32px", 
        fontSize: "11px",
        top: "-16px",
        right: "14px"
      };
    } else {
      return { 
        width: "36px", 
        height: "36px", 
        fontSize: "13px",
        top: "-18px",
        right: "16px"
      };
    }
  };

  const getActionButtonStyles = () => {
    if (windowWidth < 768) {
      return { 
        width: "28px", 
        height: "28px", 
        fontSize: "10px",
        gap: "10px",
        bottom: "12px"
      };
    } else if (windowWidth < 1024) {
      return { 
        width: "32px", 
        height: "32px", 
        fontSize: "12px",
        gap: "12px",
        bottom: "16px"
      };
    } else {
      return { 
        width: "38px", 
        height: "38px", 
        fontSize: "14px",
        gap: "16px",
        bottom: "20px"
      };
    }
  };

  const getPlayButtonStyles = () => {
    const base = getActionButtonStyles();
    if (windowWidth < 768) {
      return { ...base, width: "30px", height: "30px" };
    } else if (windowWidth < 1024) {
      return { ...base, width: "34px", height: "34px" };
    } else {
      return { ...base, width: "42px", height: "42px" };
    }
  };

  const cardBaseStyle = {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    boxShadow: lightMode
      ? "0 8px 16px -4px rgba(0, 0, 0, 0.1)"
      : "0 8px 16px -4px rgba(0, 0, 0, 0.3)",
    background: lightMode ? "#ffffff" : "#141414",
    flex: "0 0 auto",
    cursor: "pointer",
  };

  const imageBaseStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease, filter 0.3s ease",
    filter: "brightness(0.95)",
  };

  const overlayBaseStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  };

  const actionButtonsBaseStyle = {
    position: "absolute",
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    opacity: 0,
    transform: "translateY(20px)",
    transition: "all 0.3s ease 0.1s",
  };

  const actionButtonBaseStyle = {
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  const playButtonBaseStyle = {
    ...actionButtonBaseStyle,
    background: "#e50914",
    color: "#fff",
  };

  const infoContainerBaseStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: lightMode ? "#ffffff" : "#141414",
  };

  const ratingBaseStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f5c518 0%, #f5a623 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontWeight: "bold",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  const titleBaseStyle = {
    fontWeight: "700",
    color: lightMode ? "#000000" : "#ffffff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    letterSpacing: "0.2px",
    cursor: "pointer",
    width: "100%",
    display: "block",
  };

  const metaBaseStyle = {
    color: lightMode ? "#666666" : "#a3a3a3",
    margin: "0",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {movies.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "visible",
            width: "100%",
          }}
        >
          <div
            ref={containerRef}
            style={{
              display: "flex",
              gap: windowWidth < 768 ? "8px" : windowWidth < 1024 ? "10px" : "13px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: windowWidth < 768 ? "0px 8px" : windowWidth < 1024 ? "10px" : "12px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              width: "100%",
              minHeight: windowWidth < 768 ? "250px" : windowWidth < 1024 ? "320px" : "400px",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                style={{ ...cardBaseStyle, ...getCardStyles() }}
                onClick={() => handleClickTitle(movie)}
              >
                <div style={{ ...getImageContainerStyles(), position: "relative", width: "100%", overflow: "hidden" }}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    alt={movie.title}
                    style={imageBaseStyle}
                    className="movie-image"
                    draggable="false"
                  />
                  <div style={overlayBaseStyle} className="movie-overlay"></div>
                  <div style={{ ...actionButtonsBaseStyle, ...getActionButtonStyles() }} className="movie-actions">
                    <button
                      style={{ ...playButtonBaseStyle, ...getPlayButtonStyles() }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <FaPlay />
                    </button>
                    <button
                      style={{ ...actionButtonBaseStyle, ...getActionButtonStyles() }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <FaPlus />
                    </button>
                    <button
                      style={{ ...actionButtonBaseStyle, ...getActionButtonStyles() }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <FaInfoCircle />
                    </button>
                  </div>
                </div>
                <div style={{ ...infoContainerBaseStyle, ...getInfoContainerStyles() }}>
                  <div style={{ ...ratingBaseStyle, ...getRatingStyles() }}>
                    <FiStar
                      style={{
                        marginRight: "2px",
                        fontSize: windowWidth < 768 ? "8px" : windowWidth < 1024 ? "10px" : "12px",
                      }}
                    />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div style={{ ...getTitleContainerStyles() }}>
                    <h3
                      style={{ 
                        ...titleBaseStyle, 
                        ...getTitleStyles(),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickTitle(movie);
                      }}
                    >
                      {movie.title}
                    </h3>
                  </div>
                  <p style={{ ...metaBaseStyle, ...getMetaStyles() }}>
                    <span>{movie.release_date?.substring(0, 4)}</span>
                    <span>•</span>
                    <span>Movie</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {movies.length === 0 && (
        <div
          style={{
            color: lightMode ? "#333" : "#fff",
            fontSize: windowWidth < 768 ? "16px" : windowWidth < 1024 ? "18px" : "20px",
            textAlign: "center",
            padding: windowWidth < 768 ? "20px" : windowWidth < 1024 ? "30px" : "40px",
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          ↦ Coming Soon, Please Stay Tuned! ↤
        </div>
      )}

      <style>
        {`
          div[style*="overflow-x: auto"]::-webkit-scrollbar {
            display: none;
          }
          div[style*="overflow-x: auto"] {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

MovieCardHome.propTypes = {
  upcoming: PropTypes.bool,
  trending: PropTypes.bool,
  week: PropTypes.bool,
  nowPlaying: PropTypes.bool,
  recommendations: PropTypes.bool,
  ID: PropTypes.number,
  similar: PropTypes.bool,
};

export default MovieCardHome;