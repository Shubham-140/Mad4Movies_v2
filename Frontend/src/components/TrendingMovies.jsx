import { useSelector } from "react-redux";
import MovieCards from "./MovieCards";
import Filters from "./Filters";
import { useEffect, useState, useRef } from "react";

function TrendingMovies() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [duration, setDuration] = useState("day");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  function handleChangeDuration(e) {
    setDuration(e.target.value);
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 768;

  const getHeadingFontSize = () => {
    if (!isMobile) return "2.5rem";
    if (screenWidth <= 320) return "1.2rem";
    if (screenWidth <= 375) return "1.3rem";
    if (screenWidth <= 414) return "1.4rem";
    return "1.4rem";
  };

  return (
    <div
      style={{
        display: isMobile ? "block" : "flex",
        backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
        minHeight: "100vh",
        padding: isMobile ? "10px 5%" : "20px 2%",
        position: "relative",
        overflow: "hidden",
        gap: "40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: lightMode
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)"
            : "linear-gradient(135deg, rgba(66, 153, 225, 0.2), transparent)",
          borderRadius: "0 0 0 100%",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "300px",
          height: "300px",
          background: lightMode
            ? "linear-gradient(315deg, rgba(59, 130, 246, 0.1), transparent)"
            : "linear-gradient(315deg, rgba(66, 153, 225, 0.2), transparent)",
          borderRadius: "0 100% 0 0",
          zIndex: 0,
        }}
      ></div>

      {isMobile && <Filters />}

      {!isMobile && (
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
      )}

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
          {isMobile ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "15px",
            }}>
              <h1
                style={{
                  fontSize: getHeadingFontSize(),
                  fontWeight: "700",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  margin: "0",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                Trending Movies
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
              <select
                style={{
                  padding: "8px 16px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  border: lightMode ? "1px solid #d1d5db" : "1px solid #4a5568",
                  backgroundColor: lightMode ? "white" : "#2d3748",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: lightMode
                    ? "0 2px 4px rgba(0,0,0,0.1)"
                    : "0 2px 4px rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                  marginTop: "7px",
                }}
                value={duration}
                onChange={handleChangeDuration}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
              </select>
            </div>
          ) : (
            <div style={{ marginBottom: "15px" }}>
              <h1
                style={{
                  fontSize: getHeadingFontSize(),
                  fontWeight: "700",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  position: "relative",
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                  top: '-15px',
                  marginBottom: '-50px'
                }}
              >
                Trending Movies
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
              <div style={{
                position: "absolute",
                right: 0,
                top: "10px"
              }}>
                <select
                  style={{
                    padding: "8px 16px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    marginRight:'80px',
                    border: lightMode ? "1px solid #d1d5db" : "1px solid #4a5568",
                    backgroundColor: lightMode ? "white" : "#2d3748",
                    color: lightMode ? "#1a365d" : "#f7fafc",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow: lightMode
                      ? "0 2px 4px rgba(0,0,0,0.1)"
                      : "0 2px 4px rgba(0,0,0,0.3)",
                    transition: "all 0.2s ease",
                  }}
                  value={duration}
                  onChange={handleChangeDuration}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative", minHeight: "500px" }}>
          {!isMobile ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "18px",
              }}
            >
              <MovieCards 
                type={duration}
                trending={true}
                isGridLayout={true}
                containerWidth={containerWidth}
              />
            </div>
          ) : (
            <MovieCards 
              type={duration}
              trending={true}
              isGridLayout={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TrendingMovies;