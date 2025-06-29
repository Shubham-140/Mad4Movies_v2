import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import TrailerInfo from "./TrailerInfo";
import StreamingPlatforms from "./StreamingPlatforms";

const More = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getContainerWidth = () => {
    if (isMobile) return { width: "100vw" };
    if (isTablet) return { width: "40vw", maxWidth: "600px" };
    return { width: "40vw", maxWidth: "700px" };
  };

  const getContainerStyles = () => {
    if (isMobile) return { padding: "15px 8px" };
    if (isTablet) return { padding: "18px 12px" };
    return { padding: "20px 15px" };
  };

  const getTitleStyles = () => {
    if (isMobile) return { fontSize: "28px", marginLeft: "15px" };
    if (isTablet) return { fontSize: "32px", marginLeft: "18px" };
    return { fontSize: "36px", marginLeft: "20px" };
  };

  const getUnderlineStyles = () => {
    if (isMobile) return { top: "40px", width: "50px" };
    if (isTablet) return { top: "45px", width: "55px" };
    return { top: "55px", width: "65px" };
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: lightMode ? "#f0f4ff" : "rgba(35,42,53,0.8)",
        minHeight: "100vh",
        ...getContainerWidth(),
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          ...getContainerStyles(),
          backgroundColor: "transparent",
          marginBottom: isMobile ? "30px" : isTablet ? "25px" : "30px",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            zIndex: 1,
            marginLeft: isMobile ? "3.7%" : "4%",
          }}
        >
          <h2
            style={{
              ...getTitleStyles(),
              fontWeight: "700",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.5px",
              color: lightMode ? "#1a365d" : "#f6ad55",
              margin: "0",
              padding: "0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Rating Section & More
            <span
              style={{
                position: "absolute",
                ...getUnderlineStyles(),
                left: "0",
                height: "4px",
                backgroundColor: lightMode ? "#3b82f6" : "orange",
                borderRadius: "2px",
              }}
            />
          </h2>
        </div>
      </div>

      <div
        style={{
          padding: isMobile ? "0 15px" : isTablet ? "0 15px" : "0 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "20px" : isTablet ? "22px" : "25px",
            width: "100%",
          }}
        >
          <Rating />
          <TrailerInfo />
          <StreamingPlatforms />
        </div>
      </div>
    </div>
  );
};

export default More;