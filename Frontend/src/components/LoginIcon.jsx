import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserMenuSelected } from "../features/AuthSlice";

function LoginIcon() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const userMenuSelectedRef = useRef();
  const isMobile = window.innerWidth <= 768;
  const currentUser = useSelector((state) => state.auth.currentUser);

  const getIconSize = () => {
    if (isMobile) return "32px";
    if (window.innerHeight < 800) return "30px";
    return "34px";
  };

  const getFontSize = () => {
    if (isMobile) return "14px";
    if (window.innerHeight < 800) return "13px";
    return "14px";
  };

  useEffect(() => {
    function handleClose(e) {
      if (
        userMenuSelectedRef?.current &&
        !userMenuSelectedRef.current.contains(e.target)
      ) {
        dispatch(setUserMenuSelected(false));
      }
    }

    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [dispatch]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={userMenuSelectedRef}
        style={{
          width: getIconSize(),
          height: getIconSize(),
          borderRadius: "50%",
          border: lightMode
            ? "1.5px solid rgba(255,255,255,0.8)"
            : "1.5px solid rgba(255,255,255,0.3)",
          padding: "1.5px",
          background: lightMode
            ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,244,255,0.9))"
            : "linear-gradient(135deg, rgba(71,83,104,0.9), rgba(45,55,72,0.9))",
          boxShadow: isHovered ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
          transition: "all 0.2s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => dispatch(setUserMenuSelected(true))}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: lightMode ? "#e0e7ff" : "#1e3a8a",
          }}
        >
          <span
            style={{
              color: lightMode ? "#3b82f6" : "#bfdbfe",
              fontSize: getFontSize(),
              fontWeight: "600",
            }}
          >
            {currentUser?.name.trim().slice(0, 1).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginIcon;
