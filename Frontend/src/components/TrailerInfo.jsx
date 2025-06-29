import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TrailerInfo() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerAvailable, setTrailerAvailable] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const id = useSelector((state) => state.movieDetails.movieId);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    if (trailerKey !== "") {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    }
  }, [trailerKey]);

  const handleShowTrailer = () => {
    let trailerKeyFound = false;

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const trailerData = data?.results || [];
        for (let i = 0; i < trailerData.length; i++) {
          const elem = trailerData[i];
          if (
            elem.name === "Official Trailer" ||
            (elem.type === "Trailer" && elem.official === true)
          ) {
            setTrailerKey(elem.key);
            trailerKeyFound = true;
            break;
          }
        }
        if (!trailerKeyFound) {
          setTrailerAvailable(false);
          setTimeout(() => setTrailerAvailable(true), 1200);
        }
      })
      .catch(console.error);
  };

  if (isMobile) {
    return (
      <>
        <div
          style={{
            marginTop:'100px',
            marginBottom: "15px",
            paddingLeft: "15px",
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 6vw, 24px)",
              fontWeight: "700",
              color: lightMode ? "#121212" : "#FFFFFF",
              margin: "0 0 -10px 0",
              position: "relative",
              display: "inline-block",
              letterSpacing: "0.5px",
            }}
          >
            Official Trailer
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(15px, 4vw, 25px)",
            position: "relative",
            zIndex: 2,
            padding: "0 15px",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              marginBottom: isHovered ? "30px" : "0px",
              width: "clamp(100px, 30vw, 125px)",
              marginTop:'-10px'
            }}
            onClick={handleShowTrailer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
              alt="YouTube"
              style={{
                width: "100%",
                height: "auto",
                filter: isHovered
                  ? "brightness(1.2) drop-shadow(0 2px 8px rgba(229,9,20,0.4))"
                  : "brightness(1) drop-shadow(0 1px 3px rgba(229,9,20,0.2))",
                transition: "all 0.3s ease",
              }}
            />
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: lightMode ? "#E50914" : "#FF0000",
                  fontWeight: "600",
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  textAlign: "center",
                  width: "100%",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                Play Trailer
              </div>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              maxWidth: "min(450px, 90vw)",
            }}
          >
            <p
              style={{
                color: lightMode
                  ? "rgba(75,85,99,0.9)"
                  : "rgba(209,213,219,0.9)",
                fontSize: "clamp(12px, 3.5vw, 13px)",
                lineHeight: "1.7",
                marginBottom: "clamp(40px, 10vw, 55px)",
                fontWeight: "500",
              }}
            >
              Experience the excitement of this movie by watching the official
              trailer. Click the YouTube button to open the trailer in a new
              window.
            </p>

            {!trailerAvailable && (
              <div
                style={{
                  color: lightMode ? "#B91C1C" : "#FECACA",
                  padding: "clamp(10px, 3vw, 12px) clamp(12px, 3vw, 14px)",
                  fontSize: "clamp(13px, 3.5vw, 14px)",
                  backgroundColor: lightMode
                    ? "rgba(254,226,226,0.8)"
                    : "rgba(127,29,29,0.8)",
                  borderRadius: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  animation: "fadeIn 0.3s ease",
                  backdropFilter: "blur(4px)",
                  border: lightMode
                    ? "1px solid rgba(220,38,38,0.2)"
                    : "1px solid rgba(252,165,165,0.2)",
                  fontWeight: "500",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="clamp(16px, 4vw, 18px)"
                  height="clamp(16px, 4vw, 18px)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Trailer is not currently available
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ 
      width: '100%',
      padding: isTablet ? '0 15px' : '0 20px',
      boxSizing: 'border-box',
      marginTop:'50px'
    }}>
      <div
        style={{
          marginBottom: isTablet ? "20px" : "25px",
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <h2
          style={{
            fontSize: isTablet ? "24px" : "28px",
            fontWeight: "700",
            color: lightMode ? "#121212" : "#FFFFFF",
            margin: "0 0 10px 0",
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          Official Trailer
        </h2>

        <div style={{
          width: '100%',
          maxWidth: '100%'
        }}>
          <p
            style={{
              color: lightMode ? "#4b5563" : "#d1d5db",
              fontSize: isTablet ? "14px" : "16px",
              lineHeight: "1.6",
              margin: "0",
              width: '100%',
              maxWidth: '100%',
              wordWrap: 'break-word'
            }}
          >
            Experience the excitement of this movie by watching the official
            trailer. Click the YouTube button to open the trailer in a new window.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              width: '100%'
            }}
          >
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              onClick={handleShowTrailer}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                style={{
                  width: isTablet ? "140px" : "160px",
                  height: isTablet ? "100px" : "110px",
                  backgroundColor: lightMode ? "#ffffff" : "#2d3748",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: lightMode
                    ? "0 8px 20px rgba(0, 0, 0, 0.15)"
                    : "0 8px 20px rgba(0, 0, 0, 0.4)",
                  border: lightMode
                    ? "1px solid rgba(0, 0, 0, 0.1)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                  alt="YouTube"
                  style={{
                    width: isTablet ? "70px" : "80px",
                    height: "auto",
                    filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    bottom: isTablet ? "-28px" : "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: lightMode ? "#3b82f6" : "#FF0000",
                    fontWeight: "600",
                    fontSize: isTablet ? "14px" : "16px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Play Trailer
                </div>
              )}
            </div>
          </div>

          {!trailerAvailable && (
            <div
              style={{
                color: lightMode ? "#dc2626" : "#fca5a5",
                padding: isTablet ? "10px 12px" : "12px 16px",
                fontSize: isTablet ? "14px" : "16px",
                backgroundColor: lightMode ? "#fef2f2" : "#7f1d1d",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: isTablet ? "6px" : "8px",
                animation: "fadeIn 0.3s ease",
                marginTop: "15px",
                maxWidth: '100%',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isTablet ? "16" : "18"}
                height={isTablet ? "16" : "18"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Trailer is not currently available
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default TrailerInfo;