import { useSelector } from "react-redux";

const Cookies = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);

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
          : "min(1200px, 90vw)",
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
        ? "clamp Timothy, 3vw, 16px)" 
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
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 2px",
      boxDecorationBreak: "clone",
      backgroundOrigin: "padding-box",
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
    policyContainer: {
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
    sectionTitle: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1rem, 4vw, 1.25rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(1.125rem, 2vw, 1.375rem)" 
          : "clamp(1.25rem, 1.5vw, 1.5rem)",
      fontWeight: "700",
      margin: window.innerWidth < 768 
        ? "clamp(20px, 4vw, 24px) 0 clamp(12px, 2vw, 16px) 0" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(16px, 3vw, 20px) 0 clamp(10px, 1.5vw, 14px) 0" 
          : "clamp(20px, 2vw, 24px) 0 clamp(12px, 1vw, 16px) 0",
      color: lightMode ? "#1e40af" : "#60a5fa",
      position: "relative",
      paddingLeft: window.innerWidth < 768 
        ? "clamp(16px, 3vw, 20px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(14px, 2vw, 18px)" 
          : "clamp(16px, 1.5vw, 20px)",
    },
    sectionBullet: {
      position: "absolute",
      left: "0",
      top: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 10px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(7px, 1.5vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      width: window.innerWidth < 768 
        ? "clamp(8px, 1.5vw, 10px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(7px, 1.2vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      height: window.innerWidth < 768 
        ? "clamp(8px, 1.5vw, 10px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(7px, 1.2vw, 9px)" 
          : "clamp(8px, 1vw, 10px)",
      backgroundColor: lightMode ? "#1e40af" : "#60a5fa",
      borderRadius: "50%",
    },
    paragraph: {
      fontSize: window.innerWidth < 768 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(0.8125rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.875rem, 0.8vw, 1rem)",
      lineHeight: "1.8",
      marginBottom: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      color: lightMode ? "#4a5568" : "#cbd5e0",
    },
    highlightBox: {
      backgroundColor: lightMode
        ? "rgba(0, 118, 179, 0.05)"
        : "rgba(0, 168, 255, 0.05)",
      padding: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px)" 
          : "clamp(12px, 1.5vw, 16px)",
      borderRadius: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 1vw, 10px)",
      margin: window.innerWidth < 768 
        ? "clamp(20px, 4vw, 24px) 0" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(16px, 3vw, 20px) 0" 
          : "clamp(20px, 2vw, 24px) 0",
      borderLeft: `4px solid ${lightMode ? "#1e40af" : "#60a5fa"}`,
    },
    cookieList: {
      listStyleType: "none",
      paddingLeft: "0",
      margin: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px) 0" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 14px) 0" 
          : "clamp(12px, 1.5vw, 16px) 0",
    },
    cookieItem: {
      marginBottom: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 12px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(7px, 1.5vw, 10px)" 
          : "clamp(8px, 1vw, 12px)",
      paddingLeft: window.innerWidth < 768 
        ? "clamp(16px, 3vw, 20px)" 
        : window.innerWidth >= 768 && window.innerWidth < 1024 
          ? "clamp(14px, 2vw, 18px)" 
          : "clamp(16px, 1.5vw, 20px)",
      position: "relative",
    },
    cookieType: {
      fontWeight: "600",
      color: lightMode ? "#1e40af" : "#60a5fa",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Cookie Policy</h1>
        <p style={styles.subtitle}>
          This policy explains how we use cookies and similar technologies when
          you visit our website.
        </p>

        <div style={styles.policyContainer}>
          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              What Are Cookies?
            </h2>
            <p style={styles.paragraph}>
              Cookies are small text files stored on your device when you visit
              websites. They help sites remember information about your visit,
              which can make it easier to visit the site again and make the site
              more useful to you.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              How We Use Cookies
            </h2>
            <p style={styles.paragraph}>We use cookies for several purposes:</p>
            <ul style={styles.cookieList}>
              <li style={styles.cookieItem}>
                <span style={styles.cookieType}>Essential Cookies:</span>{" "}
                Necessary for the website to function properly
              </li>
              <li style={styles.cookieItem}>
                <span style={styles.cookieType}>Performance Cookies:</span> Help
                us understand how visitors interact with our website
              </li>
              <li style={styles.cookieItem}>
                <span style={styles.cookieType}>Functional Cookies:</span>{" "}
                Enable enhanced functionality and personalization
              </li>
              <li style={styles.cookieItem}>
                <span style={styles.cookieType}>Analytics Cookies:</span> Help
                us improve our website by collecting usage data
              </li>
            </ul>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              Managing Cookies
            </h2>
            <p style={styles.paragraph}>
              Most web browsers allow some control of cookies through browser
              settings. You can set your browser to notify you when you receive
              a cookie, giving you the chance to decide whether to accept it.
            </p>
            <p style={styles.paragraph}>
              However, please note that if you disable cookies, some features of
              our website may not function properly.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              Third-Party Cookies
            </h2>
            <p style={styles.paragraph}>
              We may use services from third parties that set their own cookies
              to provide features or analyze site usage. These cookies are
              governed by the privacy policies of those third parties.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionBullet}></span>
              Changes to This Policy
            </h2>
            <p style={styles.paragraph}>
              We may update this Cookie Policy from time to time. We encourage
              you to periodically review this page for the latest information on
              our cookie practices.
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
              By continuing to use our website, you consent to our use of
              cookies as described in this policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;