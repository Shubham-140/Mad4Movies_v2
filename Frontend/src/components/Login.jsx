import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGoogleAuth,
  handleLogin,
  setLoginWindow,
  setSignupWindow,
} from "../features/AuthSlice.js";

const Login = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const loginWindow = useSelector((state) => state.auth.loginWindow);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSomethingWrong, setShowSomethingWrong] = useState(false);
  const navigate = useNavigate();
  const [showIncorrectCredentials, setShowIncorrectCredentials] =
    useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDeviceType = () => {
    const { width } = windowSize;
    if (width <= 320) return "small-mobile";
    if (width <= 375) return "medium-mobile";
    if (width <= 414) return "large-mobile";
    if (width <= 428) return "xlarge-mobile";
    if (width < 768) return "mobile";
    if (width >= 768 && width < 1024) return "tablet";
    return "desktop";
  };

  const deviceType = getDeviceType();
  const isSmallMobile = deviceType === "small-mobile";
  const isMediumMobile = deviceType === "medium-mobile";
  const isLargeMobile = deviceType === "large-mobile";
  const isXLargeMobile = deviceType === "xlarge-mobile";

  const handleCancel = useCallback(() => {
    dispatch(setLoginWindow(false));
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && loginWindow === true) {
        handleCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, loginWindow, handleCancel]);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  function handleShowSignUpWindow() {
    dispatch(setLoginWindow(false));
    dispatch(setSignupWindow(true));
  }

  function handleForgetPass() {
    sessionStorage.setItem("authflow", "true");
    navigate("/username-verify");
    dispatch(setLoginWindow(false));
  }

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
      padding: "16px",
    },
    modal: {
      position: "relative",
      borderRadius: "16px",
      padding: "24px",
      width: "100%",
      maxWidth: "360px",
      backgroundColor: lightMode ? "#ffffff" : "#1a1a1a",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
      border: lightMode ? "1px solid #eaeaea" : "1px solid #2a2a2a",
    },
    closeButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      padding: "4px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: lightMode ? "#666666" : "#999999",
    },
    header: {
      textAlign: "center",
      marginBottom: "24px",
    },
    logo: {
      width: "40px",
      height: "40px",
      margin: "0 auto 16px auto",
    },
    title: {
      fontSize: "20px",
      fontWeight: 600,
      color: lightMode ? "#111111" : "#f1f1f1",
      marginBottom: "4px",
      letterSpacing: "-0.2px",
    },
    subtitle: {
      fontSize: "14px",
      color: lightMode ? "#666666" : "#aaaaaa",
      lineHeight: "1.4",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputLabel: {
      display: "block",
      fontSize: "13px",
      fontWeight: 500,
      color: lightMode ? "#555555" : "#cccccc",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: showIncorrectCredentials
        ? "1px solid #ff4d4d"
        : lightMode
        ? "1px solid #e0e0e0"
        : "1px solid #333333",
      backgroundColor: lightMode ? "#fafafa" : "#222222",
      color: lightMode ? "#111111" : "#f1f1f1",
      fontSize: "15px",
      outline: "none",
      transition: "border 0.2s",
    },
    inputFocus: {
      border: lightMode ? "1px solid #0066ff" : "1px solid #4d88ff",
    },
    errorMessage: {
      display: "flex",
      alignItems: "center",
      fontSize: "13px",
      padding: "10px 12px",
      borderRadius: "6px",
      backgroundColor: lightMode ? "#fff0f0" : "#2a0f0f",
      color: lightMode ? "#ff3333" : "#ff6b6b",
      marginTop: "4px",
    },
    submitButton: {
      width: "100%",
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: lightMode ? "#0066ff" : "#4d88ff",
      color: "#ffffff",
      fontWeight: 500,
      fontSize: "15px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "24px 0",
      color: lightMode ? "#dddddd" : "#444444",
    },
    dividerLine: {
      flexGrow: 1,
      height: "1px",
      backgroundColor: lightMode ? "#eeeeee" : "#333333",
    },
    dividerText: {
      padding: "0 12px",
      fontSize: "12px",
      color: lightMode ? "#999999" : "#666666",
    },
    googleButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
      borderRadius: "8px",
      border: lightMode ? "1px solid #e0e0e0" : "1px solid #333333",
      backgroundColor: lightMode ? "#ffffff" : "#222222",
      color: lightMode ? "#444444" : "#cccccc",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    googleLogo: {
      width: "18px",
      height: "18px",
      marginRight: "10px",
    },
    footer: {
      textAlign: "center",
      fontSize: "13px",
      color: lightMode ? "#666666" : "#999999",
      marginTop: "24px",
      lineHeight: "1.5",
    },
    footerLink: {
      color: lightMode ? "#0066ff" : "#4d88ff",
      textDecoration: "none",
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.overlay} onClick={() => dispatch(setLoginWindow(false))}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div style={styles.header}>
          <div style={styles.logo}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={lightMode ? "#3b82f6" : "#60a5fa"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke={lightMode ? "#3b82f6" : "#60a5fa"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke={lightMode ? "#3b82f6" : "#60a5fa"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <form style={styles.form}>
          <div>
            <label htmlFor="username" style={styles.inputLabel}>
              Username
            </label>
            <input
              id="username"
              type="username"
              placeholder="Your username"
              style={styles.input}
              onChange={handleUsernameChange}
              value={username}
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label htmlFor="password" style={styles.inputLabel}>
                Password
              </label>
              <Link
                to="#"
                style={{
                  fontSize: isSmallMobile
                    ? "13px"
                    : isMediumMobile
                    ? "14px"
                    : isLargeMobile
                    ? "14px"
                    : isXLargeMobile
                    ? "15px"
                    : "14px",
                  color: lightMode ? "#3b82f6" : "#60a5fa",
                  textDecoration: "none",
                }}
                onClick={handleForgetPass}
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={password}
              onChange={handlePassChange}
            />
          </div>

          {showIncorrectCredentials && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Invalid credentials
            </div>
          )}

          {showSomethingWrong && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Please fill in all fields
            </div>
          )}

          <button
            style={styles.submitButton}
            onClick={async (e) => {
              e.preventDefault();
              if (username === "" || password === "") {
                setShowSomethingWrong(true);
                setTimeout(() => {
                  setShowSomethingWrong(false);
                }, 1000);
                return;
              }

              const result = await dispatch(
                handleLogin({ username, password })
              );

              if (handleLogin.rejected.match(result)) {
                setShowIncorrectCredentials(true);
                setTimeout(() => {
                  setShowIncorrectCredentials(false);
                }, 1000);
              } else {
                window.location.reload();
              }
            }}
          >
            Sign in
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button
          style={styles.googleButton}
          onClick={async () => {
            try {
              await dispatch(handleGoogleAuth({})).unwrap();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google"
            style={styles.googleLogo}
          />
          Continue with Google
        </button>

        <div style={styles.footer}>
          <p
            style={{
              marginBottom: isSmallMobile
                ? "10px"
                : isMediumMobile
                ? "12px"
                : isLargeMobile
                ? "12px"
                : isXLargeMobile
                ? "12px"
                : "12px",
            }}
          >
            By continuing, you agree to our{" "}
            <Link to="/terms" target="_blank" style={styles.footerLink}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              style={styles.footerLink}
            >
              Privacy Policy
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <button
              onClick={handleShowSignUpWindow}
              style={{
                background: "none",
                border: "none",
                color: lightMode ? "#3b82f6" : "#60a5fa",
                cursor: "pointer",
                padding: 0,
                fontSize: isSmallMobile
                  ? "13px"
                  : isMediumMobile
                  ? "14px"
                  : isLargeMobile
                  ? "14px"
                  : isXLargeMobile
                  ? "15px"
                  : "14px",
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
