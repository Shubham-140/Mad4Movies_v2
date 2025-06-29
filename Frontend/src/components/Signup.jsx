import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGoogleAuth,
  handleSignup,
  setSignupWindow,
} from "../features/AuthSlice.js";

const SignUp = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");
  const [localName, setlocalName] = useState("");
  const signupWindow = useSelector((state) => state.auth.signupWindow);
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassNotMatched, setShowPassNotMatched] = useState(false);
  const [showSomethingWrong, setShowSomethingWrong] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  const [localUsername, setLocalUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Device detection (for SVGs)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({ width, height: window.innerHeight });
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = deviceType === "mobile";

  if (windowSize.width < 768) {
    console.log(
      `SignUp: deviceType=${deviceType}, width=${windowSize.width}, ` +
        `googleButton={padding: "12px", fontSize: "14px"}, ` +
        `googleLogo={width: "18px"}, ` +
        `divider={margin: "16px 0"}, ` +
        `footer={fontSize: "12px", marginTop: "16px"}`
    );
  }

  const handleCancel = useCallback(() => {
    dispatch(setSignupWindow(false));
    setlocalName("");
    setLocalEmail("");
    setLocalPass("");
    setConfirmPass("");
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && signupWindow === true) {
        handleCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, handleCancel, signupWindow]);

  async function handleSignupUser(e) {
    e?.preventDefault();
    if (
      !localUsername ||
      !localName ||
      !localEmail ||
      !localPass ||
      !confirmPass
    ) {
      setShowSomethingWrong(true);
      setTimeout(() => setShowSomethingWrong(false), 1000);
      return;
    }

    if (localPass !== confirmPass) {
      setShowPassNotMatched(true);
      setTimeout(() => setShowPassNotMatched(false), 1000);
      return;
    }

    try {
      await dispatch(
        handleSignup({
          name: localName,
          email: localEmail,
          password: localPass,
          username: localUsername,
        })
      ).unwrap();
    } catch (error) {
      if (error?.error === "User with this email already exists") {
        setEmailExists(true);
        setTimeout(() => {
          setEmailExists(false);
        }, 1000);
      }
      if (error?.error === "Username already taken") {
        setUsernameExists(true);
        setTimeout(() => {
          setUsernameExists(false);
        }, 1000);
      }
    }
  }

  // Select styles
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "center",
      zIndex: 10000,
      padding: isMobile ? "12px" : "20px",
      overflowY: "auto",
    },
    modal: {
      position: "relative",
      borderRadius: "12px",
      padding: isMobile ? "20px" : "28px",
      width: "100%",
      maxWidth: isMobile ? "340px" : "400px",
      maxHeight: isMobile ? "85vh" : "90vh",
      backgroundColor: lightMode ? "#ffffff" : "#1a1a1a",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      border: lightMode ? "1px solid #f0f0f0" : "1px solid #2a2a2a",
      marginTop: isMobile ? "5vh" : 0,
      marginBottom: isMobile ? "5vh" : 0,
      overflowY: "auto",
    },
    closeButton: {
      position: "absolute",
      top: isMobile ? "12px" : "16px",
      right: isMobile ? "12px" : "16px",
      padding: "4px",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: lightMode ? "#888888" : "#777777",
      zIndex: 1,
    },
    header: {
      textAlign: "center",
      marginBottom: isMobile ? "16px" : "24px",
    },
    logo: {
      width: isMobile ? "32px" : "40px",
      height: isMobile ? "32px" : "40px",
      margin: "0 auto 12px auto",
    },
    title: {
      fontSize: isMobile ? "18px" : "22px",
      fontWeight: 600,
      color: lightMode ? "#222222" : "#f1f1f1",
      marginBottom: "4px",
    },
    subtitle: {
      fontSize: isMobile ? "13px" : "14px",
      color: lightMode ? "#666666" : "#999999",
      lineHeight: "1.4",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "12px" : "16px",
    },
    inputLabel: {
      display: "block",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: 500,
      color: lightMode ? "#555555" : "#cccccc",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: isMobile ? "10px 12px" : "12px 14px",
      borderRadius: "8px",
      border:
        showPassNotMatched || showSomethingWrong
          ? "1px solid #ff4d4f"
          : lightMode
          ? "1px solid #e0e0e0"
          : "1px solid #333333",
      backgroundColor: lightMode ? "#fafafa" : "#222222",
      color: lightMode ? "#111111" : "#f1f1f1",
      fontSize: isMobile ? "14px" : "15px",
      outline: "none",
    },
    errorMessage: {
      display: "flex",
      alignItems: "center",
      fontSize: isMobile ? "12px" : "13px",
      padding: isMobile ? "8px 10px" : "10px 12px",
      borderRadius: "6px",
      backgroundColor: lightMode ? "#fff0f0" : "#2a0f0f",
      color: lightMode ? "#ff3333" : "#ff6b6b",
      marginTop: "4px",
    },
    submitButton: {
      width: "100%",
      padding: isMobile ? "12px" : "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: lightMode ? "#0066ff" : "#4d88ff",
      color: "#ffffff",
      fontWeight: 500,
      fontSize: isMobile ? "14px" : "15px",
      cursor: "pointer",
      marginTop: "8px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: isMobile ? "16px 0" : "20px 0",
      color: lightMode ? "#dddddd" : "#444444",
    },
    dividerLine: {
      flexGrow: 1,
      height: "1px",
      backgroundColor: lightMode ? "#eeeeee" : "#333333",
    },
    dividerText: {
      padding: "0 12px",
      fontSize: isMobile ? "12px" : "13px",
      color: lightMode ? "#999999" : "#666666",
    },
    googleButton: {
      width: "100%",
      padding: isMobile ? "12px" : "14px",
      borderRadius: "8px",
      border: lightMode ? "1px solid #e0e0e0" : "1px solid #333333",
      backgroundColor: lightMode ? "#ffffff" : "#222222",
      color: lightMode ? "#444444" : "#cccccc",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: 500,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    googleLogo: {
      width: "18px",
      height: "18px",
      marginRight: "10px",
    },
    footer: {
      textAlign: "center",
      fontSize: isMobile ? "12px" : "13px",
      color: lightMode ? "#666666" : "#999999",
      marginTop: isMobile ? "16px" : "20px",
    },
    footerLink: {
      color: lightMode ? "#0066ff" : "#4d88ff",
      textDecoration: "none",
      fontWeight: 500,
    },
  };

  return (
    <div
      style={styles.overlay}
      onClick={() => dispatch(setSignupWindow(false))}
    >
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? "16" : "20"}
            height={isMobile ? "16" : "20"}
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
          <h2 style={styles.title}>Create an account</h2>
          <p style={styles.subtitle}>Get started with our service</p>
        </div>

        <form style={styles.form}>
          <div>
            <label htmlFor="username" style={styles.inputLabel}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your Username"
              style={styles.input}
              onChange={(e) => setLocalUsername(e.target.value)}
              value={localUsername}
            />
          </div>
          <div>
            <label htmlFor="name" style={styles.inputLabel}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              style={styles.input}
              onChange={(e) => setlocalName(e.target.value)}
              value={localName}
            />
          </div>

          <div>
            <label htmlFor="email" style={styles.inputLabel}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              style={styles.input}
              onChange={(e) => setLocalEmail(e.target.value)}
              value={localEmail}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.inputLabel}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={localPass}
              onChange={(e) => setLocalPass(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={styles.inputLabel}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          {showPassNotMatched && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
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
              Passwords don&apos;t match
            </div>
          )}

          {usernameExists && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
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
              Username is already taken
            </div>
          )}

          {emailExists && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
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
              Email is already registered
            </div>
          )}

          {showSomethingWrong && (
            <div style={styles.errorMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? "14" : "16"}
                height={isMobile ? "14" : "16"}
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

          <button style={styles.submitButton} onClick={handleSignupUser}>
            Sign Up
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
          <p>
            By continuing, you agree to our{" "}
            <a href="#" style={styles.footerLink}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" style={styles.footerLink}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
