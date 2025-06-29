import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckInbox() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const navigate = useNavigate();
  const allowed = sessionStorage.getItem("authflow") === "true";

  useEffect(() => {
    if (!allowed) {
      navigate("/");
    } else {
      sessionStorage.removeItem("authflow");
    }
  }, [navigate, allowed]);

  const colors = {
    background: lightMode ? "#f0f4ff" : "#232A35",
    cardBg: lightMode ? "#ffffff" : "#2D3748",
    textPrimary: lightMode ? "#111827" : "#F7FAFC",
    textSecondary: lightMode ? "#6b7280" : "#A0AEC0",
    accent: "#3b82f6",
    accentHover: "#2563eb",
    infoBg: lightMode ? "#f9fafb" : "#1A202C",
    border: lightMode ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: window.innerWidth <= 768 ? "clamp(60vh, 80vw, 80vh)" : "clamp(70vh, 80vh, 90vh)", 
        padding: window.innerWidth <= 768 ? "clamp(0.75rem, 4vw, 1rem)" : "clamp(15px, 5vw, 40px)",
        backgroundColor: colors.background,
      }}
    >
      <div
        style={{
          width: window.innerWidth <= 768 ? "clamp(260px, 90vw, 320px)" : "100%", 
          maxWidth: window.innerWidth <= 768 ? "clamp(260px, 90vw, 320px)" : "min(90vw, 550px)", 
          margin: "0 auto",
          padding: window.innerWidth <= 768 ? "clamp(0.875rem, 4vw, 1.25rem)" : "clamp(20px, 5vw, 40px)", 
          backgroundColor: colors.cardBg,
          borderRadius: window.innerWidth <= 768 ? "clamp(8px, 3vw, 12px)" : "clamp(12px, 2vw, 16px)", 
          boxShadow: lightMode
            ? "0 10px 30px rgba(0, 0, 0, 0.08)"
            : "0 10px 30px rgba(0, 0, 0, 0.3)",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          textAlign: "center",
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            width: window.innerWidth <= 768 ? "clamp(50px, 12vw, 70px)" : "clamp(60px, 15vw, 80px)", 
            height: window.innerWidth <= 768 ? "clamp(50px, 12vw, 70px)" : "clamp(60px, 15vw, 80px)", 
            margin: window.innerWidth <= 768 ? "0 auto clamp(12px, 3vw, 20px)" : "0 auto clamp(16px, 3vw, 24px)", 
            backgroundColor: lightMode ? "#f0f7ff" : "#1E3A8A",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={window.innerWidth <= 768 ? "clamp(24px, 6vw, 32px)" : "clamp(30px, 8vw, 40px)"} 
            height={window.innerWidth <= 768 ? "clamp(24px, 6vw, 32px)" : "clamp(30px, 8vw, 40px)"} 
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92V9.08C22 5.38 21.11 4 17 4H7C2.89 4 2 5.38 2 9.08V16.92C2 20.62 2.89 22 7 22H17C21.11 22 22 20.62 22 16.92Z"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 9L12 12L7 9"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          style={{
            fontSize: window.innerWidth <= 768 ? "clamp(1rem, 4vw, 1.25rem)" : "clamp(1.25rem, 5vw, 1.5rem)", 
            fontWeight: "600",
            color: colors.textPrimary,
            marginBottom: window.innerWidth <= 768 ? "clamp(6px, 2vw, 10px)" : "clamp(8px, 2vw, 12px)", 
          }}
        >
          Check your mailbox
        </h1>

        <p
          style={{
            fontSize: window.innerWidth <= 768 ? "clamp(0.75rem, 3vw, 0.875rem)" : "clamp(0.875rem, 1vw, 0.9375rem)", 
            color: colors.textSecondary,
            lineHeight: "1.5",
            marginBottom: window.innerWidth <= 768 ? "clamp(16px, 4vw, 24px)" : "clamp(24px, 5vw, 32px)", 
          }}
        >
          A password reset link has been sent to your mailbox, only if an account
          exists with this email.
        </p>

        <button
          style={{
            width: "100%",
            padding: window.innerWidth <= 768 ? "clamp(10px, 2.5vw, 12px)" : "clamp(12px, 2vw, 14px)", 
            backgroundColor: colors.accent,
            color: "white",
            border: "none",
            borderRadius: window.innerWidth <= 768 ? "clamp(4px, 1.5vw, 6px)" : "clamp(6px, 1vw, 8px)",
            fontSize: window.innerWidth <= 768 ? "clamp(0.75rem, 3vw, 0.875rem)" : "clamp(0.875rem, 1vw, 0.9375rem)", 
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = colors.accentHover)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = colors.accent)}
        >
          Continue to Homepage
        </button>

        <p
          style={{
            fontSize: window.innerWidth <= 768 ? "clamp(0.6875rem, 2.5vw, 0.75rem)" : "clamp(0.8125rem, 1vw, 0.875rem)", 
            color: colors.textSecondary,
            marginTop: window.innerWidth <= 768 ? "clamp(12px, 3vw, 16px)" : "clamp(16px, 3vw, 24px)", 
          }}
        >
          Need help?{" "}
          <span
            style={{
              color: colors.accent,
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() => navigate("/contact")}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Contact support
          </span>
        </p>

        <p
          style={{
            fontSize: window.innerWidth <= 768 ? "clamp(0.625rem, 2.5vw, 0.75rem)" : "clamp(0.75rem, 1vw, 0.8125rem)", 
            color: colors.textSecondary,
            marginTop: window.innerWidth <= 768 ? "clamp(8px, 2vw, 12px)" : "clamp(12px, 3vw, 20px)", 
          }}
        >
          <strong>Note:</strong> This page is part of a secure password reset
          flow. Reloading or accessing it directly will redirect you to the
          homepage for security reasons.
        </p>
      </div>
    </div>
  );
}

export default CheckInbox;