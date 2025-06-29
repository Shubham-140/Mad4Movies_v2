import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LogoAndTitle() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 400;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  return (
    <div
      style={{
        position: "relative",
        height: isMobile ? "28px" : isTablet ? "30px" : "32px",
        margin: 0, 
        padding: 0, 
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            color: lightMode ? "#000000" : "#FFFFFF",
            fontSize: isSmallMobile ? "20px" : isMobile ? "22px" : "28px",
            fontWeight: "800",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <span style={{ color: "#3b82f6" }}>MAD</span>
          <span
            style={{
              color: lightMode ? "#000000" : "#FFFFFF",
              position: "relative",
              marginLeft: "2px",
            }}
          >
            4
          </span>
          <span
            style={{
              color: lightMode ? "#000000" : "#FFFFFF",
              marginLeft: "2px",
            }}
          >
            MOVIES
          </span>
        </div>
      </Link>
    </div>
  );
}

export default LogoAndTitle;
