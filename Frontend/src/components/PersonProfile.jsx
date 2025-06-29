import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import X_LightMode from "../img/X_LightMode.jpg";
import X_DarkMode from "../img/X_DarkMode.jpg";

const PersonProfile = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [artist, setArtist] = useState(undefined);
  const [topMovies, setTopMovies] = useState([]);
  const [socialMedia, setSocialMedia] = useState({});
  const { ID } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const monthMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const englishNames = (artist?.also_known_as || []).filter((name) =>
    /^[A-Za-z\s]+$/.test(name)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${ID}/external_ids?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setSocialMedia(data));
  }, [ID]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedMovies = data.cast.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setTopMovies(sortedMovies);
      });
  }, [ID]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${ID}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setArtist(data));
  }, [ID]);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "89.6vh",
        backgroundColor: lightMode ? "#f5f7fa" : "#1a1e24",
        color: lightMode ? "#2d3748" : "white",
        fontFamily: "'Netflix Sans', 'Helvetica Neue', sans-serif",
        padding: isMobile
          ? "10px 5%"
          : window.innerWidth < 1024
          ? "15px 5%"
          : "20px 5%",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }} ref={containerRef}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: isMobile
              ? "20px"
              : window.innerWidth < 1024
              ? "30px"
              : "60px",
            position: "relative",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontSize: isMobile
                ? "20px"
                : window.innerWidth < 1024
                ? "28px"
                : "clamp(32px, 4vw, 48px)",
              fontWeight: "800",
              letterSpacing: "1px",
              margin: isMobile ? "8px 0" : "0",
              position: "relative",
              display: "block",
              width: isMobile ? "100%" : "auto",
              color: "transparent",
              backgroundImage: lightMode
                ? "linear-gradient(90deg, #2d3748, #4a5568)"
                : "linear-gradient(90deg, #fff, #aaa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              textAlign: isMobile ? "center" : "center",
              padding: "0 2px",
              boxDecorationBreak: "clone",
              backgroundOrigin: "padding-box",
            }}
          >
            {artist?.name}&apos;s Profile
            <span
              style={{
                position: "absolute",
                bottom: isMobile
                  ? "-6px"
                  : window.innerWidth < 1024
                  ? "-8px"
                  : "-12px",
                left: "0",
                width: "100%",
                height: isMobile ? "2px" : "3px",
                background: "linear-gradient(90deg, #E50914, transparent)",
                borderRadius: "3px",
              }}
            ></span>
          </h1>
        </div>

        <header
          style={{
            display: "flex",
            flexDirection: isMobile
              ? "column"
              : window.innerWidth < 1024
              ? "column"
              : "row",
            gap: isMobile ? "15px" : window.innerWidth < 1024 ? "20px" : "60px",
            alignItems: isMobile
              ? "center"
              : window.innerWidth < 1024
              ? "center"
              : "flex-start",
            marginBottom: isMobile
              ? "30px"
              : window.innerWidth < 1024
              ? "40px"
              : "80px",
            letterSpacing: "0.5px",
            fontFamily: "'Baloo Bhai 2', sans-serif",
          }}
        >
          <div
            style={{
              flex: isMobile
                ? "0 0 100%"
                : window.innerWidth < 1024
                ? "0 0 100%"
                : "0 0 320px",
              position: "relative",
              maxWidth: isMobile
                ? "250px"
                : window.innerWidth < 1024
                ? "300px"
                : "320px",
              width: isMobile
                ? "100%"
                : window.innerWidth < 1024
                ? "100%"
                : "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: isMobile
                  ? "auto"
                  : window.innerWidth < 1024
                  ? "auto"
                  : "480px",
                aspectRatio: isMobile
                  ? "2 / 3"
                  : window.innerWidth < 1024
                  ? "2 / 3"
                  : "auto",
                borderRadius: isMobile
                  ? "10px"
                  : window.innerWidth < 1024
                  ? "12px"
                  : "20px",
                overflow: "hidden",
                boxShadow: lightMode
                  ? "0 20px 40px rgba(0, 0, 0, 0.12)"
                  : "0 20px 40px rgba(0, 0, 0, 0.3)",
                marginLeft: "0",
                transition: "all 0.4s ease",
                border: lightMode
                  ? "1px solid rgba(0,0,0,0.05)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <img
                src={
                  artist?.profile_path
                    ? `https://image.tmdb.org/t/p/original${artist?.profile_path}`
                    : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                }
                alt="Person"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) =>
                  !isMobile && (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  !isMobile && (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: isMobile
                    ? "50px"
                    : window.innerWidth < 1024
                    ? "60px"
                    : "80px",
                  background:
                    "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: isMobile
                    ? "14px"
                    : window.innerWidth < 1024
                    ? "16px"
                    : "20px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  padding: isMobile
                    ? "0 8px"
                    : window.innerWidth < 1024
                    ? "0 12px"
                    : "0 20px",
                  textAlign: "center",
                }}
              >
                {artist?.known_for_department}
              </div>
            </div>
          </div>

          <div
            style={{
              flex: "1",
              maxWidth: isMobile
                ? "100%"
                : window.innerWidth < 1024
                ? "600px"
                : "700px",
              textAlign: isMobile
                ? "center"
                : window.innerWidth < 1024
                ? "center"
                : "left",
            }}
          >
            <h1
              style={{
                fontSize: isMobile
                  ? "24px"
                  : window.innerWidth < 1024
                  ? "30px"
                  : "clamp(32px, 3vw, 42px)",
                marginBottom: isMobile
                  ? "12px"
                  : window.innerWidth < 1024
                  ? "16px"
                  : "24px",
                fontWeight: "700",
                background: "linear-gradient(90deg, #E50914, #f05766)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                display: "inline-block",
                lineHeight: "1.2",
              }}
            >
              {artist?.name}
              <span
                style={{
                  position: "absolute",
                  bottom: isMobile
                    ? "-4px"
                    : window.innerWidth < 1024
                    ? "-5px"
                    : "-8px",
                  left: "0",
                  width: "100%",
                  height: isMobile ? "2px" : "3px",
                  background: "linear-gradient(90deg, #E50914, transparent)",
                  borderRadius: "3px",
                }}
              ></span>
            </h1>
            <div
              style={{
                display: "grid",
                gap: isMobile
                  ? "12px"
                  : window.innerWidth < 1024
                  ? "16px"
                  : "20px",
                marginBottom: isMobile
                  ? "15px"
                  : window.innerWidth < 1024
                  ? "20px"
                  : "40px",
              }}
            >
              {englishNames.length > 0 && (
                <div
                  style={{
                    display: isMobile
                      ? "block"
                      : window.innerWidth < 1024
                      ? "block"
                      : "flex",
                    alignItems: isMobile
                      ? "center"
                      : window.innerWidth < 1024
                      ? "center"
                      : "flex-start",
                    gap: isMobile
                      ? "6px"
                      : window.innerWidth < 1024
                      ? "8px"
                      : "12px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile
                        ? "auto"
                        : window.innerWidth < 1024
                        ? "auto"
                        : "140px",
                      color: "#E50914",
                      fontWeight: "600",
                      fontSize: isMobile
                        ? "14px"
                        : window.innerWidth < 1024
                        ? "16px"
                        : "18px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Also Known As:
                  </div>
                  <div
                    style={{
                      color: lightMode ? "#2d3748" : "white",
                      fontSize: isMobile
                        ? "14px"
                        : window.innerWidth < 1024
                        ? "16px"
                        : "18px",
                      lineHeight: "1.6",
                    }}
                  >
                    {englishNames.slice(0, 2).map((name, index, arr) => (
                      <span key={index}>
                        {name}
                        {index < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: isMobile
                    ? "block"
                    : window.innerWidth < 1024
                    ? "block"
                    : "flex",
                  alignItems: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "flex-start",
                  gap: isMobile
                    ? "6px"
                    : window.innerWidth < 1024
                    ? "8px"
                    : "12px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile
                      ? "auto"
                      : window.innerWidth < 1024
                      ? "auto"
                      : "140px",
                    color: "#E50914",
                    fontWeight: "600",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Gender:
                </div>
                <div
                  style={{
                    color: lightMode ? "#2d3748" : "white",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                  }}
                >
                  {artist?.gender === 1 ? "Female" : "Male"}
                </div>
              </div>

              <div
                style={{
                  display: isMobile
                    ? "block"
                    : window.innerWidth < 1024
                    ? "block"
                    : "flex",
                  alignItems: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "flex-start",
                  gap: isMobile
                    ? "6px"
                    : window.innerWidth < 1024
                    ? "8px"
                    : "12px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile
                      ? "auto"
                      : window.innerWidth < 1024
                      ? "auto"
                      : "140px",
                    color: "#E50914",
                    fontWeight: "600",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Birthday:
                </div>
                <div
                  style={{
                    color: lightMode ? "#2d3748" : "white",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                  }}
                >
                  {artist?.birthday && (
                    <>
                      {artist?.birthday.slice(8, 10)}
                      <sup
                        style={{
                          fontSize: isMobile
                            ? "7px"
                            : window.innerWidth < 1024
                            ? "8px"
                            : "10px",
                          position: "relative",
                          top: isMobile
                            ? "-3px"
                            : window.innerWidth < 1024
                            ? "-4px"
                            : "-5px",
                        }}
                      >
                        {["11", "12", "13"].includes(artist?.birthday.slice(-2))
                          ? "th"
                          : artist?.birthday.slice(-1) === "1"
                          ? "st"
                          : artist?.birthday.slice(-1) === "2"
                          ? "nd"
                          : artist?.birthday.slice(-1) === "3"
                          ? "rd"
                          : "th"}
                      </sup>{" "}
                      {monthMap[artist?.birthday.slice(5, 7)]}{" "}
                      {artist?.birthday.slice(0, 4)}
                    </>
                  )}
                </div>
              </div>

              {artist?.deathday !== null && (
                <div
                  style={{
                    display: isMobile
                      ? "block"
                      : window.innerWidth < 1024
                      ? "block"
                      : "flex",
                    alignItems: isMobile
                      ? "center"
                      : window.innerWidth < 1024
                      ? "center"
                      : "flex-start",
                    gap: isMobile
                      ? "6px"
                      : window.innerWidth < 1024
                      ? "8px"
                      : "12px",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile
                        ? "auto"
                        : window.innerWidth < 1024
                        ? "auto"
                        : "140px",
                      color: "#E50914",
                      fontWeight: "600",
                      fontSize: isMobile
                        ? "14px"
                        : window.innerWidth < 1024
                        ? "16px"
                        : "18px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Deathday:
                  </div>
                  <div
                    style={{
                      color: lightMode ? "#2d3748" : "white",
                      fontSize: isMobile
                        ? "14px"
                        : window.innerWidth < 1024
                        ? "16px"
                        : "18px",
                    }}
                  >
                    {artist?.deathday || "N/A"}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: isMobile
                    ? "block"
                    : window.innerWidth < 1024
                    ? "block"
                    : "flex",
                  alignItems: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "flex-start",
                  gap: isMobile
                    ? "6px"
                    : window.innerWidth < 1024
                    ? "8px"
                    : "12px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile
                      ? "auto"
                      : window.innerWidth < 1024
                      ? "auto"
                      : "140px",
                    color: "#E50914",
                    fontWeight: "600",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Birth Place:
                </div>
                <div
                  style={{
                    color: lightMode ? "#2d3748" : "white",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                  }}
                >
                  {artist?.place_of_birth || "N/A"}
                </div>
              </div>

              <div
                style={{
                  display: isMobile
                    ? "block"
                    : window.innerWidth < 1024
                    ? "block"
                    : "flex",
                  alignItems: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "flex-start",
                  gap: isMobile
                    ? "6px"
                    : window.innerWidth < 1024
                    ? "8px"
                    : "12px",
                }}
              >
                <div
                  style={{
                    minWidth: isMobile
                      ? "auto"
                      : window.innerWidth < 1024
                      ? "auto"
                      : "140px",
                    color: "#E50914",
                    fontWeight: "600",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Known For:
                </div>
                <div
                  style={{
                    color: lightMode ? "#2d3748" : "white",
                    fontSize: isMobile
                      ? "14px"
                      : window.innerWidth < 1024
                      ? "16px"
                      : "18px",
                  }}
                >
                  {artist?.known_for_department}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: isMobile
                  ? "15px"
                  : window.innerWidth < 1024
                  ? "20px"
                  : "50px",
              }}
            >
              <h3
                style={{
                  fontSize: isMobile
                    ? "16px"
                    : window.innerWidth < 1024
                    ? "18px"
                    : "22px",
                  marginBottom: isMobile
                    ? "8px"
                    : window.innerWidth < 1024
                    ? "12px"
                    : "24px",
                  background: "linear-gradient(90deg, #E50914, #f05766)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  textAlign: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "left",
                }}
              >
                Connect
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: isMobile
                    ? "8px"
                    : window.innerWidth < 1024
                    ? "12px"
                    : "24px",
                  flexWrap: "wrap",
                  zIndex: "10000",
                  justifyContent: isMobile
                    ? "center"
                    : window.innerWidth < 1024
                    ? "center"
                    : "flex-start",
                }}
              >
                {socialMedia?.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${socialMedia.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      height: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      borderRadius: "12px",
                      background: lightMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      boxShadow: lightMode
                        ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                        : "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 8px 15px rgba(0, 0, 0, 0.1)"
                          : "0 8px 15px rgba(0, 0, 0, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                          : "0 4px 6px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      style={{
                        width: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        height: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        filter: lightMode
                          ? "invert(20%) sepia(10%) saturate(2000%) hue-rotate(180deg)"
                          : "none",
                      }}
                    />
                  </a>
                )}
                {socialMedia?.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${socialMedia.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      height: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      borderRadius: "12px",
                      background: lightMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      boxShadow: lightMode
                        ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                        : "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 8px 15px rgba(0, 0, 0, 0.1)"
                          : "0 8px 15px rgba(0, 0, 0, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                          : "0 4px 6px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      style={{
                        width: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        height: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        filter: lightMode
                          ? "invert(20%) sepia(10%) saturate(2000%) hue-rotate(180deg)"
                          : "none",
                      }}
                    />
                  </a>
                )}
                {socialMedia?.twitter_id && (
                  <a
                    href={`https://twitter.com/${socialMedia.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      height: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      borderRadius: "12px",
                      background: lightMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      boxShadow: lightMode
                        ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                        : "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 8px 15px rgba(0, 0, 0, 0.1)"
                          : "0 8px 15px rgba(0, 0, 0, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                          : "0 4px 6px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                  >
                    <img
                      src={lightMode ? X_LightMode : X_DarkMode}
                      alt="X"
                      style={{
                        width: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        height: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        borderRadius: "4px",
                      }}
                    />
                  </a>
                )}
                {socialMedia?.youtube_id && (
                  <a
                    href={`https://youtube.com/${socialMedia?.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      height: isMobile
                        ? "36px"
                        : window.innerWidth < 1024
                        ? "40px"
                        : "50px",
                      borderRadius: "12px",
                      background: lightMode
                        ? "rgba(0, 0, 0, 0.05)"
                        : "rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      boxShadow: lightMode
                        ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                        : "0 4px 6px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 8px 15px rgba(0, 0, 0, 0.1)"
                          : "0 8px 15px rgba(0, 0, 0, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = lightMode
                          ? "0 4px 6px rgba(0, 0, 0, 0.05)"
                          : "0 4px 6px rgba(0, 0, 0, 0.2)";
                      }
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                      alt="YouTube"
                      style={{
                        width: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        height: isMobile
                          ? "20px"
                          : window.innerWidth < 1024
                          ? "24px"
                          : "28px",
                        filter: lightMode
                          ? "invert(20%) sepia(10%) saturate(2000%) hue-rotate(180deg)"
                          : "none",
                      }}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <section
          style={{
            marginBottom: isMobile
              ? "30px"
              : window.innerWidth < 1024
              ? "40px"
              : "80px",
            fontSize: isMobile
              ? "14px"
              : window.innerWidth < 1024
              ? "16px"
              : "18px",
            lineHeight: "1.8",
            color: lightMode ? "#4a5568" : "#D3D3D3",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: isMobile
                ? "15px"
                : window.innerWidth < 1024
                ? "20px"
                : "40px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "3px",
                width: isMobile
                  ? "25px"
                  : window.innerWidth < 1024
                  ? "40px"
                  : "60px",
                background: "linear-gradient(90deg, #E50914, #f05766)",
                marginRight: isMobile
                  ? "8px"
                  : window.innerWidth < 1024
                  ? "10px"
                  : "20px",
                borderRadius: "2px",
              }}
            ></div>
            <h2
              style={{
                fontSize: isMobile
                  ? "20px"
                  : window.innerWidth < 1024
                  ? "24px"
                  : "clamp(28px, 3vw, 36px)",
                fontWeight: "700",
                color: "transparent",
                backgroundImage: lightMode
                  ? "linear-gradient(90deg, #2d3748, #4a5568)"
                  : "linear-gradient(90deg, #fff, #aaa)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textFillColor: "transparent",
                WebkitTextFillColor: "transparent",
                margin: "0",
                textAlign: "center",
                width: "100%",
                display: "block",
                padding: "0 2px",
                boxDecorationBreak: "clone",
                backgroundOrigin: "padding-box",
              }}
            >
              Information
            </h2>
            <div
              style={{
                height: "3px",
                width: isMobile
                  ? "25px"
                  : window.innerWidth < 1024
                  ? "40px"
                  : "60px",
                background: "linear-gradient(90deg, #f05766, #E50914)",
                marginLeft: isMobile
                  ? "8px"
                  : window.innerWidth < 1024
                  ? "10px"
                  : "20px",
                borderRadius: "2px",
              }}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: lightMode ? "#ffffff" : "rgba(0, 0, 0, 0.2)",
              padding: isMobile
                ? "15px"
                : window.innerWidth < 1024
                ? "20px"
                : "40px",
              borderRadius: isMobile
                ? "8px"
                : window.innerWidth < 1024
                ? "10px"
                : "16px",
              boxShadow: lightMode
                ? "0 10px 30px rgba(0, 0, 0, 0.08)"
                : "0 10px 30px rgba(0, 0, 0, 0.3)",
              border: lightMode
                ? "1px solid rgba(0,0,0,0.05)"
                : "1px solid rgba(255,255,255,0.05)",
              maxWidth: isMobile
                ? "100%"
                : window.innerWidth < 1024
                ? "800px"
                : "1200px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: isMobile
                  ? "14px"
                  : window.innerWidth < 1024
                  ? "16px"
                  : "18px",
                lineHeight: "1.8",
              }}
            >
              {artist?.biography || "No biography available."}
            </p>
          </div>
        </section>

        {topMovies?.length > 0 && (
          <section
            style={{
              marginBottom: isMobile
                ? "30px"
                : window.innerWidth < 1024
                ? "40px"
                : "80px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: isMobile
                  ? "15px"
                  : window.innerWidth < 1024
                  ? "20px"
                  : "40px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "3px",
                  width: isMobile
                    ? "25px"
                    : window.innerWidth < 1024
                    ? "40px"
                    : "60px",
                  background: "linear-gradient(90deg, #E50914, #f05766)",
                  marginRight: isMobile
                    ? "8px"
                    : window.innerWidth < 1024
                    ? "10px"
                    : "20px",
                  borderRadius: "2px",
                }}
              ></div>
              <h2
                style={{
                  fontSize: isMobile
                    ? "20px"
                    : window.innerWidth < 1024
                    ? "24px"
                    : "clamp(28px, 3vw, 36px)",
                  fontWeight: "700",
                  color: "transparent",
                  backgroundImage: lightMode
                    ? "linear-gradient(90deg, #2d3748, #4a5568)"
                    : "linear-gradient(90deg, #fff, #aaa)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  margin: "0",
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  padding: "0 2px",
                  boxDecorationBreak: "clone",
                  backgroundOrigin: "padding-box",
                }}
              >
                Top Movies from {artist?.name}
              </h2>
              <div
                style={{
                  height: "3px",
                  width: isMobile
                    ? "25px"
                    : window.innerWidth < 1024
                    ? "40px"
                    : "60px",
                  background: "linear-gradient(90deg, #f05766, #E50914)",
                  marginLeft: isMobile
                    ? "8px"
                    : window.innerWidth < 1024
                    ? "10px"
                    : "20px",
                  borderRadius: "2px",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                flexWrap: "nowrap",
                gap: isMobile
                  ? "15px"
                  : window.innerWidth < 1024
                  ? "20px"
                  : "25px",
                padding: isMobile
                  ? "0 10px 15px"
                  : window.innerWidth < 1024
                  ? "0 15px 20px"
                  : "0 20px 25px",
                scrollbarWidth: "none", 
                msOverflowStyle: "none", 
                "&::-webkit-scrollbar": {
                  display: "none", 
                },
              }}
            >
              {topMovies?.slice(0, 10).map((elem, index) => (
                <MovieCard
                  key={elem?.id}
                  title={elem?.title}
                  date={elem?.release_date}
                  rating={elem?.vote_average}
                  image={elem?.poster_path}
                  index={index}
                  movies={topMovies}
                  lightMode={lightMode}
                  isMobile={isMobile}
                  containerWidth={containerWidth}
                  style={{
                    flex: "0 0 auto",
                    width: isMobile
                      ? "120px"
                      : window.innerWidth < 1024
                      ? "160px"
                      : "180px",
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PersonProfile;