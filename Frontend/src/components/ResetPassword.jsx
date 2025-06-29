import { useState, useEffect } from "react";
// import { updatePassword } from "../services/appwriteAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginWindow } from "../features/AuthSlice";

function ResetPassword() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [emptyPassword, setEmptyPassword] = useState(false);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [mismatchPassword, setMismatchPassword] = useState(false);
  const [strongPassWarning, setStrongPassWarning] = useState(false);
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 320) {
        setDeviceType("small-mobile");
      } else if (width > 320 && width <= 375) {
        setDeviceType("medium-mobile");
      } else if (width > 375 && width <= 414) {
        setDeviceType("large-mobile");
      } else if (width > 414 && width < 768) {
        setDeviceType("xlarge-mobile");
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

  // Device type checks
  const isSmallMobile = deviceType === "small-mobile";
  const isMediumMobile = deviceType === "medium-mobile";
  const isLargeMobile = deviceType === "large-mobile";
  const isXLargeMobile = deviceType === "xlarge-mobile";
  const isMobile =
    isSmallMobile || isMediumMobile || isLargeMobile || isXLargeMobile;
  const isTablet = deviceType === "tablet";

  if (!userId || !secret) {
    navigate("/");
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");
    const sec = params.get("secret");

    if (!id || !sec) {
      navigate("/");
    } else {
      setUserId(id);
      setSecret(sec);
    }
  }, [navigate]);

  function handleClickPassChange() {
    const minLength = 8;
    const hasNumber = /\d/;

    if (pass === "" || confirmPass === "") {
      setEmptyPassword(true);
      setTimeout(() => setEmptyPassword(false), 1000);
      return;
    }

    if (pass !== confirmPass) {
      setMismatchPassword(true);
      setTimeout(() => setMismatchPassword(false), 1000);
      return;
    }

    if (pass.length < minLength || !hasNumber.test(pass)) {
      setStrongPassWarning(true);
      setTimeout(() => setStrongPassWarning(false), 1000);
      return;
    }

    // updatePassword(userId, secret, pass, confirmPass);
    navigate("/");
  }

  return (
    <div
      style={{
        maxWidth: isSmallMobile
          ? "92%"
          : isMediumMobile
          ? "90%"
          : isLargeMobile
          ? "88%"
          : isXLargeMobile
          ? "86%"
          : isTablet
          ? "60%"
          : "440px",
        margin: isSmallMobile
          ? "60px auto"
          : isMediumMobile
          ? "70px auto"
          : isLargeMobile
          ? "80px auto"
          : isXLargeMobile
          ? "90px auto"
          : isTablet
          ? "30px auto"
          : "40px auto",
        padding: isSmallMobile
          ? "20px"
          : isMediumMobile
          ? "22px"
          : isLargeMobile
          ? "24px"
          : isXLargeMobile
          ? "26px"
          : isTablet
          ? "40px"
          : "48px",
        backgroundColor: lightMode ? "white" : "#2D3748",
        borderRadius: isMobile ? "12px" : isTablet ? "16px" : "20px",
        boxShadow: lightMode
          ? "0 12px 40px rgba(0, 0, 0, 0.06)"
          : "0 12px 40px rgba(0, 0, 0, 0.2)",
        fontFamily: "'Inter', -apple-system, sans-serif",
        border: lightMode
          ? "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        color: lightMode ? "#232A35" : "#f7fafc",
        minHeight: isSmallMobile
          ? "480px"
          : isMediumMobile
          ? "500px"
          : isLargeMobile
          ? "520px"
          : isXLargeMobile
          ? "540px"
          : isTablet
          ? "550px"
          : "600px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isSmallMobile
            ? "-45px"
            : isMediumMobile
            ? "-50px"
            : isLargeMobile
            ? "-55px"
            : isXLargeMobile
            ? "-60px"
            : "-60px",
          left: "0",
          width: "100%",
          padding: isSmallMobile
            ? "6px"
            : isMediumMobile
            ? "8px"
            : isLargeMobile
            ? "10px"
            : isXLargeMobile
            ? "12px"
            : "12px",
          backgroundColor: lightMode ? "#fee2e2" : "#4C1D1D",
          color: lightMode ? "#b91c1c" : "#FCA5A5",
          borderRadius: isMobile ? "6px" : "8px",
          display: emptyPassword ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          opacity: emptyPassword ? 1 : 0,
          transform: emptyPassword ? "translateY(0)" : "translateY(-20px)",
          fontSize: isSmallMobile
            ? "11px"
            : isMediumMobile
            ? "12px"
            : isLargeMobile
            ? "13px"
            : isXLargeMobile
            ? "14px"
            : "14px",
        }}
      >
        <svg
          width={isSmallMobile ? "14" : "16"}
          height={isSmallMobile ? "14" : "16"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "6px" }}
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={lightMode ? "#b91c1c" : "#FCA5A5"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V12"
            stroke={lightMode ? "#b91c1c" : "#FCA5A5"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16H12.01"
            stroke={lightMode ? "#b91c1c" : "#FCA5A5"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Please fill in all fields
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: isSmallMobile
            ? "16px"
            : isMediumMobile
            ? "18px"
            : isLargeMobile
            ? "20px"
            : isXLargeMobile
            ? "22px"
            : isTablet
            ? "30px"
            : "40px",
        }}
      >
        <div
          style={{
            width: isSmallMobile
              ? "48px"
              : isMediumMobile
              ? "52px"
              : isLargeMobile
              ? "56px"
              : isXLargeMobile
              ? "60px"
              : isTablet
              ? "64px"
              : "72px",
            height: isSmallMobile
              ? "48px"
              : isMediumMobile
              ? "52px"
              : isLargeMobile
              ? "56px"
              : isXLargeMobile
              ? "60px"
              : isTablet
              ? "64px"
              : "72px",
            margin: isSmallMobile
              ? "0 auto 8px"
              : isMediumMobile
              ? "0 auto 10px"
              : isLargeMobile
              ? "0 auto 12px"
              : isXLargeMobile
              ? "0 auto 14px"
              : "0 auto 20px",
            backgroundColor: lightMode ? "#f0f9ff" : "#1E3A8A",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: lightMode
              ? "0 4px 12px rgba(59, 130, 246, 0.15)"
              : "0 4px 12px rgba(96, 165, 250, 0.2)",
          }}
        >
          <svg
            width={isSmallMobile ? "20" : isMediumMobile ? "22" : "24"}
            height={isSmallMobile ? "20" : isMediumMobile ? "22" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
              stroke={lightMode ? "#3b82f6" : "#93C5FD"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 11V7C17 4.79086 15.2091 3 13 3H11C8.79086 3 7 4.79086 7 7V11"
              stroke={lightMode ? "#3b82f6" : "#93C5FD"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1
          style={{
            fontSize: isSmallMobile
              ? "18px"
              : isMediumMobile
              ? "19px"
              : isLargeMobile
              ? "20px"
              : isXLargeMobile
              ? "21px"
              : isTablet
              ? "24px"
              : "28px",
            fontWeight: "700",
            color: lightMode ? "#1a365d" : "#f7fafc",
            marginBottom: isSmallMobile
              ? "6px"
              : isMediumMobile
              ? "8px"
              : isLargeMobile
              ? "10px"
              : isXLargeMobile
              ? "12px"
              : "12px",
            letterSpacing: "-0.5px",
          }}
        >
          Create New Password
        </h1>
        <p
          style={{
            fontSize: isSmallMobile
              ? "12px"
              : isMediumMobile
              ? "12.5px"
              : isLargeMobile
              ? "13px"
              : isXLargeMobile
              ? "13.5px"
              : isTablet
              ? "14px"
              : "15px",
            color: lightMode ? "#4a5568" : "#a0aec0",
            lineHeight: "1.6",
            maxWidth: isMobile ? "100%" : "320px",
            margin: "0 auto",
          }}
        >
          Your new password must be different from previous passwords
        </p>
      </div>

      <div
        style={{
          marginBottom: isSmallMobile
            ? "16px"
            : isMediumMobile
            ? "18px"
            : isLargeMobile
            ? "20px"
            : isXLargeMobile
            ? "24px"
            : isTablet
            ? "28px"
            : "32px",
        }}
      >
        <div
          style={{
            marginBottom: isSmallMobile
              ? "12px"
              : isMediumMobile
              ? "14px"
              : isLargeMobile
              ? "15px"
              : isXLargeMobile
              ? "16px"
              : isTablet
              ? "20px"
              : "20px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: isSmallMobile
                ? "11px"
                : isMediumMobile
                ? "11.5px"
                : isLargeMobile
                ? "12px"
                : isXLargeMobile
                ? "12.5px"
                : isTablet
                ? "13px"
                : "14px",
              fontWeight: "500",
              color: emptyPassword
                ? lightMode
                  ? "#ef4444"
                  : "#FCA5A5"
                : lightMode
                ? "#374151"
                : "#E5E7EB",
              marginBottom: isSmallMobile
                ? "6px"
                : isMediumMobile
                ? "7px"
                : isLargeMobile
                ? "8px"
                : isXLargeMobile
                ? "9px"
                : "8px",
              transition: "color 0.3s ease",
            }}
          >
            New Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{
                width: "100%",
                padding: isSmallMobile
                  ? "8px 10px 8px 32px"
                  : isMediumMobile
                  ? "9px 11px 9px 34px"
                  : isLargeMobile
                  ? "10px 12px 10px 36px"
                  : isXLargeMobile
                  ? "11px 13px 11px 38px"
                  : isTablet
                  ? "14px 16px 14px 44px"
                  : "14px 16px 14px 44px",
                fontSize: isSmallMobile
                  ? "13px"
                  : isMediumMobile
                  ? "13.5px"
                  : isLargeMobile
                  ? "14px"
                  : isXLargeMobile
                  ? "14.5px"
                  : isTablet
                  ? "15px"
                  : "15px",
                border:
                  emptyPassword || mismatchPassword
                    ? `1px solid ${lightMode ? "#ef4444" : "#FCA5A5"}`
                    : lightMode
                    ? "1px solid #e5e7eb"
                    : "1px solid #4B5563",
                borderRadius: isMobile ? "8px" : "10px",
                backgroundColor: lightMode ? "#f9fafb" : "#1F2937",
                transition: "all 0.3s ease",
                boxShadow:
                  emptyPassword || mismatchPassword
                    ? lightMode
                      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                      : "0 0 0 3px rgba(252, 165, 165, 0.1)"
                    : "none",
                color: lightMode ? "#111827" : "#F3F4F6",
                outline: "none",
                ...(isMobile
                  ? {
                      ":focus": {
                        borderColor: lightMode ? "#3b82f6" : "#93C5FD",
                        boxShadow: lightMode
                          ? "0 0 0 2px rgba(59, 130, 246, 0.1)"
                          : "0 0 0 2px rgba(147, 197, 253, 0.1)",
                      },
                    }
                  : {
                      ":focus": {
                        borderColor: lightMode ? "#3b82f6" : "#93C5FD",
                        backgroundColor: lightMode ? "#ffffff" : "#1F2937",
                        boxShadow: lightMode
                          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
                          : "0 0 0 3px rgba(147, 197, 253, 0.1)",
                      },
                    }),
              }}
            />
            <svg
              width={isSmallMobile ? "14" : "16"}
              height={isSmallMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                left: isSmallMobile
                  ? "10px"
                  : isMediumMobile
                  ? "11px"
                  : isLargeMobile
                  ? "12px"
                  : isXLargeMobile
                  ? "13px"
                  : "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color:
                  emptyPassword || mismatchPassword
                    ? lightMode
                      ? "#ef4444"
                      : "#FCA5A5"
                    : lightMode
                    ? "#9ca3af"
                    : "#6B7280",
                transition: "color 0.3s ease",
              }}
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 12C3.273 7.333 7 4 12 4C17 4 20.727 7.333 22 12C20.727 16.667 17 20 12 20C7 20 3.273 16.667 2 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: isSmallMobile
                ? "10px"
                : isMediumMobile
                ? "11px"
                : isLargeMobile
                ? "11px"
                : isXLargeMobile
                ? "12px"
                : isTablet
                ? "13px"
                : "13px",
              color: strongPassWarning
                ? lightMode
                  ? "#ef4444"
                  : "#FCA5A5"
                : lightMode
                ? "#6b7280"
                : "#9CA3AF",
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              opacity: strongPassWarning ? 1 : 0.8,
            }}
          >
            <svg
              width={isSmallMobile ? "12" : "14"}
              height={isSmallMobile ? "12" : "14"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "4px" }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={
                  strongPassWarning
                    ? lightMode
                      ? "#ef4444"
                      : "#FCA5A5"
                    : lightMode
                    ? "#9ca3af"
                    : "#6B7280"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke={
                  strongPassWarning
                    ? lightMode
                      ? "#ef4444"
                      : "#FCA5A5"
                    : lightMode
                    ? "#9ca3af"
                    : "#6B7280"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke={
                  strongPassWarning
                    ? lightMode
                      ? "#ef4444"
                      : "#FCA5A5"
                    : lightMode
                    ? "#9ca3af"
                    : "#6B7280"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Minimum 8 characters with at least one number
          </div>
        </div>

        <div
          style={{
            marginBottom: isSmallMobile
              ? "16px"
              : isMediumMobile
              ? "20px"
              : isLargeMobile
              ? "24px"
              : isXLargeMobile
              ? "28px"
              : isTablet
              ? "32px"
              : "32px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: isSmallMobile
                ? "11px"
                : isMediumMobile
                ? "11.5px"
                : isLargeMobile
                ? "12px"
                : isXLargeMobile
                ? "12.5px"
                : isTablet
                ? "13px"
                : "14px",
              fontWeight: "500",
              color: mismatchPassword
                ? lightMode
                  ? "#ef4444"
                  : "#FCA5A5"
                : lightMode
                ? "#374151"
                : "#E5E7EB",
              marginBottom: isSmallMobile
                ? "6px"
                : isMediumMobile
                ? "7px"
                : isLargeMobile
                ? "8px"
                : isXLargeMobile
                ? "9px"
                : "8px",
              transition: "color 0.3s ease",
            }}
          >
            Confirm Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              style={{
                width: "100%",
                padding: isSmallMobile
                  ? "8px 10px 8px 32px"
                  : isMediumMobile
                  ? "9px 11px 9px 34px"
                  : isLargeMobile
                  ? "10px 12px 10px 36px"
                  : isXLargeMobile
                  ? "11px 13px 11px 38px"
                  : isTablet
                  ? "14px 16px 14px 44px"
                  : "14px 16px 14px 44px",
                fontSize: isSmallMobile
                  ? "13px"
                  : isMediumMobile
                  ? "13.5px"
                  : isLargeMobile
                  ? "14px"
                  : isXLargeMobile
                  ? "14.5px"
                  : isTablet
                  ? "15px"
                  : "15px",
                border: mismatchPassword
                  ? `1px solid ${lightMode ? "#ef4444" : "#FCA5A5"}`
                  : lightMode
                  ? "1px solid #e5e7eb"
                  : "1px solid #4B5563",
                borderRadius: isMobile ? "8px" : "10px",
                backgroundColor: lightMode ? "#f9fafb" : "#1F2937",
                transition: "all 0.3s ease",
                boxShadow: mismatchPassword
                  ? lightMode
                    ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                    : "0 0 0 3px rgba(252, 165, 165, 0.1)"
                  : "none",
                color: lightMode ? "#111827" : "#F3F4F6",
                outline: "none",
                ...(isMobile
                  ? {
                      ":focus": {
                        borderColor: lightMode ? "#3b82f6" : "#93C5FD",
                        boxShadow: lightMode
                          ? "0 0 0 2px rgba(59, 130, 246, 0.1)"
                          : "0 0 0 2px rgba(147, 197, 253, 0.1)",
                      },
                    }
                  : {
                      ":focus": {
                        borderColor: lightMode ? "#3b82f6" : "#93C5FD",
                        backgroundColor: lightMode ? "#ffffff" : "#1F2937",
                        boxShadow: lightMode
                          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
                          : "0 0 0 3px rgba(147, 197, 253, 0.1)",
                      },
                    }),
              }}
            />
            <svg
              width={isSmallMobile ? "14" : "16"}
              height={isSmallMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                left: isSmallMobile
                  ? "10px"
                  : isMediumMobile
                  ? "11px"
                  : isLargeMobile
                  ? "12px"
                  : isXLargeMobile
                  ? "13px"
                  : "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: mismatchPassword
                  ? lightMode
                    ? "#ef4444"
                    : "#FCA5A5"
                  : lightMode
                  ? "#9ca3af"
                  : "#6B7280",
                transition: "color 0.3s ease",
              }}
            >
              <path
                d="M16.5 9.5L12 14L7.5 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14V4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: isSmallMobile
                ? "10px"
                : isMediumMobile
                ? "11px"
                : isLargeMobile
                ? "11px"
                : isXLargeMobile
                ? "12px"
                : isTablet
                ? "13px"
                : "13px",
              color: lightMode ? "#ef4444" : "#FCA5A5",
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              height: mismatchPassword ? "auto" : "0",
              opacity: mismatchPassword ? 1 : 0,
              overflow: "hidden",
            }}
          >
            <svg
              width={isSmallMobile ? "12" : "14"}
              height={isSmallMobile ? "12" : "14"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "4px" }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={lightMode ? "#ef4444" : "#FCA5A5"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke={lightMode ? "#ef4444" : "#FCA5A5"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke={lightMode ? "#ef4444" : "#FCA5A5"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Passwords don&apos;t match
          </div>
        </div>

        <button
          style={{
            width: "100%",
            padding: isSmallMobile
              ? "10px"
              : isMediumMobile
              ? "11px"
              : isLargeMobile
              ? "12px"
              : isXLargeMobile
              ? "14px"
              : isTablet
              ? "16px"
              : "16px",
            backgroundColor: lightMode ? "#3b82f6" : "#2563EB",
            color: "white",
            border: "none",
            borderRadius: isMobile ? "8px" : "10px",
            fontSize: isSmallMobile
              ? "13px"
              : isMediumMobile
              ? "13.5px"
              : isLargeMobile
              ? "14px"
              : isXLargeMobile
              ? "14.5px"
              : isTablet
              ? "16px"
              : "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: lightMode
              ? "0 4px 12px rgba(59, 130, 246, 0.25)"
              : "0 4px 12px rgba(37, 99, 235, 0.3)",
            ...(isMobile
              ? {
                  ":hover": {
                    backgroundColor: lightMode ? "#2563eb" : "#1D4ED8",
                  },
                }
              : {
                  ":hover": {
                    backgroundColor: lightMode ? "#2563eb" : "#1D4ED8",
                    transform: "translateY(-1px)",
                    boxShadow: lightMode
                      ? "0 6px 16px rgba(59, 130, 246, 0.3)"
                      : "0 6px 16px rgba(37, 99, 235, 0.4)",
                  },
                  ":active": {
                    transform: "translateY(0)",
                  },
                }),
          }}
          onClick={handleClickPassChange}
        >
          Reset Password
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: isSmallMobile
            ? "16px"
            : isMediumMobile
            ? "20px"
            : isLargeMobile
            ? "24px"
            : isXLargeMobile
            ? "28px"
            : isTablet
            ? "32px"
            : "32px",
        }}
      >
        <p
          style={{
            fontSize: isSmallMobile
              ? "11px"
              : isMediumMobile
              ? "11.5px"
              : isLargeMobile
              ? "12px"
              : isXLargeMobile
              ? "12.5px"
              : isTablet
              ? "14px"
              : "14px",
            color: lightMode ? "#9ca3af" : "#6B7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <svg
            width={isSmallMobile ? "12" : "14"}
            height={isSmallMobile ? "12" : "14"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "6px" }}
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={lightMode ? "#9ca3af" : "#6B7280"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V12"
              stroke={lightMode ? "#9ca3af" : "#6B7280"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16H12.01"
              stroke={lightMode ? "#9ca3af" : "#6B7280"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Remember your password?
          <button
            style={{
              color: lightMode ? "#3b82f6" : "#93C5FD",
              textDecoration: "none",
              fontWeight: "500",
              marginLeft: "4px",
              backgroundColor: lightMode ? "#f0f4ff" : "#2D3748",
              border: "none",
              cursor: "pointer",
              fontSize: isSmallMobile
                ? "11px"
                : isMediumMobile
                ? "11.5px"
                : isLargeMobile
                ? "12px"
                : isXLargeMobile
                ? "12.5px"
                : isTablet
                ? "14px"
                : "14px",
              ...(isMobile
                ? {}
                : {
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }),
            }}
            onClick={() => dispatch(setLoginWindow(true))}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
