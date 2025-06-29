import { useSelector } from "react-redux";
import MovieCards from "./MovieCards";
import Filters from "./Filters";
import { useEffect, useState, useRef } from "react";

function TopRated() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

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
              top: isMobile ? '0' : '-15px',
              marginBottom: isMobile ? '0' : '-50px'
            }}
          >
            Top Rated Movies
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
          {!isMobile ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "18px",
              }}
            >
              <MovieCards 
                type={"top_rated"}
                isGridLayout={true}
                containerWidth={containerWidth}
              />
            </div>
          ) : (
            <MovieCards 
              type={"top_rated"}
              isGridLayout={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TopRated;