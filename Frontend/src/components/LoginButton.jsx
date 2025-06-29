import { useDispatch, useSelector } from "react-redux";
import { setLoginWindow } from "../features/AuthSlice";
import { useState } from "react";
import PropTypes from "prop-types";

function LoginButton({ isTablet, heightReduced }) {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const buttonHeight = heightReduced
    ? isMobile
      ? "28px"
      : isTablet
      ? "30px"
      : "32px"
    : isMobile
    ? "32px"
    : isTablet
    ? "34px"
    : "36px";

  const buttonWidth = heightReduced
    ? isMobile
      ? "64px"
      : isTablet
      ? "68px"
      : "72px"
    : isMobile
    ? "68px"
    : isTablet
    ? "72px"
    : "80px";

  const fontSize = heightReduced
    ? isMobile
      ? "11px"
      : isTablet
      ? "12px"
      : "13px"
    : isMobile
    ? "12px"
    : isTablet
    ? "13px"
    : "14px";

  function handleLogin() {
    dispatch(setLoginWindow(true));
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          height: buttonHeight,
          width: buttonWidth,
          background: lightMode
            ? isHovered
              ? "#3b82f6"
              : "linear-gradient(135deg, #ffffff, #f0f4ff)"
            : isHovered
            ? "#1d4ed8"
            : "linear-gradient(135deg, #475368, #2d3748)",
          color: isHovered ? "white" : lightMode ? "#232A35" : "white",
          border: `1px solid ${
            lightMode
              ? isHovered
                ? "#3b82f6"
                : "#e2e8f0"
              : isHovered
              ? "#1d4ed8"
              : "#4a5568"
          }`,
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: fontSize,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
          boxShadow: isHovered
            ? lightMode
              ? "0 2px 12px rgba(59, 130, 246, 0.3)"
              : "0 2px 12px rgba(29, 78, 216, 0.3)"
            : "0 1px 2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease",
          position: "relative",
          overflow: "hidden",
          transform: isHovered ? "translateY(-1px)" : "none",
        }}
        onClick={handleLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Sign In
      </button>
    </div>
  );
}

LoginButton.propTypes = {
  isTablet: PropTypes.bool,
  heightReduced: PropTypes.bool,
};

export default LoginButton;
