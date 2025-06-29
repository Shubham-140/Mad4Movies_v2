import "@fontsource/baloo-bhai-2";
import "@fontsource/bebas-neue";
import { useDispatch, useSelector } from "react-redux";
import CastDetails from "./CastDetails";
import DirectorDetails from "./DirectorProducerWriterDetails";
import Recommendations from "./Recommendations";
import Similar from "./Similar";
import { useEffect, useState, useRef } from "react";
import ReviewSection from "./ReviewSection";
import {
  setMovieId,
  setShowShare,
  setSingleGenre,
  toggleFavoriteMovies,
  toggleWatchedMovies,
  toggleWatchList,
  setRecentlyViewed,
  loadAllFavorites,
  loadAllWatched,
  loadAllWatchList,
} from "../features/MovieDetailsSlice";
import store from "../app/store";
import More from "./More";
import { useNavigate, useParams } from "react-router-dom";
import Share from "./Share";
import { saveUserDetails, setLoginWindow } from "../features/AuthSlice";
import { useQuery } from "@tanstack/react-query";

const MovieComponent = () => {
  const [movie, setMovie] = useState({});
  const currentUser = useSelector((state) => state.auth.currentUser);
  const posterImage = `https://image.tmdb.org/t/p/w1280${movie?.poster_path}`;
  const favorites = useSelector((state) => state?.movieDetails?.favorites);
  const watchList = useSelector((state) => state?.movieDetails?.watchList);
  const watched = useSelector((state) => state?.movieDetails?.watched);
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const titleContainerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const navigate = useNavigate();
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const showShare = useSelector((state) => state?.movieDetails?.showShare);
  const shareBtnRef = useRef();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 400);
  const [isMediumMobile, setIsMediumMobile] = useState(
    window.innerWidth >= 400 && window.innerWidth < 600
  );
  const [isLargeMobile, setIsLargeMobile] = useState(
    window.innerWidth >= 600 && window.innerWidth < 768
  );
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 &&
      window.innerWidth <= 1024 &&
      window.innerHeight >= 900
  );

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    dispatch(loadAllFavorites(currentUser.favorites));
    dispatch(loadAllWatchList(currentUser.watchList));
    dispatch(loadAllWatched(currentUser.watched));
  }, [currentUser, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 400);
      setIsMediumMobile(width >= 400 && width < 600);
      setIsLargeMobile(width >= 600 && width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(setMovieId(id));
  }, [id, dispatch]);

  function setGenre(genreId) {
    dispatch(setSingleGenre(genreId));
    navigate(`/movies/genre/${genreId}`);
  }

  useEffect(() => {
    const updateTitleScroll = () => {
      if (titleRef.current && titleContainerRef.current) {
        const titleWidth = titleRef.current.scrollWidth;
        const containerWidth = titleContainerRef.current.offsetWidth;
        setShouldScroll(titleWidth > containerWidth);
      }
    };

    const timer = setTimeout(updateTitleScroll, 100);
    window.addEventListener("resize", updateTitleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateTitleScroll);
    };
  }, [movie?.title]);

  const {} = useQuery({
    queryKey: ["movie", id],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      )
        .then((response) => {
          return response?.json();
        })
        .then((data) => {
          setMovie(data);
        }),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24 * 2,
    onSuccess: () => dispatch(setRecentlyViewed(id)),
  });

  const heroStyles = {
    container: {
      position: "relative",
      width: "100vw",
      height: isMobile ? "auto" : "102.6vh",
      display: "flex",
      alignItems: isMobile ? "flex-start" : "flex-end",
      justifyContent: isMobile ? "center" : "flex-start",
      padding: isSmallMobile
        ? "100px 4% 30px"
        : isMediumMobile
        ? "110px 5% 35px"
        : isLargeMobile
        ? "120px 6% 40px"
        : isTablet
        ? "0 7% 7%"
        : "0 8% 8%",
      color: "#fff",
      overflow: "hidden",
      flexDirection: isMobile ? "column" : "row",
    },
    backdrop: {
      position: "absolute",
      top: "-19px",
      left: "0",
      width: "100%",
      height: isSmallMobile
        ? "70vh"
        : isMediumMobile
        ? "72vh"
        : isLargeMobile
        ? "74vh"
        : "105%",
      backgroundImage: `url(${posterImage})`,
      backgroundSize: isTablet ? "contain" : "cover",
      backgroundPosition: "center",
      filter: isTablet
        ? "brightness(0.65) blur(1px)"
        : "brightness(0.3) blur(5px)",
      zIndex: 0,
    },
    gradientOverlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "0%",
      height: isMobile ? "0vh" : "100%",
      background: isMobile
        ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2))"
        : "linear-gradient(to top, rgba(0, 0, 0,0.2), rgba(0, 0, 0, 0.2))",
      zIndex: 1,
    },
    posterContainer: {
      position: isMobile ? "absolute" : "absolute",
      top: isSmallMobile
        ? "0px"
        : isMediumMobile
        ? "0px"
        : isLargeMobile
        ? "0px"
        : "45%",
      right: isMobile ? "unset" : isTablet ? "10%" : "12%",
      left: isMobile ? "50%" : isTablet ? "0px" : "",
      transform: isMobile ? "translateX(-50%)" : "translateY(-50%)",
      width: isSmallMobile
        ? "100%"
        : isMediumMobile
        ? "100%"
        : isLargeMobile
        ? "100%"
        : isTablet
        ? `calc(31.5% + (100vw - 768px) * 0.2)` // Dynamic scaling for tablet
        : "31.5%",
      height: isSmallMobile
        ? "70vh"
        : isMediumMobile
        ? "72vh"
        : isLargeMobile
        ? "74vh"
        : isTablet
        ? "0%"
        : "97%",
      border: "none",
      overflow: "hidden",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 1)",
      zIndex: 2,
    },
    poster: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "transform 0.5s ease",
    },
    textContent: {
      position: "relative",
      maxWidth: isMobile ? "100%" : "400%",
      zIndex: 2,
      left: isMobile ? "0" : isTablet ? "0px" : "-70px",
      marginTop: isSmallMobile
        ? "48vh"
        : isMediumMobile
        ? "50vh"
        : isLargeMobile
        ? "51vh"
        : "0",
      padding: isSmallMobile
        ? "0 15px"
        : isMediumMobile
        ? "0 18px"
        : isLargeMobile
        ? "0 20px"
        : "0",
    },
    titleContainer: {
      position: isMobile ? "relative" : "absolute",
      top: isSmallMobile
        ? "25px"
        : isMediumMobile
        ? "28px"
        : isLargeMobile
        ? "30px"
        : "-30%",
      marginTop: isMobile
        ? isSmallMobile
          ? "60px"
          : isMediumMobile
          ? "63px"
          : "65px"
        : "",
      width: isMobile ? "100%" : isTablet ? "100%" : "40.5vw",
      overflow: "hidden",
      whiteSpace: isMobile ? "normal" : "nowrap",
      textAlign: isMobile ? "center" : "left",
      marginBottom: isMobile ? "15px" : "0",
    },
    title: {
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : "40px",
      lineHeight: "1.2",
      fontSize: isSmallMobile
        ? "1.8rem"
        : isMediumMobile
        ? "2.0rem"
        : isLargeMobile
        ? "2.2rem"
        : isTablet
        ? "3.2rem"
        : "3.5rem",
      fontFamily: "'Bebas Neue', cursive",
      display: "inline-block",
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      background: "linear-gradient(to right, #fff, #aaa)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: !isMobile ? "white" : lightMode ? "black" : "white",
      whiteSpace: isMobile ? "normal" : "nowrap",
    },
    overview: {
      maxHeight: isSmallMobile
        ? "120px"
        : isMediumMobile
        ? "135px"
        : isLargeMobile
        ? "150px"
        : "115px",
      overflowY: "auto",
      marginBottom: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : "25px",
      animation: "fadeIn 1.5s ease-in",
      paddingRight: "10px",
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      width: "100%",
    },
    overviewText: {
      fontSize: isSmallMobile
        ? "0.9rem"
        : isMediumMobile
        ? "0.95rem"
        : isLargeMobile
        ? "1.0rem"
        : isTablet
        ? "1.05rem"
        : "1.1rem",
      lineHeight: "1.7",
      fontWeight: 500,
      color: !isMobile ? "white" : lightMode ? "black" : "white",
      opacity: 0.9,
      fontFamily: "'Baloo Bhai 2', sans-serif",
      width: isSmallMobile
        ? "105%"
        : isMediumMobile
        ? "105%"
        : isLargeMobile
        ? "105%"
        : isTablet
        ? "580px"
        : "600px",
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      textAlign: isMobile ? "center" : "left",
    },
    metaData: {
      display: "flex",
      alignItems: "center",
      gap: isSmallMobile
        ? "12px"
        : isMediumMobile
        ? "15px"
        : isLargeMobile
        ? "20px"
        : "20px",
      marginTop: isMobile ? "0" : "-10px",
      marginBottom: isSmallMobile
        ? "12px"
        : isMediumMobile
        ? "14px"
        : isLargeMobile
        ? "15px"
        : "20px",
      fontFamily: "'Baloo Bhai 2', sans-serif",
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      fontSize: isSmallMobile
        ? "0.8rem"
        : isMediumMobile
        ? "0.85rem"
        : isLargeMobile
        ? "0.9rem"
        : isTablet
        ? "1rem"
        : "1.1rem",
      fontWeight: 500,
      color: "#f8f8f8",
      animation: "fadeIn 2s ease-in",
      justifyContent: isMobile ? "center" : "flex-start",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    genres: {
      display: "flex",
      flexWrap: "wrap",
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      gap: isSmallMobile
        ? "8px"
        : isMediumMobile
        ? "10px"
        : isLargeMobile
        ? "12px"
        : "12px",
      marginBottom: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : "30px",
      animation: "fadeIn 2.5s ease-in",
      justifyContent: isMobile ? "center" : "flex-start",
    },
    genreTag: {
      textShadow: "2px 2px 20px rgba(0, 0, 0,1)",
      padding: isSmallMobile
        ? "6px 12px"
        : isMediumMobile
        ? "7px 14px"
        : isLargeMobile
        ? "8px 14px"
        : isTablet
        ? "9px 16px"
        : "10px 18px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "24px",
      fontSize: isSmallMobile
        ? "0.7rem"
        : isMediumMobile
        ? "0.75rem"
        : isLargeMobile
        ? "0.8rem"
        : isTablet
        ? "0.85rem"
        : "0.9rem",
      fontFamily: "'Baloo Bhai 2', sans-serif",
      fontWeight: 600,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(4px)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      letterSpacing: "0.5px",
      color: !isMobile ? "white" : lightMode ? "black" : "white",
    },
    buttons: {
      display: "flex",
      gap: isSmallMobile
        ? "12px"
        : isMediumMobile
        ? "15px"
        : isLargeMobile
        ? "20px"
        : "20px",
      marginTop: isSmallMobile
        ? "20px"
        : isMediumMobile
        ? "22px"
        : isLargeMobile
        ? "25px"
        : "55px",
      marginBottom: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : "30px",
      animation: "fadeIn 3s ease-in",
      justifyContent: isMobile ? "center" : "flex-start",
      flexWrap: isMobile ? "wrap" : "nowrap",
      height: isMobile
        ? isSmallMobile
          ? "auto"
          : isMediumMobile
          ? "50px"
          : "50px"
        : "",
    },
    favoriteButton: {
      padding: isSmallMobile
        ? "8px 18px"
        : isMediumMobile
        ? "9px 20px"
        : isLargeMobile
        ? "10px 22px"
        : isTablet
        ? "11px 26px"
        : "12px 28px",
      background: "#e50914",
      color: "#fff",
      fontSize: isSmallMobile
        ? "0.65rem"
        : isMediumMobile
        ? "0.68rem"
        : isLargeMobile
        ? "0.69rem"
        : isTablet
        ? "0.85rem"
        : "0.95rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "'Baloo Bhai 2', cursive",
      textTransform: "uppercase",
      letterSpacing: "1px",
      boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
      flex: isMobile ? (isSmallMobile ? "1 1 100%" : "1 1 45%") : "none",
      height: isMobile
        ? isSmallMobile
          ? "40px"
          : isMediumMobile
          ? "45px"
          : "45px"
        : "",
      justifyContent: "center",
    },
    watchlistButton: {
      padding: isSmallMobile
        ? "8px 15px"
        : isMediumMobile
        ? "9px 16px"
        : isLargeMobile
        ? "10px 18px"
        : isTablet
        ? "11px 22px"
        : "12px 24px",
      background:
        "linear-gradient(135deg, rgba(109, 109, 110, 0.9), rgba(169, 169, 170, 0.9))",
      color: "#fff",
      fontSize: isSmallMobile
        ? "0.65rem"
        : isMediumMobile
        ? "0.68rem"
        : isLargeMobile
        ? "0.69rem"
        : isTablet
        ? "0.85rem"
        : "0.95rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "'Baloo Bhai 2', cursive",
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      flex: isMobile ? (isSmallMobile ? "1 1 100%" : "1 1 45%") : "none",
      height: isMobile
        ? isSmallMobile
          ? "40px"
          : isMediumMobile
          ? "45px"
          : "45px"
        : "",
      justifyContent: "center",
    },
    shareButton: {
      position: "absolute",
      top: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : isTablet
        ? "35px"
        : "40px",
      right: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : isTablet
        ? "35px"
        : "40px",
      background: "rgba(0, 0, 0, 0.5)",
      padding: isSmallMobile
        ? "8px"
        : isMediumMobile
        ? "9px"
        : isLargeMobile
        ? "10px"
        : isTablet
        ? "12px"
        : "14px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
      zIndex: 3,
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    watchedButton: {
      padding: isSmallMobile
        ? "5px 10px"
        : isMediumMobile
        ? "6px 11px"
        : isLargeMobile
        ? "6px 12px"
        : isTablet
        ? "7px 14px"
        : "8px 16px",
      background: "rgba(109, 109, 110, 0.35)",
      color: "#fff",
      fontSize: isSmallMobile
        ? "0.7rem"
        : isMediumMobile
        ? "0.72rem"
        : isLargeMobile
        ? "0.75rem"
        : isTablet
        ? "0.8rem"
        : "0.85rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      borderRadius: "6px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "'Baloo Bhai 2', sans-serif",
      textTransform: "uppercase",
      zIndex: 3,
      position: "absolute",
      bottom: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : isTablet
        ? "70px"
        : "80px",
      right: isSmallMobile
        ? "15px"
        : isMediumMobile
        ? "18px"
        : isLargeMobile
        ? "20px"
        : isTablet
        ? "7%"
        : "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      width: isSmallMobile
        ? "100px"
        : isMediumMobile
        ? "105px"
        : isLargeMobile
        ? "110px"
        : "",
      left: isMobile ? "15px" : "",
      top: isMobile
        ? isSmallMobile
          ? "15px"
          : isMediumMobile
          ? "18px"
          : "20px"
        : isTablet
        ? "89%"
        : "",
      height: isSmallMobile
        ? "28px"
        : isMediumMobile
        ? "30px"
        : isLargeMobile
        ? "30px"
        : isTablet
        ? "40px"
        : "",
    },
  };

  return (
    <>
      <div style={heroStyles.container}>
        <div style={heroStyles.backdrop} />

        <div style={heroStyles.gradientOverlay} />

        <div style={heroStyles.posterContainer}>
          <img src={posterImage} alt="Poster" style={heroStyles.poster} />
        </div>

        <div style={heroStyles.textContent}>
          <div ref={titleContainerRef} style={heroStyles.titleContainer}>
            <h1
              ref={titleRef}
              style={{
                ...heroStyles.title,
                animation:
                  !isMobile && shouldScroll
                    ? "scrollText 15s linear infinite"
                    : "none",
                paddingRight: !isMobile && shouldScroll ? "100px" : "0",
              }}
            >
              {movie?.title}
            </h1>
          </div>

          <div style={heroStyles.overview}>
            <p style={heroStyles.overviewText}>{movie?.overview}</p>
          </div>

          <div
            style={{
              ...heroStyles.metaData,
              color: !isMobile ? "white" : lightMode ? "black" : "white",
            }}
          >
            <span>📅 {movie?.release_date?.slice(0, 4) || "N/A"}</span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>
              ⏳{" "}
              {Math.floor(movie?.runtime / 60) > 0
                ? `${Math.floor(movie?.runtime / 60)}h`
                : ""}{" "}
              {movie?.runtime % 60 > 0 ? `${movie?.runtime % 60}m` : ""}
            </span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>⭐ {movie?.vote_average?.toFixed(1) || "N/A"}</span>
          </div>

          <div style={heroStyles.genres}>
            {movie?.genres?.map((g, i) => (
              <span
                key={i}
                style={heroStyles.genreTag}
                onClick={() => setGenre(g.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {g.name}
              </span>
            ))}
          </div>

          <div style={heroStyles.buttons}>
            <button
              style={{
                ...heroStyles.favoriteButton,
                background: favorites?.includes(movie?.id)
                  ? "#ff0a16"
                  : "#e50914",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff0a16";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = favorites.includes(movie?.id)
                  ? "#ff0a16"
                  : "#e50914";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={async () => {
                if (!isLoggedIn) {
                  dispatch(setLoginWindow(true));
                  return;
                }

                try {
                  dispatch(toggleFavoriteMovies(movie?.id));
                  const latestFavorites =
                    store.getState().movieDetails.favorites;

                  await dispatch(
                    saveUserDetails({
                      id: currentUser?._id,
                      userData: {
                        favorites: latestFavorites,
                      },
                    })
                  ).unwrap();
                } catch (error) {
                  console.error("Failed to update favorites:", error);
                }
              }}
            >
              <img
                src={
                  favorites?.includes(movie?.id)
                    ? "https://img.icons8.com/ios-filled/50/ffffff/dislike.png"
                    : "https://img.icons8.com/ios-filled/50/ffffff/like--v1.png"
                }
                alt="Favorite"
                style={{ width: "18px", height: "18px" }}
              />
              {favorites?.includes(movie?.id)
                ? "Remove Favorite"
                : "Add Favorite"}
            </button>

            <button
              style={{
                ...heroStyles.watchlistButton,
                background: watchList?.includes(movie?.id)
                  ? "linear-gradient(135deg, rgba(129, 129, 130, 1), rgba(189, 189, 190, 1))"
                  : "linear-gradient(135deg, rgba(109, 109, 110, 0.9), rgba(169, 169, 170, 0.9))",
              }}
              onClick={async () => {
                if (isLoggedIn === false) {
                  dispatch(setLoginWindow(true));
                  return;
                }
                try {
                  dispatch(toggleWatchList(movie?.id));
                  const latestWatchList =
                    store.getState().movieDetails.watchList;

                  await dispatch(
                    saveUserDetails({
                      id: currentUser?._id,
                      userData: {
                        watchList: latestWatchList,
                      },
                    })
                  ).unwrap();
                } catch (error) {
                  console.error("Failed to update watchlist:", error);
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(149, 149, 150, 1), rgba(209, 209, 210, 1))";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = watchList.includes(movie?.id)
                  ? "linear-gradient(135deg, rgba(129, 129, 130, 1), rgba(189, 189, 190, 1))"
                  : "linear-gradient(135deg, rgba(109, 109, 110, 0.9), rgba(169, 169, 170, 0.9))";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <img
                src={
                  watchList?.includes(movie?.id)
                    ? "https://img.icons8.com/ios-filled/50/ffffff/delete.png"
                    : "https://img.icons8.com/ios-filled/50/ffffff/plus.png"
                }
                alt="Watchlist"
                style={{ width: "18px", height: "18px" }}
              />
              {watchList?.includes(movie?.id)
                ? "Remove Watchlist"
                : "Add Watchlist"}
            </button>
          </div>
        </div>

        <div
          style={heroStyles.shareButton}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => dispatch(setShowShare(true))}
          ref={shareBtnRef}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/929/929610.png"
            alt="Share"
            style={{
              width: isSmallMobile
                ? "16px"
                : isMediumMobile
                ? "17px"
                : isLargeMobile
                ? "18px"
                : isTablet
                ? "20px"
                : "22px",
              height: isSmallMobile
                ? "16px"
                : isMediumMobile
                ? "17px"
                : isLargeMobile
                ? "18px"
                : isTablet
                ? "20px"
                : "22px",
              filter: "invert(1)",
            }}
          />
        </div>

        <button
          style={{
            ...heroStyles.watchedButton,
            background: watched?.includes(movie?.id)
              ? "rgba(76, 175, 80, 0.5)"
              : "rgba(109, 109, 110, 0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = watched?.includes(movie?.id)
              ? "rgba(76, 175, 80, 0.7)"
              : "rgba(109, 109, 110, 0.5)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = watched?.includes(movie?.id)
              ? "rgba(76, 175, 80, 0.5)"
              : "rgba(109, 109, 110, 0.35)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={async () => {
            if (isLoggedIn === false) {
              dispatch(setLoginWindow(true));
              return;
            }
            try {
              dispatch(toggleWatchedMovies(movie?.id));
              const latestWatchedMovies = store.getState().movieDetails.watched;

              await dispatch(
                saveUserDetails({
                  id: currentUser?._id,
                  userData: {
                    watched: latestWatchedMovies,
                  },
                })
              ).unwrap();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <img
            src={
              watched?.includes(movie?.id)
                ? "https://img.icons8.com/ios-filled/30/ffffff/checked.png"
                : "https://img.icons8.com/ios-filled/30/ffffff/invisible.png"
            }
            alt="Watched"
            style={{
              width: isSmallMobile
                ? "12px"
                : isMediumMobile
                ? "13px"
                : isLargeMobile
                ? "14px"
                : isTablet
                ? "16px"
                : "18px",
              height: isSmallMobile
                ? "12px"
                : isMediumMobile
                ? "13px"
                : isLargeMobile
                ? "14px"
                : isTablet
                ? "16px"
                : "18px",
            }}
          />
          {watched?.includes(movie?.id) ? "Watched !" : "Watched ?"}
        </button>
      </div>

      <CastDetails id={id} />
      <DirectorDetails id={id} />
      <Recommendations id={id} />
      <Similar id={id} />
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          padding: isTablet ? "0 7%" : "0",
          gap: isSmallMobile
            ? "20px"
            : isMediumMobile
            ? "25px"
            : isLargeMobile
            ? "30px"
            : "0",
        }}
      >
        {isMobile ? (
          <>
            <div style={{ width: "100%" }}>
              <More />
            </div>
            <div style={{ width: "100%" }}>
              <ReviewSection />
            </div>
          </>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              <ReviewSection />
            </div>
            <div style={{ flex: 1 }}>
              <More />
            </div>
          </>
        )}
      </div>

      {showShare && <Share shareBtnRef={shareBtnRef} />}

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% + ${titleContainerRef.current?.offsetWidth}px)); }
          }
        `}
      </style>
    </>
  );
};

export default MovieComponent;
