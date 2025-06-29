import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { /*useDispatch,*/ useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(false);
  // const dispatch = useDispatch();
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const allowed = sessionStorage.getItem("authflow") === "true";

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const colors = {
    background: lightMode ? "#f0f4ff" : "#232A35",
    cardBg: lightMode ? "#ffffff" : "#2D3748",
    textPrimary: lightMode ? "#111827" : "#F7FAFC",
    textSecondary: lightMode ? "#6b7280" : "#A0AEC0",
    accent: "#3b82f6",
    accentHover: "#2563eb",
    error: "#ef4444",
    inputBg: lightMode ? "#f9fafb" : "#1A202C",
    inputBorder: lightMode ? "#e5e7eb" : "#2D3748",
    iconBg: lightMode ? "#f0f7ff" : "#1E3A8A",
    shadow: lightMode
      ? "0 10px 30px rgba(0, 0, 0, 0.05)"
      : "0 10px 30px rgba(0, 0, 0, 0.3)",
    border: lightMode
      ? "1px solid rgba(0, 0, 0, 0.03)"
      : "1px solid rgba(255, 255, 255, 0.03)",
  };

  useEffect(() => {
    if (!allowed) {
      navigate("/");
    } else {
      sessionStorage.removeItem("authflow");
    }
  }, [navigate, allowed]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  const handleConfirmEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      setEmailCheck(true);
      setTimeout(() => {
        setEmailCheck(false);
      }, 1000);
      return;
    }

    sessionStorage.setItem("authflow", "true");
    // dispatch(setResetEmail(trimmedEmail));
    // resetPassword(trimmedEmail);
    navigate("/check-inbox");
  };

  const getMobileStyles = () => {
    if (!isMobile) return {};

    return {
      container: {
        margin: "20px auto",
        padding: "24px",
        minHeight: "auto",
        borderRadius: "12px",
      },
      iconContainer: {
        width: "56px",
        height: "56px",
        marginBottom: "16px",
      },
      icon: {
        width: "24px",
        height: "24px",
      },
      title: {
        fontSize: "20px",
        marginBottom: "8px",
      },
      subtitle: {
        fontSize: "14px",
        lineHeight: "1.4",
      },
      label: {
        fontSize: "14px",
        marginBottom: "8px",
      },
      input: {
        padding: "12px 16px",
        fontSize: "15px",
        borderRadius: "8px",
      },
      errorMessage: {
        fontSize: "13px",
        marginTop: "8px",
      },
      errorIcon: {
        width: "16px",
        height: "16px",
        marginRight: "6px",
      },
      button: {
        padding: "14px",
        fontSize: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      },
      note: {
        fontSize: "13px",
      },
    };
  };

  const baseStyles = {
    container: {
      maxWidth: "min(90vw, 500px)",
      margin: "clamp(20px, 5vw, 32px) auto",
      padding: "clamp(20px, 5vw, 40px)",
      backgroundColor: colors.cardBg,
      borderRadius: "clamp(12px, 2vw, 16px)",
      boxShadow: colors.shadow,
      fontFamily: "'Inter', -apple-system, sans-serif",
      border: colors.border,
      position: "relative",
      minHeight: "clamp(30vh, 35vh, 40vh)",
    },
    header: {
      textAlign: "center",
      marginBottom: "clamp(20px, 3vw, 32px)",
    },
    iconContainer: {
      width: "clamp(48px, 8vw, 64px)",
      height: "clamp(48px, 8vw, 64px)",
      margin: "0 auto clamp(12px, 2vw, 16px)",
      backgroundColor: colors.iconBg,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "clamp(20px, 5vw, 28px)",
      height: "clamp(20px, 5vw, 28px)",
    },
    title: {
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "600",
      color: colors.textPrimary,
      marginBottom: "clamp(6px, 1vw, 8px)",
    },
    subtitle: {
      fontSize: "clamp(14px, 3vw, 15px)",
      color: colors.textSecondary,
      lineHeight: "1.5",
    },
    form: {
      marginBottom: "clamp(16px, 3vw, 24px)",
    },
    label: {
      display: "block",
      fontSize: "clamp(13px, 2vw, 14px)",
      fontWeight: "500",
      color: emailCheck ? colors.error : colors.textSecondary,
      marginBottom: "clamp(6px, 1vw, 8px)",
    },
    input: {
      width: "100%",
      padding: "clamp(10px, 2vw, 12px) clamp(12px, 3vw, 16px)",
      fontSize: "clamp(14px, 3vw, 15px)",
      color: lightMode ? "black" : "white",
      border: emailCheck
        ? `1px solid ${colors.error}`
        : `1px solid ${colors.inputBorder}`,
      borderRadius: "clamp(6px, 1vw, 8px)",
      backgroundColor: colors.inputBg,
    },
    errorMessage: {
      fontSize: "clamp(12px, 2vw, 13px)",
      color: colors.error,
      marginTop: "clamp(6px, 1vw, 8px)",
      display: "flex",
      alignItems: "center",
    },
    errorIcon: {
      width: "clamp(14px, 2vw, 16px)",
      height: "clamp(14px, 2vw, 16px)",
      marginRight: "clamp(4px, 1vw, 6px)",
    },
    button: {
      width: "100%",
      padding: "clamp(12px, 2vw, 14px)",
      backgroundColor: colors.accent,
      color: "white",
      border: "none",
      borderRadius: "clamp(6px, 1vw, 8px)",
      fontSize: "clamp(14px, 3vw, 15px)",
      fontWeight: "500",
      cursor: "pointer",
      marginBottom: "clamp(16px, 3vw, 24px)",
      transition: "background-color 0.2s ease",
      ":hover": {
        backgroundColor: colors.accentHover,
      },
    },
    note: {
      fontSize: "clamp(12px, 2vw, 13px)",
      color: colors.textSecondary,
      textAlign: "center",
    },
  };

  const styles = {
    container: { ...baseStyles.container, ...getMobileStyles().container },
    header: baseStyles.header,
    iconContainer: {
      ...baseStyles.iconContainer,
      ...getMobileStyles().iconContainer,
    },
    icon: { ...baseStyles.icon, ...getMobileStyles().icon },
    title: { ...baseStyles.title, ...getMobileStyles().title },
    subtitle: { ...baseStyles.subtitle, ...getMobileStyles().subtitle },
    form: baseStyles.form,
    label: { ...baseStyles.label, ...getMobileStyles().label },
    input: { ...baseStyles.input, ...getMobileStyles().input },
    errorMessage: {
      ...baseStyles.errorMessage,
      ...getMobileStyles().errorMessage,
    },
    errorIcon: { ...baseStyles.errorIcon, ...getMobileStyles().errorIcon },
    button: { ...baseStyles.button, ...getMobileStyles().button },
    note: { ...baseStyles.note, ...getMobileStyles().note },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.iconContainer}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.icon}
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V12"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16H12.01"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 style={styles.title}>Enter your Email</h1>
        <p style={styles.subtitle}>
          If an account exists with provided email, a password reset link will
          be sent to your inbox.
        </p>
      </div>

      <div style={styles.form}>
        <label style={styles.label}>Email Address</label>
        <input
          type="email"
          placeholder="your@email.com"
          onChange={handleChangeEmail}
          value={email}
          style={styles.input}
        />
        {emailCheck && (
          <p style={styles.errorMessage}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={styles.errorIcon}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={colors.error}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke={colors.error}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke={colors.error}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Please enter a valid email address
          </p>
        )}
      </div>

      <button style={styles.button} onClick={handleConfirmEmail}>
        Confirm email
      </button>

      <p style={styles.note}>
        <strong>Note:</strong> This page is part of a secure password reset
        flow. Reloading or accessing it directly will redirect you to the
        homepage for security reasons.
      </p>
    </div>
  );
}

export default EmailVerification;
