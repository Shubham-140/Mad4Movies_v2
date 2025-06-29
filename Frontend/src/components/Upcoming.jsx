import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCardHome from "./MovieCardHome";
import { useState, useEffect } from "react";

function Upcoming() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getContainerStyles = () => {
    if (windowWidth < 768) { 
      return {
        padding: "15px 8px",
      };
    } else if (windowWidth < 1024) { 
      return {
        padding: "18px 10px",
      };
    } else { 
      return {
        padding: "20px 10px",
      };
    }
  };

  const getTitleStyles = () => {
    if (windowWidth < 768) {
      return {
        fontSize: "28px",
        marginLeft: "15px",
      };
    } else if (windowWidth < 1024) {
      return {
        fontSize: "36px",
        marginLeft: "18px",
      };
    } else {
      return {
        fontSize: "42px",
        marginLeft: "20px",
      };
    }
  };

  const getUnderlineStyles = () => {
    if (windowWidth < 768) {
      return {
        top: "40px",
        width: "50px",
      };
    } else if (windowWidth < 1024) {
      return {
        top: "50px",
        width: "60px",
      };
    } else {
      return {
        top: "60px",
        width: "70px",
      };
    }
  };

  const getChevronStyles = () => {
    if (windowWidth < 768) {
      return {
        fontSize: "36px",
        marginLeft: "10px",
      };
    } else if (windowWidth < 1024) {
      return {
        fontSize: "44px",
        marginLeft: "12px",
      };
    } else {
      return {
        fontSize: "50px",
        marginLeft: "15px",
      };
    }
  };

  const getGradientStyles = () => {
    if (windowWidth < 768) {
      return {
        topGradient: { width: "200px", height: "150px" },
        bottomGradient: { width: "150px", height: "150px" }
      };
    } else if (windowWidth < 1024) {
      return {
        topGradient: { width: "250px", height: "180px" },
        bottomGradient: { width: "180px", height: "180px" }
      };
    } else {
      return {
        topGradient: { width: "300px", height: "200px" },
        bottomGradient: { width: "200px", height: "200px" }
      };
    }
  };

  const { topGradient, bottomGradient } = getGradientStyles();

  return (
    <div
      style={{
        maxWidth: "1440px",
        ...getContainerStyles(),
        backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
        color: lightMode ? "#222" : "orange",
        boxShadow: lightMode
          ? "0px 8px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)"
          : "0px 8px 30px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          ...topGradient,
          background: lightMode
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255, 165, 0, 0.08) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          ...bottomGradient,
          background: lightMode
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255, 165, 0, 0.05) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-block",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(10px)";
          e.currentTarget.querySelector("h2").style.textShadow = lightMode
            ? "2px 2px 8px rgba(0,0,0,0.2)"
            : "2px 2px 8px rgba(255,165,0,0.3)";
          e.currentTarget.querySelector("span").style.transform =
            "translateX(10px) rotate(0deg)";
          e.currentTarget.querySelector("span").style.color = lightMode
            ? "#3b82f6"
            : "orange";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.querySelector("h2").style.textShadow = "none";
          e.currentTarget.querySelector("span").style.transform =
            "translateX(0) rotate(0deg)";
          e.currentTarget.querySelector("span").style.color = lightMode
            ? "black"
            : "white";
        }}
      >
        <h2
          style={{
            ...getTitleStyles(),
            fontWeight: "700",
            cursor: "pointer",
            display: "inline-block",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.5px",
            position: "relative",
            color: lightMode ? "#1a365d" : "#f6ad55",
          }}
          onClick={() => navigate("/upcoming-movies")}
        >
          Upcoming
          <span
            style={{
              position: "absolute",
              ...getUnderlineStyles(),
              left: "0",
              height: "4px",
              backgroundColor: lightMode ? "#3b82f6" : "orange",
              borderRadius: "2px",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            style={{
              color: lightMode ? "black" : "white",
              ...getChevronStyles(),
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            ›
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
          overflow: "visible",
          minHeight: windowWidth < 768 ? "280px" : windowWidth < 1024 ? "320px" : "400px",
        }}
      >
        <MovieCardHome upcoming={true} />
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}

export default Upcoming;