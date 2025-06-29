import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Contact = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [incompleteDetails, setIncompleteDetails] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleIssue = (e) => setIssue(e.target.value);
  const handleMessage = (e) => dispatch(setMessage(e.target.value));
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    if (name === "" || email === "") {
      setIncompleteDetails(true);
      setTimeout(() => {
        setIncompleteDetails(false);
      }, 4000);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();

    if (emailRegex.test(trimmedEmail) === false) {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 1500);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    setSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitted(false);

    setName("");
    setEmail("");
    setMessage("");
  };

  const styles = {
    container: {
      padding: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px) clamp(16px, 4vw, 24px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(20px, 4vw, 28px) clamp(14px, 2.5vw, 20px)" 
          : "clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
      color: lightMode ? "#232A35" : "#ffffff",
      minHeight: window.innerWidth < 768 
        ? "calc(100vh - 160px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(65vh, 75vh, 85vh)" 
          : "clamp(70vh, 80vh, 90vh)",
      background: lightMode
        ? "linear-gradient(135deg, #e9f2fe 0%, #ffffff 100%)"
        : "linear-gradient(135deg, #232A35 0%, #2b3c48 100%)",
      width: "100%",
      boxSizing: "border-box",
      overflowX: "hidden",
    },
    content: {
      maxWidth: window.innerWidth < 768 
        ? "95vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(900px, 92vw)" 
          : "min(1100px, 90vw)",
      margin: "0 auto",
      position: "relative",
    },
    title: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1.5rem, 5vw, 2rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(1.625rem, 3vw, 2rem)" 
          : "clamp(1.875rem, 2.5vw, 2.75rem)",
      fontWeight: "800",
      marginBottom: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      color: "transparent",
      backgroundImage: lightMode
        ? "linear-gradient(90deg, #0076b3, #00a8ff)"
        : "linear-gradient(90deg, #00a8ff, #00d4ff)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      textFillColor: "transparent",
      WebkitTextFillColor: "transparent",
      lineHeight: "1.2",
      textAlign: "center",
      width: "100%",
      padding: "0 2px",
      boxDecorationBreak: "clone",
      backgroundOrigin: "padding-box",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    subtitle: {
      fontSize: window.innerWidth < 768 
        ? "clamp(0.875rem, 3.5vw, 1rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.875rem, 1.8vw, 1rem)" 
          : "clamp(0.9375rem, 0.9vw, 1.125rem)",
      color: lightMode ? "#555" : "#bbb",
      marginBottom: window.innerWidth < 768 
        ? "clamp(16px, 4vw, 24px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(14px, 2.5vw, 20px)" 
          : "clamp(16px, 1.5vw, 24px)",
      textAlign: "center",
      lineHeight: "1.6",
      maxWidth: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
      marginLeft: "auto",
      marginRight: "auto",
    },
    formContainer: {
      backgroundColor: lightMode
        ? "rgba(255,255,255,0.8)"
        : "rgba(45, 55, 72, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(8px, 3vw, 12px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 2vw, 12px)" 
          : "clamp(10px, 1.5vw, 16px)",
      padding: window.innerWidth < 768 
        ? "clamp(20px, 5vw, 24px) clamp(12px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(16px, 3vw, 20px) clamp(10px, 2vw, 14px)" 
          : "clamp(20px, 2vw, 24px) clamp(12px, 1.5vw, 16px)",
      boxShadow: lightMode
        ? "0 10px 30px rgba(0, 118, 179, 0.15)"
        : "0 10px 30px rgba(0, 0, 0, 0.3)",
      border: lightMode
        ? "1px solid rgba(226, 232, 240, 0.8)"
        : "1px solid rgba(74, 85, 104, 0.5)",
      maxWidth: window.innerWidth < 768 
        ? "95vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
      margin: "0 auto",
      width: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(650px, 88vw)" 
          : "min(750px, 85vw)",
      boxSizing: "border-box",
    },
    inputGroup: {
      position: "relative",
      marginBottom: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 20px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 16px)" 
          : "clamp(12px, 1.5vw, 20px)",
    },
    input: {
      width: "100%",
      padding: window.innerWidth < 768 
        ? "clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px) clamp(10px, 2.5vw, 14px) clamp(36px, 8vw, 48px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 12px) clamp(32px, 6vw, 40px)" 
          : "clamp(10px, 1.5vw, 14px) clamp(12px, 2vw, 16px) clamp(10px, 1.5vw, 14px) clamp(36px, 4vw, 48px)",
      border: (field) => {
        if (field === "name" && incompleteDetails) return "1px solid #FF5252";
        if (field === "email" && (incompleteDetails || invalidEmail))
          return "1px solid #FF5252";
        return lightMode
          ? "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.1)";
      },
      borderRadius: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      outline: "none",
      color: lightMode ? "#232A35" : "#ffffff",
      backgroundColor: (field) => {
        if (field === "name" && incompleteDetails)
          return lightMode ? "rgba(255,82,82,0.1)" : "rgba(255,82,82,0.2)";
        if (field === "email" && (incompleteDetails || invalidEmail))
          return lightMode ? "rgba(255,82,82,0.1)" : "rgba(255,82,82,0.2)";
        return lightMode ? "rgba(255,255,255,0.9)" : "rgba(45, 55, 72, 0.9)";
      },
      transition: "all 0.3s ease",
    },
    icon: {
      position: "absolute",
      left: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      top: "50%",
      transform: "translateY(-50%)",
      width: window.innerWidth < 768 
        ? "clamp(16px, 3vw, 20px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(14px, 2.5vw, 18px)" 
          : "clamp(16px, 2vw, 20px)",
      height: window.innerWidth < 768 
        ? "clamp(16px, 3vw, 20px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(14px, 2.5vw, 18px)" 
          : "clamp(16px, 2vw, 20px)",
      color: (field) => {
        if (field === "name" && incompleteDetails) return "#FF5252";
        if (field === "email" && (incompleteDetails || invalidEmail))
          return "#FF5252";
        return lightMode ? "#64748b" : "#94a3b8";
      },
    },
    select: {
      width: "100%",
      padding: window.innerWidth < 768 
        ? "clamp(10px, 2.5vw, 14px) clamp(36px, 8vw, 48px) clamp(10px, 2.5vw, 14px) clamp(36px, 8vw, 48px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 2vw, 12px) clamp(32px, 6vw, 40px) clamp(8px, 2vw, 12px) clamp(32px, 6vw, 40px)" 
          : "clamp(10px, 1.5vw, 14px) clamp(36px, 4vw, 48px) clamp(10px, 1.5vw, 14px) clamp(36px, 4vw, 48px)",
      border: lightMode
        ? "1px solid rgba(0, 0, 0, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      outline: "none",
      color: lightMode ? "#232A35" : "#ffffff",
      backgroundColor: lightMode
        ? "rgba(255,255,255,0.9)"
        : "rgba(45, 55, 72, 0.9)",
      appearance: "none",
      cursor: "pointer",
    },
    textArea: {
      width: "100%",
      padding: window.innerWidth < 768 
        ? "clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px) clamp(10px, 2.5vw, 14px) clamp(36px, 8vw, 48px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 2vw, 12px) clamp(10px, 2.5vw, 14px) clamp(8px, 2vw, 12px) clamp(32px, 6vw, 40px)" 
          : "clamp(10px, 1.5vw, 14px) clamp(12px, 2vw, 16px) clamp(10px, 1.5vw, 14px) clamp(36px, 4vw, 48px)",
      border: lightMode
        ? "1px solid rgba(0, 0, 0, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      outline: "none",
      color: lightMode ? "#232A35" : "#ffffff",
      backgroundColor: lightMode
        ? "rgba(255,255,255,0.9)"
        : "rgba(45, 55, 72, 0.9)",
      minHeight: window.innerWidth < 768 
        ? "clamp(100px, 25vw, 120px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(100px, 20vw, 120px)" 
          : "clamp(120px, 15vw, 140px)",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 14px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 12px)" 
          : "clamp(12px, 1.5vw, 14px)",
      background: lightMode
        ? "linear-gradient(90deg, #0076b3, #00a8ff)"
        : "linear-gradient(90deg, #005e76, #008299)",
      color: "#fff",
      border: "none",
      borderRadius: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      cursor: "pointer",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.875rem, 3vw, 1rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.875rem, 1.8vw, 1rem)" 
          : "clamp(0.9375rem, 0.9vw, 1.125rem)",
      fontWeight: "600",
      transition: "all 0.3s ease",
      marginTop: window.innerWidth < 768 
        ? "clamp(12px, 2vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      boxShadow: lightMode
        ? "0 5px 20px rgba(0, 118, 179, 0.3)"
        : "0 5px 20px rgba(0, 168, 255, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "clamp(8px, 1vw, 10px)",
    },
    loadingSpinner: {
      display: "inline-block",
      width: window.innerWidth < 768 
        ? "clamp(14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
      height: window.innerWidth < 768 
        ? "clamp14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
      border: lightMode ? "3px solid rgba(255,255,255,0.3)" : "3px solid rgba(0,0,0,0.1)",
      borderRadius: "50%",
      borderTopColor: lightMode ? "#fff" : "#00a8ff",
      animation: "spin 1s ease-in-out infinite",
    },
    submissionAlert: {
      position: "fixed",
      top: window.innerWidth < 768 
        ? "clamp(48px, 10vw, 56px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(48px, 8vw, 56px)" 
          : "clamp(56px, 6vw, 64px)",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#FFD700",
      color: "#333",
      padding: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 1.5vw, 10px) clamp(10px, 2.5vw, 20px)" 
          : "clamp(10px, 1vw, 12px) clamp(12px, 2vw, 24px)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(4px, 1.5vw, 6px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(4px, 1vw, 6px)" 
          : "clamp(6px, 0.8vw, 8px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "clamp(8px, 1vw, 10px)",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      animation: "slideIn 0.3s ease-out, fadeOut 0.5s ease 1.5s forwards",
      maxWidth: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
    },
    warningAlert: {
      position: "fixed",
      top: window.innerWidth < 768 
        ? "clamp(16px, 5vw, 48px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(16px, 4vw, 48px)" 
          : "clamp(20px, 3vw, 56px)",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#FF5252",
      color: "#fff",
      padding: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 24px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(8px, 1.5vw, 10px) clamp(10px, 2.5vw, 20px)" 
          : "clamp(10px, 1vw, 12px) clamp(12px, 2vw, 24px)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(4px, 1.5vw, 6px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(4px, 1vw, 6px)" 
          : "clamp(6px, 0.8vw, 8px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "clamp(8px, 1vw, 10px)",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      animation: "slideIn 0.3s ease-out, fadeOut 0.5s ease 0.5s forwards",
      maxWidth: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
    },
    warningIcon: {
      width: window.innerWidth < 768 
        ? "clamp(14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
      height: window.innerWidth < 768 
        ? "clamp(14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
    },
    checkmarkIcon: {
      width: window.innerWidth < 768 
        ? "clamp(14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
      height: window.innerWidth < 768 
        ? "clamp(14px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 16px)",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes slideIn {
            from { transform: translateX(-50%) translateY(-30px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `}
      </style>

      {submitted && (
        <div style={styles.submissionAlert}>
          <svg
            style={styles.checkmarkIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>
            Thank you for contacting us! We&apos;ve received your message and
            will respond shortly.
          </span>
        </div>
      )}

      {incompleteDetails && (
        <div style={styles.warningAlert}>
          <svg
            style={styles.warningIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Please fill in all required fields.</span>
        </div>
      )}

      {invalidEmail && (
        <div style={styles.warningAlert}>
          <svg
            style={styles.warningIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Please enter a valid email address.</span>
        </div>
      )}

      <div style={styles.content}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have questions or feedback? We&apos;d love to hear from you. Fill out
          the form below and our team will get back to you shortly.
        </p>

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              style={{
                ...styles.input,
                border: styles.input.border("name"),
                backgroundColor: styles.input.backgroundColor("name"),
              }}
              required
              value={name}
              onChange={handleChangeName}
            />
            <svg
              style={{
                ...styles.icon,
                color: styles.icon.color("name"),
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              style={{
                ...styles.input,
                border: styles.input.border("email"),
                backgroundColor: styles.input.backgroundColor("email"),
              }}
              onChange={handleChangeEmail}
              value={email}
              required
            />
            <svg
              style={{
                ...styles.icon,
                color: styles.icon.color("email"),
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div style={{ ...styles.inputGroup, position: "relative" }}>
            <select style={styles.select} onChange={handleIssue} value={issue}>
              <option>General Inquiry</option>
              <option>Search Issues</option>
              <option>Streaming Availability</option>
              <option>Technical Support</option>
              <option>Other</option>
            </select>

            <svg
              style={{
                position: "absolute",
                left: window.innerWidth < 768 
                  ? "clamp(12px, 3vw, 16px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(10px, 2vw, 14px)" 
                    : "clamp(12px, 1.5vw, 16px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: window.innerWidth < 768 
                  ? "clamp(16px, 3vw, 20px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(14px, 2.5vw, 18px)" 
                    : "clamp(16px, 2vw, 20px)",
                height: window.innerWidth < 768 
                  ? "clamp(16px, 3vw, 20px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(14px, 2.5vw, 18px)" 
                    : "clamp(16px, 2vw, 20px)",
                color: lightMode ? "#64748b" : "#94a3b8",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <svg
              style={{
                position: "absolute",
                right: window.innerWidth < 768 
                  ? "clamp(12px, 3vw, 16px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(10px, 2vw, 14px)" 
                    : "clamp(12px, 1.5vw, 16px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: window.innerWidth < 768 
                  ? "clamp(16px, 3vw, 20px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(14px, 2.5vw, 18px)" 
                    : "clamp(16px, 2vw, 20px)",
                height: window.innerWidth < 768 
                  ? "clamp(16px, 3vw, 20px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(14px, 2.5vw, 18px)" 
                    : "clamp(16px, 2vw, 20px)",
                color: lightMode ? "#64748b" : "#94a3b8",
                pointerEvents: "none",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div style={styles.inputGroup}>
            <textarea
              placeholder="Your Message (Optional)"
              style={styles.textArea}
              onChange={handleMessage}
              value={message}
            ></textarea>
            <svg
              style={{
                ...styles.icon,
                top: window.innerWidth < 768 
                  ? "clamp(16px, 3vw, 24px)" 
                  : window.innerWidth >= 768 && window.innerWidth < 1024 
                    ? "clamp(14px, 2.5vw, 20px)" 
                    : "clamp(16px, 2vw, 24px)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>

          <button
            type="submit"
            style={styles.button}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span style={styles.loadingSpinner}></span>
                Sending...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={window.innerWidth < 768 
                    ? "clamp(16px, 3vw, 18px)" 
                    : window.innerWidth >= 768 && window.innerWidth < 1024 
                      ? "clamp(14px, 2.5vw, 16px)" 
                      : "clamp(16px, 2vw, 18px)"}
                  height={window.innerWidth < 768 
                    ? "clamp(16px, 3vw, 18px)" 
                    : window.innerWidth >= 768 && window.innerWidth < 1024 
                      ? "clamp(14px, 2.5vw, 16px)" 
                      : "clamp(16px, 2vw, 18px)"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;