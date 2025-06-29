import { useDispatch, useSelector } from "react-redux";
import { cancelFAQSubmittedPrompt } from "../features/FAQSlice";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function FAQSubmittedPrompt() {
  const lightMode = useSelector((state) => state.color.isDarkMode ?? false);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 374px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });

  useEffect(() => {
    const handlePressClose = (e) => {
      if (e.key === "Escape") {
        dispatch(cancelFAQSubmittedPrompt());
      }
    };

    document.addEventListener("keydown", handlePressClose);

    return () => {
      document.removeEventListener("keydown", handlePressClose);
    };
  }, [dispatch]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 1000,
        padding: isSmallMobile ? "10px" : isMobile ? "15px" : isTablet ? "clamp(12px, 2vw, 18px)" : "clamp(15px, 1.5vw, 20px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "500px" : isTablet ? "clamp(380px, 80vw, 460px)" : "clamp(460px, 50vw, 540px)",
          borderRadius: isSmallMobile ? "12px" : isMobile ? "14px" : isTablet ? "15px" : "16px",
          padding: isSmallMobile ? "20px" : isMobile ? "30px" : isTablet ? "clamp(20px, 3vw, 25px)" : "clamp(25px, 2.5vw, 35px)",
          textAlign: "center",
          background: lightMode ? "#f0f4ff" : "#475368",
          color: lightMode ? "#2d3748" : "#f7fafc",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          border: lightMode
            ? "1px solid rgba(226, 232, 240, 0.8)"
            : "1px solid rgba(74, 85, 104, 0.5)",
          position: "relative",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: isSmallMobile ? "60px" : isMobile ? "80px" : isTablet ? "clamp(70px, 10vw, 90px)" : "clamp(90px, 8vw, 110px)",
            height: isSmallMobile ? "60px" : isMobile ? "80px" : isTablet ? "clamp(70px, 10vw, 90px)" : "clamp(90px, 8vw, 110px)",
            background: lightMode
              ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)"
              : "linear-gradient(135deg, rgba(66, 153, 225, 0.2), transparent)",
            borderRadius: "0 0 0 100%",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: isSmallMobile ? "60px" : isMobile ? "80px" : isTablet ? "clamp(70px, 10vw, 90px)" : "clamp(90px, 8vw, 110px)",
            height: isSmallMobile ? "60px" : isMobile ? "80px" : isTablet ? "clamp(70px, 10vw, 90px)" : "clamp(90px, 8vw, 110px)",
            background: lightMode
              ? "linear-gradient(315deg, rgba(59, 130, 246, 0.1), transparent)"
              : "linear-gradient(315deg, rgba(66, 153, 225, 0.2), transparent)",
            borderRadius: "0 100% 0 0",
          }}
        ></div>

        <div
          style={{
            width: isSmallMobile ? "60px" : isMobile ? "70px" : isTablet ? "clamp(65px, 9vw, 75px)" : "clamp(75px, 7vw, 85px)",
            height: isSmallMobile ? "60px" : isMobile ? "70px" : isTablet ? "clamp(65px, 9vw, 75px)" : "clamp(75px, 7vw, 85px)",
            borderRadius: "50%",
            background: lightMode
              ? "rgba(72, 187, 120, 0.1)"
              : "rgba(72, 187, 120, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `0 auto ${isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "clamp(15px, 2vw, 20px)" : "clamp(20px, 1.8vw, 25px)"}`,
            border: lightMode
              ? "2px solid rgba(72, 187, 120, 0.3)"
              : "2px solid rgba(72, 187, 120, 0.4)",
          }}
        >
          <svg
            width={isSmallMobile ? "30px" : isMobile ? "35px" : isTablet ? "clamp(32px, 4vw, 36px)" : "clamp(36px, 3vw, 40px)"}
            height={isSmallMobile ? "30px" : isMobile ? "35px" : isTablet ? "clamp(32px, 4vw, 36px)" : "clamp(36px, 3vw, 40px)"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#48BB78"
            strokeWidth="2"
            strokeLinecap= "round"
            strokeLinejoin= "round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h2
          style={{
            fontSize: isSmallMobile ? "1.5rem" : isMobile ? "1.6rem" : isTablet ? "clamp(1.4rem, 2.5vw, 1.6rem)" : "clamp(1.6rem, 2vw, 1.8rem)",
            fontWeight: "700",
            marginBottom: isSmallMobile ? "10px" : isMobile ? "12px" : isTablet ? "clamp(8px, 1.5vw, 10px)" : "clamp(10px, 1.2vw, 12px)",
            fontFamily: "'Poppins', sans-serif",
            position: "relative",
          }}
        >
          FAQ Submitted Successfully
          <div
            style={{
              width: isSmallMobile ? "40px" : isMobile ? "50px" : isTablet ? "clamp(45px, 6vw, 55px)" : "clamp(55px, 5vw, 65px)",
              height: "4px",
              background: lightMode ? "#4299e1" : "#63b3ed",
              margin: `${isSmallMobile ? "10px" : isMobile ? "12px" : isTablet ? "clamp(8px, 1.5vw, 10px)" : "clamp(10px, 1.2vw, 12px)"} auto 0`,
              borderRadius: "2px",
            }}
          ></div>
        </h2>

        <p
          style={{
            fontSize: isSmallMobile ? "0.9rem" : isMobile ? "0.95rem" : isTablet ? "clamp(0.85rem, 1.2vw, 0.9rem)" : "clamp(0.9rem, 1vw, 1rem)",
            color: lightMode ? "#4a5568" : "#a0aec0",
            lineHeight: "1.6",
            marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "clamp(15px, 2vw, 20px)" : "clamp(20px, 1.8vw, 25px)",
          }}
        >
          Thank you for your contribution! Our team will review your question
          and add it to our FAQs soon.
        </p>
      </div>
    </div>
  );
}

export default FAQSubmittedPrompt;