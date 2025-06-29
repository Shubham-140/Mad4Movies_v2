import { useSelector, useDispatch } from "react-redux";
import { setShowPopup } from "../features/AuthSlice";
import { useEffect, useState } from "react";
import "../index.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  decrementIndex,
  incrementIndex,
  setMovie,
  setRecentlyViewed,
} from "../features/MovieDetailsSlice";
import slugify from "slugify";
import The_Dark_Knight from "../img/The_Dark_Knight.jpg";
import The_Shawshank_Redemption from "../img/The_Shawshank_Redemption.jpg";
import Dune from "../img/Dune.jpg";
import Interstellar from "../img/Interstellar.jpg";
import Joker from "../img/Joker.jpeg";
import Inception from "../img/Inception.jpg";
import { useMediaQuery } from "react-responsive";

function Hero() {
  const showPopup = useSelector((state) => state.auth.showPopup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goatMovies, setGoatMovies] = useState([]);
  const index = useSelector((state) => state.movieDetails.index);
  const movies = useSelector((state) => state.movieDetails.goatMovies);
  const location = useLocation();
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const isMobile = window.innerWidth < 768;
  const trailerKey = [
    "EXeTwQWrcwY",
    "6hB3S9bIaco",
    "n9xhJrPXop4",
    "dXQWzwGcACc",
    "t433PEQGErc",
    "YoHD9XEInc0",
  ];
  const images = [
    The_Dark_Knight,
    The_Shawshank_Redemption,
    Dune,
    Interstellar,
    Joker,
    Inception,
  ];

  const getTitleFontSize = () => {
    if (!isMobile) return "clamp(28px, 5vw, 50px)";
    const width = window.innerWidth;
    if (width <= 320) return "20px";
    if (width <= 375) return "22px";
    if (width <= 425) return "24px";
    return "26px";
  };

  useEffect(() => {
    setGoatMovies(null);
  }, [location.pathname]);

  useEffect(() => {
    function autoRun() {
      dispatch(incrementIndex());
    }

    const timer = setInterval(autoRun, 20000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, index]);

  function handleShowTrailer() {
    window.open(`https://www.youtube.com/watch?v=${trailerKey[index]}`);
  }

  const createSlug = (title) => {
    return encodeURIComponent(slugify(title, { lower: true, strict: true }));
  };

  function handleClickMovies() {
    dispatch(setMovie(goatMovies[index]));
    dispatch(setRecentlyViewed(goatMovies[index].id));
    navigate(
      `/movie/${goatMovies[index].id}/${createSlug(goatMovies[index].title)}`
    );
  }

  useEffect(() => {
    if (!id || mounted === false || isNaN(id) || id === undefined) {
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setMovie(data));
      });
  }, [id, dispatch, mounted]);

  useEffect(() => {
    Promise.all(
      movies.map((movie) => {
        return fetch(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        ).then((response) => {
          return response.json();
        });
      })
    ).then((data) => {
      setGoatMovies(data);
      setMounted(true);
    });
  }, [movies]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showPopup) {
        dispatch(setShowPopup(false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, showPopup]);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: isMobile ? "75vh" : "clamp(400px, 47vh, 800px)",
        backgroundImage: isMobile
          ? `url(https://image.tmdb.org/t/p/w1280/${goatMovies?.[index]?.poster_path})`
          : `url(${images[index]})`,
        backgroundSize: isMobile ? "contain" : "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        opacity: 1,
        animation: "fadeSlide 0.8s ease-in-out",
        backgroundPosition: (() => {
          if (index === 0)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "center 0px"
              : "center -160px";
          if (index === 1)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "-50px center"
              : "center -65px";
          if (index === 2)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "center 0px"
              : "center -110px";
          if (index === 3)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "-80px center"
              : "center -160px";
          if (index === 4)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "-150px center"
              : "center -90px";
          if (index === 5)
            return isMobile
              ? "0"
              : isTablet && window.innerHeight >= 900
              ? "center 0px"
              : "center -90px";
          return "center center";
        })(),
      }}
      key={index}
    >
      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateX(0px)
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes buttonHover {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.1);
            }
          }

          @keyframes chevronHover {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.2);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      <FaChevronLeft
        style={{
          position: "absolute",
          left: isMobile ? "10px" : "clamp(10px, 3vw, 30px)",
          fontSize: isMobile ? "24px" : "clamp(20px, 3vw, 30px)",
          cursor: "pointer",
          zIndex: 0,
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        onClick={() => dispatch(decrementIndex())}
      />

      <div
        style={{
          position: "relative",
          maxWidth: isMobile ? "90vw" : "min(90vw, 800px)",
          padding: isMobile ? "15px" : "clamp(10px, 3vw, 20px)",
          animation: "fadeSlide 0.8s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: getTitleFontSize(),
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
            marginBottom: isMobile ? "10px" : "clamp(8px, 1.5vw, 16px)",
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
          }}
        >
          Greatest Movies of All Time
        </h1>
        <p
          style={{
            fontSize: isMobile ? "13px" : "clamp(14px, 2vw, 18px)",
            opacity: 0.9,
            marginBottom: isMobile ? "20px" : "clamp(15px, 3vw, 30px)",
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 2 : "unset",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "1.4",
          }}
        >
          Explore the timeless classics and legendary masterpieces that have
          defined cinema.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: isMobile ? "10px" : "clamp(10px, 2vw, 15px)",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: "5px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <button
            style={{
              padding: isMobile
                ? "10px 16px"
                : "clamp(8px, 1.5vw, 12px) clamp(16px, 2.5vw, 24px)",
              fontSize: isMobile ? "14px" : "clamp(14px, 2vw, 18px)",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#e50914",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              minWidth: "fit-content",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.backgroundColor = "#f40612";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#e50914";
            }}
            onClick={() => {
              handleClickMovies();
              dispatch(setRecentlyViewed(goatMovies[index].id));
            }}
          >
            View Details
          </button>

          <button
            style={{
              padding: isMobile
                ? "10px 16px"
                : "clamp(8px, 1.5vw, 12px) clamp(16px, 2.5vw, 24px)",
              fontSize: isMobile ? "14px" : "clamp(14px, 2vw, 18px)",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "rgba(51, 51, 51, 0.8)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              minWidth: "fit-content",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.backgroundColor = "rgba(51, 51, 51, 1)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "rgba(51, 51, 51, 0.8)";
            }}
            onClick={handleShowTrailer}
          >
            Watch Trailer
          </button>
        </div>
      </div>

      <FaChevronRight
        style={{
          position: "absolute",
          right: isMobile ? "10px" : "clamp(10px, 3vw, 30px)",
          fontSize: isMobile ? "24px" : "clamp(20px, 3vw, 30px)",
          cursor: "pointer",
          zIndex: 0,
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        onClick={() => dispatch(incrementIndex())}
      />

      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "15px" : "clamp(10px, 3vw, 20px)",
          display: "flex",
          gap: isMobile ? "6px" : "clamp(5px, 1vw, 8px)",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((dotIndex) => (
          <div
            key={dotIndex}
            style={{
              width: isMobile ? "10px" : "clamp(8px, 1.5vw, 10px)",
              height: isMobile ? "10px" : "clamp(8px, 1.5vw, 10px)",
              borderRadius: "50%",
              backgroundColor:
                index === dotIndex ? "white" : "rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
