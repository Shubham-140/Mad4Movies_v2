import "@fontsource/poppins";
import "@fontsource/baloo-bhai-2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginWindow } from "../features/AuthSlice";
import { useEffect } from "react";

function AuthError() {
  const dispatch = useDispatch();
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const hasError = sessionStorage.getItem("auth-error");

    if (!hasError) {
      navigate("/");
    } else {
      sessionStorage.removeItem("auth-error");
    }
  }, [navigate]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight:
        window.innerWidth < 768
          ? "clamp(60vh, 80vw, 80vh)"
          : window.innerWidth < 1024
          ? "clamp(59.5vh, 68vh, 76.5vh)"
          : "clamp(70vh, 80vh, 90vh)",
      background: lightMode
        ? "linear-gradient(135deg, #f0f4ff 0%, #e4e8eb 100%)"
        : "linear-gradient(135deg, #232A35 0%, #2b3c48 100%)",
      padding:
        window.innerWidth < 768
          ? "clamp(0.75rem, 4vw, 1rem)"
          : window.innerWidth < 1024
          ? "clamp(0.85rem, 2.55vw, 1.7rem)"
          : "clamp(1rem, 3vw, 2rem)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      overflowX: "hidden",
      boxSizing: "border-box",
      height: "100%",
    },
    blobError: {
      position: "absolute",
      top:
        window.innerWidth < 768
          ? "clamp(-40px, -12vw, -20px)"
          : window.innerWidth < 1024
          ? "clamp(-42.5px, -8.5vw, -25.5px)"
          : "clamp(-50px, -10vw, -30px)",
      right:
        window.innerWidth < 768
          ? "clamp(-40px, -12vw, -20px)"
          : window.innerWidth < 1024
          ? "clamp(-42.5px, -8.5vw, -25.5px)"
          : "clamp(-50px, -10vw, -30px)",
      width:
        window.innerWidth < 768
          ? "clamp(100px, 25vw, 150px)"
          : window.innerWidth < 1024
          ? "clamp(127.5px, 25.5vw, 170px)"
          : "clamp(150px, 30vw, 200px)",
      height:
        window.innerWidth < 768
          ? "clamp(100px, 25vw, 150px)"
          : window.innerWidth < 1024
          ? "clamp(127.5px, 25.5vw, 170px)"
          : "clamp(150px, 30vw, 200px)",
      borderRadius: "50%",
      background: lightMode
        ? "rgba(231, 76, 60, 0.1)"
        : "rgba(231, 76, 60, 0.15)",
      filter: "blur(clamp(15px, 3vw, 20px))",
    },
    blobPrimary: {
      position: "absolute",
      bottom:
        window.innerWidth < 768
          ? "clamp(-20px, -10vw, -10px)"
          : window.innerWidth < 1024
          ? "clamp(-25.5px, -6.8vw, -17px)"
          : "clamp(-30px, -8vw, -20px)",
      left:
        window.innerWidth < 768
          ? "clamp(-20px, -10vw, -10px)"
          : window.innerWidth < 1024
          ? "clamp(-25.5px, -6.8vw, -17px)"
          : "clamp(-30px, -8vw, -20px)",
      width:
        window.innerWidth < 768
          ? "clamp(80px, 20vw, 120px)"
          : window.innerWidth < 1024
          ? "clamp(85px, 21.25vw, 127.5px)"
          : "clamp(100px, 25vw, 150px)",
      height:
        window.innerWidth < 768
          ? "clamp(80px, 20vw, 120px)"
          : window.innerWidth < 1024
          ? "clamp(85px, 21.25vw, 127.5px)"
          : "clamp(100px, 25vw, 150px)",
      borderRadius: "50%",
      background: lightMode
        ? "rgba(52, 152, 219, 0.1)"
        : "rgba(52, 152, 219, 0.15)",
      filter: "blur(clamp(15px, 3vw, 20px))",
    },
    card: {
      background: lightMode ? "#ffffff" : "#2d3748",
      borderRadius:
        window.innerWidth < 768
          ? "clamp(8px, 3vw, 12px)"
          : window.innerWidth < 1024
          ? "clamp(10.2px, 1.7vw, 13.6px)"
          : "clamp(12px, 2vw, 16px)",
      padding:
        window.innerWidth < 768
          ? "clamp(0.875rem, 4vw, 1.25rem)"
          : window.innerWidth < 1024
          ? "clamp(1.0625rem, 3.4vw, 1.7rem)"
          : "clamp(1.25rem, 4vw, 2rem)",
      width:
        window.innerWidth < 768
          ? "clamp(260px, 90vw, 320px)"
          : window.innerWidth < 1024
          ? "min(90vw, 340px)"
          : "min(90vw, 400px)",
      boxShadow: lightMode
        ? "0 15px 40px rgba(0, 0, 0, 0.1)"
        : "0 15px 40px rgba(0, 0, 0, 0.3)",
      border: lightMode
        ? "1px solid rgba(0, 0, 0, 0.05)"
        : "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative",
      zIndex: 1,
      transform: "translateY(20px)",
      opacity: 0,
      animation: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      boxSizing: "border-box",
      "@media (max-width: 767px)": {
        width: "clamp(240px, 92vw, 300px)",
        padding: "clamp(0.75rem, 3.5vw, 1rem)",
      },
    },
    errorIcon: {
      marginBottom:
        window.innerWidth < 768
          ? "clamp(0.75rem, 3vw, 1rem)"
          : window.innerWidth < 1024
          ? "clamp(0.85rem, 2.55vw, 1.275rem)"
          : "clamp(1rem, 3vw, 1.5rem)",
      color: "#e74c3c",
      transform: "scale(0)",
      animation:
        "scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.2s forwards",
      fontSize:
        window.innerWidth < 768
          ? "clamp(36px, 10vw, 48px)"
          : window.innerWidth < 1024
          ? "clamp(40.8px, 8.5vw, 54.4px)"
          : "clamp(48px, 10vw, 64px)",
    },
    title: {
      fontSize:
        window.innerWidth < 768
          ? "clamp(1.25rem, 5vw, 1.75rem)"
          : window.innerWidth < 1024
          ? "clamp(1.275rem, 4.25vw, 1.9125rem)"
          : "clamp(1.5rem, 5vw, 2.25rem)",
      fontFamily: "'Baloo Bhai 2', sans-serif",
      fontWeight: 800,
      marginBottom:
        window.innerWidth < 768
          ? "clamp(0.5rem, 2vw, 0.75rem)"
          : window.innerWidth < 1024
          ? "clamp(0.6375rem, 1.7vw, 0.85rem)"
          : "clamp(0.75rem, 2vw, 1rem)",
      lineHeight: 1.2,
      color: "transparent",
      backgroundImage: lightMode
        ? "linear-gradient(90deg, #2c3e50, #34495e)"
        : "linear-gradient(90deg, #ffffff, #e2e8f0)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      letterSpacing: "-0.5px",
      padding: "0 2px",
    },
    description: {
      color: lightMode ? "#7f8c8d" : "#a0aec0",
      fontFamily: "'Poppins', sans-serif",
      fontSize:
        window.innerWidth < 768
          ? "clamp(0.75rem, 3vw, 0.875rem)"
          : window.innerWidth < 1024
          ? "clamp(0.765rem, 0.935vw, 0.85rem)"
          : "clamp(0.9rem, 1.1vw, 1rem)",
      marginBottom:
        window.innerWidth < 768
          ? "clamp(0.875rem, 3vw, 1.25rem)"
          : window.innerWidth < 1024
          ? "clamp(1.0625rem, 2.55vw, 1.4875rem)"
          : "clamp(1.25rem, 3vw, 1.75rem)",
      lineHeight: 1.6,
      maxWidth:
        window.innerWidth < 768
          ? "clamp(220px, 85vw, 280px)"
          : window.innerWidth < 1024
          ? "min(85vw, 357px)"
          : "min(85vw, 420px)",
      marginLeft: "auto",
      marginRight: "auto",
    },
    buttonContainer: {
      display: "flex",
      gap:
        window.innerWidth < 768
          ? "clamp(0.5rem, 2vw, 0.75rem)"
          : window.innerWidth < 1024
          ? "clamp(0.6375rem, 1.7vw, 0.85rem)"
          : "clamp(0.75rem, 2vw, 1rem)",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
    },
    primaryButton: {
      fontFamily: "'Poppins', sans-serif",
      padding:
        window.innerWidth < 768
          ? "clamp(0.5rem, 2.5vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)"
          : window.innerWidth < 1024
          ? "clamp(0.5525rem, 1.275vw, 0.6375rem) clamp(1.0625rem, 2.55vw, 1.275rem)"
          : "clamp(0.65rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem)",
      borderRadius:
        window.innerWidth < 768
          ? "clamp(4px, 1.5vw, 6px)"
          : window.innerWidth < 1024
          ? "clamp(5.1px, 0.85vw, 6.8px)"
          : "clamp(6px, 1vw, 8px)",
      background: lightMode
        ? "linear-gradient(135deg, #3498db, #2980b9)"
        : "linear-gradient(135deg, #4299e1, #3182ce)",
      color: "white",
      textDecoration: "none",
      fontWeight: 600,
      transition: "all 0.3s ease",
      border: "none",
      boxShadow: lightMode
        ? "0 4px 12px rgba(52, 152, 219, 0.3)"
        : "0 4px 12px rgba(66, 153, 225, 0.4)",
      cursor: "pointer",
      fontSize:
        window.innerWidth < 768
          ? "clamp(0.6875rem, 2.5vw, 0.8125rem)"
          : window.innerWidth < 1024
          ? "clamp(0.68rem, 1.0625vw, 0.765rem)"
          : "clamp(0.8rem, 1.25vw, 0.9rem)",
      minWidth:
        window.innerWidth < 768
          ? "clamp(90px, 25vw, 110px)"
          : window.innerWidth < 1024
          ? "clamp(102px, 21.25vw, 119px)"
          : "clamp(120px, 25vw, 140px)",
      textAlign: "center",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: lightMode
          ? "0 6px 18px rgba(52, 152, 219, 0.4)"
          : "0 6px 18px rgba(66, 153, 225, 0.5)",
      },
    },
    secondaryButton: {
      fontFamily: "'Poppins', sans-serif",
      padding:
        window.innerWidth < 768
          ? "clamp(0.5rem, 2.5vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)"
          : window.innerWidth < 1024
          ? "clamp(0.5525rem, 1.275vw, 0.6375rem) clamp(1.0625rem, 2.55vw, 1.275rem)"
          : "clamp(0.65rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem)",
      borderRadius:
        window.innerWidth < 768
          ? "clamp(4px, 1.5vw, 6px)"
          : window.innerWidth < 1024
          ? "clamp(5.1px, 0.85vw, 6.8px)"
          : "clamp(6px, 1vw, 8px)",
      background: lightMode ? "white" : "rgba(255, 255, 255, 0.1)",
      color: lightMode ? "#2c3e50" : "white",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: lightMode
        ? "1.5px solid #2c3e50"
        : "2px solid rgba(255, 255, 255, 0.2)",
      boxShadow: lightMode
        ? "0 4px 8px rgba(0, 0, 0, 0.05)"
        : "0 4px 8px rgba(0, 0, 0, 0.2)",
      fontSize:
        window.innerWidth < 768
          ? "clamp(0.6875rem, 2.5vw, 0.8125rem)"
          : window.innerWidth < 1024
          ? "clamp(0.68rem, 1.0625vw, 0.765rem)"
          : "clamp(0.8rem, 1.25vw, 0.9rem)",
      minWidth:
        window.innerWidth < 768
          ? "clamp(90px, 25vw, 110px)"
          : window.innerWidth < 1024
          ? "clamp(102px, 21.25vw, 119px)"
          : "clamp(120px, 25vw, 140px)",
      ":hover": {
        background: lightMode ? "#2c3e50" : "rgba(255, 255, 255, 0.2)",
        color: "white",
        transform: "translateY(-2px)",
        boxShadow: lightMode
          ? "0 6px 15px rgba(0, 0, 0, 0.1)"
          : "0 6px 15px rgba(0, 0, 0, 0.3)",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.blobError}></div>
      <div style={styles.blobPrimary}></div>

      <div style={styles.card}>
        <div style={styles.errorIcon}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1 style={styles.title}>Authentication Required</h1>

        <p style={styles.description}>
          We couldn&apos;t verify your credentials. Please sign in to access
          this content or return to our homepage.
        </p>

        <div style={styles.buttonContainer}>
          <Link to="/" style={styles.primaryButton}>
            Return Home
          </Link>

          <button
            onClick={() => dispatch(setLoginWindow(true))}
            style={styles.secondaryButton}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default AuthError;