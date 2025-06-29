import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
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
  const isTablet = deviceType === "tablet";

  const styles = {
    container: {
      padding: isMobile 
        ? "clamp(24px, 6vw, 32px) clamp(16px, 4vw, 24px)" 
        : isTablet 
          ? "clamp(20px, 4vw, 28px) clamp(14px, 2.5vw, 20px)" 
          : "clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)",
      fontFamily: "'Inter', sans-serif",
      backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
      color: lightMode ? "#232A35" : "#ffffff",
      minHeight: isMobile 
        ? "calc(100vh - 160px)" 
        : isTablet 
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
      maxWidth: isMobile 
        ? "95vw" 
        : isTablet 
          ? "min(900px, 92vw)" 
          : "min(1200px, 90vw)",
      margin: "0 auto",
      position: "relative",
    },
    title: {
      fontSize: isMobile 
        ? "clamp(1.5rem, 5vw, 2rem)" 
        : isTablet 
          ? "clamp(1.625rem, 3vw, 2rem)" 
          : "clamp(1.875rem, 2.5vw, 2.75rem)",
      fontWeight: "800",
      marginBottom: isMobile 
        ? "clamp(16px, 3vw, 20px)" 
        : isTablet 
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
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 2px",
      boxDecorationBreak: "clone",
      backgroundOrigin: "padding-box",
    },
    subtitle: {
      fontSize: isMobile 
        ? "clamp(0.875rem, 3.5vw, 1rem)" 
        : isTablet 
          ? "clamp(0.875rem, 1.8vw, 1rem)" 
          : "clamp(0.9375rem, 0.9vw, 1.125rem)",
      color: lightMode ? "#555" : "#bbb",
      marginBottom: isMobile 
        ? "clamp(16px, 4vw, 24px)" 
        : isTablet 
          ? "clamp(14px, 2.5vw, 20px)" 
          : "clamp(16px, 1.5vw, 24px)",
      textAlign: "center",
      lineHeight: "1.6",
      maxWidth: isMobile 
        ? "90vw" 
        : isTablet 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
      marginLeft: "auto",
      marginRight: "auto",
    },
    policyContainer: {
      backgroundColor: lightMode
        ? "rgba(255,255,255,0.8)"
        : "rgba(45, 55, 72, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: isMobile 
        ? "clamp(8px, 3vw, 12px)" 
        : isTablet 
          ? "clamp(8px, 2vw, 12px)" 
          : "clamp(10px, 1.5vw, 16px)",
      padding: isMobile 
        ? "clamp(20px, 5vw, 24px) clamp(12px, 3vw, 16px)" 
        : isTablet 
          ? "clamp(16px, 3vw, 20px) clamp(10px, 2vw, 14px)" 
          : "clamp(20px, 2vw, 24px) clamp(12px, 1.5vw, 16px)",
      boxShadow: lightMode
        ? "0 10px 30px rgba(0, 118, 179, 0.15)"
        : "0 10px 30px rgba(0, 0, 0, 0.3)",
      border: lightMode
        ? "1px solid rgba(226, 232, 240, 0.8)"
        : "1px solid rgba(74, 85, 104, 0.5)",
      maxWidth: isMobile 
        ? "95vw" 
        : isTablet 
          ? "min(700px, 90vw)" 
          : "min(800px, 85vw)",
      margin: "0 auto",
      width: isMobile 
        ? "90vw" 
        : isTablet 
          ? "min(650px, 88vw)" 
          : "min(750px, 85vw)",
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: isMobile 
        ? "clamp(1rem, 4vw, 1.25rem)" 
        : isTablet 
          ? "clamp(1.125rem, 2vw, 1.375rem)" 
          : "clamp(1.25rem, 1.5vw, 1.5rem)",
      fontWeight: "700",
      margin: isMobile 
        ? "clamp(20px, 4vw, 24px) 0 clamp(12px, 2vw, 16px) 0" 
        : isTablet 
          ? "clamp(16px, 3vw, 20px) 0 clamp(10px, 1.5vw, 14px) 0" 
          : "clamp(20px, 2vw, 24px) 0 clamp(12px, 1vw, 16px) 0",
      color: lightMode ? "#1e40af" : "#60a5fa",
      position: "relative",
      paddingLeft: isMobile 
        ? "clamp(16px, 3vw, 20px)" 
        : isTablet 
          ? "clamp(14px, 2vw, 18px)" 
          : "clamp(16px, 1.5vw, 20px)",
    },
    sectionBullet: {
      position: "absolute",
      left: "0",
      top: isMobile 
        ? "clamp(8px, 2vw, 10px)" 
        : isTablet 
          ? "clamp(7px, 1.5vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      width: isMobile 
        ? "clamp(8px, 1.5vw, 10px)" 
        : isTablet 
          ? "clamp(7px, 1.2vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      height: isMobile 
        ? "clamp(8px, 1.5vw, 10px)" 
        : isTablet 
          ? "clamp(7px, 1.2vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      backgroundColor: lightMode ? "#1e40af" : "#60a5fa",
      borderRadius: "50%",
    },
    paragraph: {
      fontSize: isMobile 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : isTablet 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      lineHeight: "1.8",
      marginBottom: isMobile 
        ? "clamp(12px, 3vw, 16px)" 
        : isTablet 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      color: lightMode ? "#4a5568" : "#cbd5e0",
    },
    highlightBox: {
      backgroundColor: lightMode
        ? "rgba(0, 118, 179, 0.05)"
        : "rgba(0, 168, 255, 0.05)",
      padding: isMobile 
        ? "clamp(12px, 3vw, 16px)" 
        : isTablet 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      borderRadius: isMobile 
        ? "clamp(6px, 2vw, 8px)" 
        : isTablet 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      margin: isMobile 
        ? "clamp(20px, 4vw, 24px) 0" 
        : isTablet 
          ? "clamp(16px, 3vw, 20px) 0" 
          : "clamp(20px, 2vw, 24px) 0",
      borderLeft: `4px solid ${lightMode ? "#1e40af" : "#60a5fa"}`,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information when you use our services.
        </p>

        <div style={styles.policyContainer}>
          {/* Rest of the content remains exactly the same */}
          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              1. Information We Collect
            </h2>
            <p style={styles.paragraph}>
              We may collect personal information such as your name, email
              address, and preferences when you register or interact with our
              platform. We also collect usage data to improve our services.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              2. How We Use Your Information
            </h2>
            <p style={styles.paragraph}>
              Your information helps us provide and improve our services,
              personalize your experience, and communicate important updates. We
              never sell your data to third parties.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              3. Data Security
            </h2>
            <p style={styles.paragraph}>
              We implement industry-standard security measures to protect your
              information. However, no system is completely secure, so we
              recommend using strong passwords and keeping your login details
              private.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              4. Cookies & Tracking
            </h2>
            <p style={styles.paragraph}>
              Our platform uses cookies to enhance your experience. You can
              manage cookie preferences through your browser settings if you
              prefer not to be tracked.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              5. Your Rights
            </h2>
            <p style={styles.paragraph}>
              You have the right to access, correct, or delete your personal
              information. Contact us if you have any privacy concerns or
              requests regarding your data.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              6. Policy Updates
            </h2>
            <p style={styles.paragraph}>
              We may update this policy periodically. Significant changes will
              be communicated through our platform or via email when required by
              law.
            </p>
          </div>

          <div style={styles.highlightBox}>
            <p
              style={{
                ...styles.paragraph,
                marginBottom: "0",
                color: lightMode ? "#1e40af" : "#93c5fd",
              }}
            >
              If you have any questions about our Privacy Policy or how we
              handle your data, please don&apos;t hesitate to contact our
              support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;