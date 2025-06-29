import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Google_Play_Movies from "../svgs/Google_Play_Movies.svg";
import JioHotstar from "../svgs/JioHotstar.svg";

function StreamingPlatforms() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const movieId = useSelector((state) => state.movieDetails.movieId);
  const [platformInfo, setPlatformInfo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const logos = {
    "Apple TV": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "Google Play Movies": Google_Play_Movies,
    YouTube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    "Amazon Video": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    JioHotstar: JioHotstar,
    Netflix: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_icon.svg",
    "Disney+": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    Zee5: "https://upload.wikimedia.org/wikipedia/commons/8/8b/ZEE5_logo.svg",
    SonyLIV: "https://upload.wikimedia.org/wikipedia/en/0/0f/SonyLIV_logo.svg",
    "MX Player": "https://upload.wikimedia.org/wikipedia/commons/6/69/MX_Player_logo.png",
    "Discovery+": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Discovery%2B_logo.svg",
    "Apple TV+": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    Hotstar: JioHotstar,
    JioCinema: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/JioCinema_logo.svg/320px-JioCinema_logo.svg.png",
    Voot: "https://upload.wikimedia.org/wikipedia/en/0/06/Voot_Logo.svg",
    "Amazon Prime Video": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    "VI movies and tv": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vi_Movies_%26_TV_Logo.png",
  };

  useEffect(() => {
    if (movieId === null) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setPlatformInfo(data?.results?.IN))
      .catch(() => console.log(""));
  }, [movieId, platformInfo]);

  if (window.innerWidth < 768) {
    return (
      <>
        <div
          style={{
            marginTop:'30px',
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
              fontSize: "24px",
              fontWeight: "700",
              color: lightMode ? "#121212" : "#FFFFFF",
              position: "relative",
              display: "inline-block",
              letterSpacing: "0.5px",
              textShadow: lightMode
                ? "0 1px 2px rgba(0,0,0,0.1)"
                : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            Where to Watch
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            rowGap: "20px",
            padding: "0 10px",
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          {[
            ...new Map(
              [
                ...(platformInfo?.buy || []),
                ...(platformInfo?.rent || []),
                ...(platformInfo?.flatrate || []),
              ].map((elem) => [elem.provider_id, elem])
            ).values(),
          ].map((elem) => (
            <div
              key={elem.provider_id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
                ":hover": {
                  transform: "translateY(-3px)",
                },
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  backgroundColor: lightMode
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(45,55,72,0.9)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  boxShadow: lightMode
                    ? "0 4px 10px rgba(0, 0, 0, 0.1)"
                    : "0 4px 10px rgba(0, 0, 0, 0.3)",
                  border: lightMode
                    ? "1px solid rgba(0, 0, 0, 0.08)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <img
                  src={logos[elem.provider_name]}
                  alt={elem.provider_name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/70?text=Streaming")
                  }
                />
              </div>
              <span
                style={{
                  color: lightMode
                    ? "rgba(75,85,99,0.9)"
                    : "rgba(209,213,219,0.9)",
                  fontSize: "12px",
                  textAlign: "center",
                  fontWeight: "500",
                  maxWidth: "80px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {elem.provider_name}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div style={{ 
      width: '100%',
      padding: isTablet ? '0 15px' : '0 20px',
      boxSizing: 'border-box',
      marginBottom: '60px',
      marginTop: '30px'
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
          Where to Watch
        </h2>
        <p
          style={{
            color: lightMode ? "#666" : "#AAA",
            fontSize: isTablet ? "14px" : "16px",
            marginTop: "6px",
            marginBottom: "15px",
            width: '100%',
            maxWidth: '100%'
          }}
        >
          Available streaming platforms for this movie
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${
              isTablet ? "100px" : "120px"
            }, 1fr))`,
            gap: isTablet ? "15px" : "20px",
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {[
            ...new Map(
              [
                ...(platformInfo?.buy || []),
                ...(platformInfo?.rent || []),
                ...(platformInfo?.flatrate || []),
              ].map((elem) => [elem.provider_id, elem])
            ).values(),
          ].map((elem) => (
            <div
              key={elem.provider_id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                transition: "transform 0.3s ease",
                ":hover": { transform: "translateY(-3px)" },
                maxWidth: '100%',
                padding: '0 5px',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  width: isTablet ? "70px" : "80px",
                  height: isTablet ? "70px" : "80px",
                  backgroundColor: lightMode ? "#ffffff" : "#2d3748",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: isTablet ? "8px" : "10px",
                  boxShadow: lightMode
                    ? "0 4px 10px rgba(0, 0, 0, 0.1)"
                    : "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src={logos[elem.provider_name]}
                  alt={elem.provider_name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/80?text=Streaming")
                  }
                />
              </div>
              <span
                style={{
                  color: lightMode ? "#4b5563" : "#d1d5db",
                  fontSize: isTablet ? "12px" : "14px",
                  textAlign: "center",
                  fontWeight: "500",
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {elem.provider_name}
              </span>
            </div>
          ))}
        </div>

        {(!platformInfo || Object.keys(platformInfo).length === 0) && (
          <div
            style={{
              color: lightMode ? "#B91C1C" : "#FECACA",
              textAlign: "center",
              padding: isTablet ? "12px" : "15px",
              fontSize: isTablet ? "14px" : "16px",
              backgroundColor: lightMode
                ? "rgba(254,226,226,0.8)"
                : "rgba(127,29,29,0.8)",
              borderRadius: "8px",
              margin: isTablet ? "15px 0" : "20px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isTablet ? "6px" : "8px",
              backdropFilter: "blur(4px)",
              border: lightMode
                ? "1px solid rgba(220,38,38,0.2)"
                : "1px solid rgba(252,165,165,0.2)",
              fontWeight: "500",
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
            Streaming platforms currently unavailable
          </div>
        )}
      </div>
    </div>
  );
}

export default StreamingPlatforms;