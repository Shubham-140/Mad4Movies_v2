import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const navigate = useNavigate();  

  const styles = {
    outerContainer: {
      backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
      minHeight: "100vh",
      width: "100%",
      overflowX: "hidden",
      position: "relative",
    },
    container: {
      padding: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px) clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "clamp(28px, 5vw, 40px) clamp(16px, 3vw, 28px)" 
          : "clamp(36px, 3vw, 64px) clamp(20px, 2vw, 40px)", 
      textAlign: "center",
      fontFamily: "'Inter', sans-serif",
      color: lightMode ? "#232A35" : "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "calc(100vh - 160px)",
      width: "100%",
      boxSizing: "border-box",
      maxWidth: window.innerWidth < 768 
        ? "100%" 
        : window.innerWidth < 1024 
          ? "min(960px, 95vw)" 
          : "min(1920px, 95vw)", 
      margin: "0 auto",
    },
    heroSection: {
      maxWidth: window.innerWidth < 768 
        ? "95vw" 
        : window.innerWidth < 1024 
          ? "min(900px, 92vw)" 
          : "min(1400px, 90vw)", 
      margin: window.innerWidth < 768 
        ? "0 auto clamp(24px, 6vw, 32px)" 
        : window.innerWidth < 1024 
          ? "0 auto clamp(28px, 4vw, 40px)" 
          : "0 auto clamp(36px, 3vw, 56px)", 
      width: "100%",
    },
    title: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1.5rem, 5vw, 2rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1.75rem, 3vw, 2.25rem)" 
          : "clamp(2.25rem, 2.5vw, 3.5rem)", 
      fontWeight: "800",
      marginBottom: window.innerWidth < 768 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(12px, 2vw, 16px)" 
          : "clamp(14px, 1.5vw, 20px)", 
      backgroundImage: lightMode
        ? "linear-gradient(90deg, #0076b3, #00a8ff)"
        : "linear-gradient(90deg, #00a8ff, #00d4ff)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      lineHeight: "1.2",
      letterSpacing: "-0.03em",
      padding: "0 2px",
    },
    subtitle: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1rem, 4vw, 1.5rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1.25rem, 2.5vw, 1.625rem)" 
          : "clamp(1.5rem, 1.8vw, 2rem)", 
      fontWeight: "700",
      margin: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px) 0 clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "clamp(28px, 4vw, 40px) 0 clamp(16px, 2.5vw, 24px)" 
          : "clamp(40px, 2.5vw, 56px) 0 clamp(20px, 1.5vw, 32px)", 
      color: lightMode ? "#444" : "#ddd",
      position: "relative",
      display: "inline-block",
    },
    subtitleUnderline: {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: window.innerWidth < 768 
        ? "clamp(40px, 12vw, 60px)" 
        : window.innerWidth < 1024 
          ? "clamp(48px, 7vw, 64px)" 
          : "clamp(56px, 4vw, 80px)", 
      height: "4px",
      background: lightMode ? "#0076b3" : "#00a8ff",
      borderRadius: "2px",
    },
    paragraph: {
      fontSize: window.innerWidth < 768 
        ? "clamp(0.875rem, 3.5vw, 1rem)" 
        : window.innerWidth < 1024 
          ? "clamp(0.9375rem, 1.8vw, 1.0625rem)" 
          : "clamp(1rem, 0.9vw, 1.25rem)", 
      lineHeight: "1.7",
      margin: window.innerWidth < 768 
        ? "0 auto clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "0 auto clamp(16px, 2.5vw, 24px)" 
          : "0 auto clamp(20px, 1.5vw, 32px)", 
      color: lightMode ? "#333" : "#ccc",
      maxWidth: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth < 1024 
          ? "min(800px, 90vw)" 
          : "min(1000px, 85vw)", 
      padding: window.innerWidth < 768 
        ? "0 clamp(8px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "0 clamp(8px, 1.5vw, 12px)" 
          : "0 clamp(10px, 1vw, 16px)", 
    },
    featureContainer: {
      display: "grid",
      gridTemplateColumns: window.innerWidth < 768 
        ? "1fr" 
        : "repeat(auto-fit, minmax(min(260px, 28vw), 1fr))", 
      gap: window.innerWidth < 768 
        ? "clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 2.5vw, 24px)" 
          : "clamp(20px, 1.5vw, 32px)", 
      margin: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px) auto" 
        : window.innerWidth < 1024 
          ? "clamp(24px, 4vw, 36px) auto" 
          : "clamp(32px, 2vw, 48px) auto", 
      width: "100%",
      maxWidth: window.innerWidth < 768 
        ? "95vw" 
        : window.innerWidth < 1024 
          ? "min(900px, 92vw)" 
          : "min(1400px, 90vw)", 
      padding: window.innerWidth < 768 
        ? "0 clamp(8px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "0 clamp(8px, 1.5vw, 12px)" 
          : "0 clamp(10px, 1vw, 16px)", 
    },
    featureBox: {
      padding: window.innerWidth < 768 
        ? "clamp(20px, 5vw, 24px) clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(20px, 3vw, 24px) clamp(12px, 2vw, 16px)" 
          : "clamp(24px, 2vw, 32px) clamp(14px, 1.5vw, 20px)", 
      borderRadius: "16px",
      backgroundColor: lightMode ? "white" : "#2d3748",
      boxShadow: lightMode
        ? "0 10px 30px rgba(0, 118, 179, 0.15)"
        : "0 10px 30px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      transition: "all 0.3s ease",
      border: lightMode ? "none" : "1px solid rgba(255,255,255,0.1)",
      position: "relative",
      overflow: "hidden",
    },
    featureIcon: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1.5rem, 5vw, 2rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1.625rem, 2.5vw, 2rem)" 
          : "clamp(1.875rem, 1.5vw, 2.5rem)", 
      marginBottom: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 12px)" 
        : window.innerWidth < 1024 
          ? "clamp(8px, 1.5vw, 12px)" 
          : "clamp(10px, 1vw, 14px)", 
      color: lightMode ? "#0076b3" : "#00a8ff",
    },
    featureTitle: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1rem, 3vw, 1.125rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1rem, 1.8vw, 1.125rem)" 
          : "clamp(1.125rem, 0.9vw, 1.375rem)", 
      fontWeight: "700",
      marginBottom: window.innerWidth < 768 
        ? "clamp(8px, 2vw, 12px)" 
        : window.innerWidth < 1024 
          ? "clamp(8px, 1.5vw, 12px)" 
          : "clamp(10px, 1vw, 14px)", 
      color: lightMode ? "#232A35" : "#fff",
    },
    featureDesc: {
      fontSize: window.innerWidth < 768 
        ? "clamp(0.875rem, 3vw, 0.9375rem)" 
        : window.innerWidth < 1024 
          ? "clamp(0.875rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.9375rem, 0.8vw, 1.0625rem)", 
      lineHeight: "1.7",
      color: lightMode ? "#555" : "#bbb",
    },
    securityPointsContainer: {
      margin: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px) auto" 
        : window.innerWidth < 1024 
          ? "clamp(28px, 4vw, 40px) auto" 
          : "clamp(40px, 2.5vw, 56px) auto", 
      width: window.innerWidth < 768 
        ? "90vw" 
        : window.innerWidth < 1024 
          ? "min(800px, 90vw)" 
          : "min(1000px, 85vw)", 
    },
    securityPoint: {
      marginBottom: window.innerWidth < 768 
        ? "clamp(20px, 5vw, 32px)" 
        : window.innerWidth < 1024 
          ? "clamp(20px, 3vw, 28px)" 
          : "clamp(24px, 1.8vw, 36px)", 
      textAlign: "center",
    },
    securityTitle: {
      fontSize: window.innerWidth < 768 
        ? "clamp(1rem, 3vw, 1.125rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1rem, 1.8vw, 1.125rem)" 
          : "clamp(1.125rem, 0.9vw, 1.375rem)", 
      fontWeight: "600",
      marginBottom: window.innerWidth < 768 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth < 1024 
          ? "clamp(6px, 1.5vw, 8px)" 
          : "clamp(8px, 0.8vw, 10px)", 
      color: lightMode ? "#0076b3" : "#00a8ff",
    },
    button: {
      padding: window.innerWidth < 768 
        ? "clamp(10px, 3vw, 12px) clamp(24px, 6vw, 32px)" 
        : window.innerWidth < 1024 
          ? "clamp(10px, 2vw, 12px) clamp(24px, 4vw, 32px)" 
          : "clamp(12px, 1vw, 14px) clamp(28px, 2vw, 40px)", 
      background: lightMode
        ? "linear-gradient(90deg, #0076b3, #00a8ff)"
        : "linear-gradient(90deg, #005e76, #008299)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: window.innerWidth < 768 
        ? "clamp(0.875rem, 3vw, 0.9375rem)" 
        : window.innerWidth < 1024 
          ? "clamp(0.875rem, 1.5vw, 0.9375rem)" 
          : "clamp(0.9375rem, 0.8vw, 1.0625rem)", 
      fontWeight: "600",
      transition: "all 0.3s ease",
      marginTop: window.innerWidth < 768 
        ? "clamp(24px, 6vw, 32px)" 
        : window.innerWidth < 1024 
          ? "clamp(28px, 4vw, 40px)" 
          : "clamp(40px, 2.5vw, 56px)", 
      boxShadow: lightMode
        ? "0 5px 20px rgba(0, 118, 179, 0.3)"
        : "0 5px 20px rgba(0, 168, 255, 0.3)",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <div style={styles.heroSection}>
          <h2 style={styles.title}>About Mad4Movies</h2>
          <p style={styles.paragraph}>
            Welcome to our platform, where entertainment meets discovery. We
            pride ourselves on offering an immersive experience that allows you
            to access an extensive library of movies, TV shows, and
            documentaries from all over the world.
          </p>
        </div>

        <div>
          <h3 style={styles.subtitle}>
            Why Choose Us?
            <span style={styles.subtitleUnderline}></span>
          </h3>

          <div style={styles.featureContainer}>
            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>🎬</div>
              <h4 style={styles.featureTitle}>Vast Content Library</h4>
              <p style={styles.featureDesc}>
                From the latest blockbusters to cult classics, our library
                covers a wide range of genres, making it easy to find exactly
                what you&apos;re in the mood for.
              </p>
            </div>

            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>🤖</div>
              <h4 style={styles.featureTitle}>Smart Recommendations</h4>
              <p style={styles.featureDesc}>
                We provide tailored recommendations based on your viewing
                preferences. The more you watch, the better we get at suggesting
                new content you&apos;ll love.
              </p>
            </div>

            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>✨</div>
              <h4 style={styles.featureTitle}>Seamless Interface</h4>
              <p style={styles.featureDesc}>
                Our platform is designed for a smooth, hassle-free experience.
                With an intuitive interface, browsing for movies and shows is
                just a few clicks away.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.securityPointsContainer}>
          <h3 style={styles.subtitle}>
            Our Security Commitment
            <span style={styles.subtitleUnderline}></span>
          </h3>

          <div style={styles.securityPoint}>
            <h4 style={styles.securityTitle}>Data Encryption</h4>
            <p style={styles.featureDesc}>
              All sensitive data is encrypted using AES-256 standards, both in
              transit and at rest.
            </p>
          </div>

          <div style={styles.securityPoint}>
            <h4 style={styles.securityTitle}>Regular Audits</h4>
            <p style={styles.featureDesc}>
              We conduct quarterly security audits with independent
              third-party experts.
            </p>
          </div>

          <div style={styles.securityPoint}>
            <h4 style={styles.securityTitle}>Privacy First</h4>
            <p style={styles.featureDesc}>
              We never sell your data and provide granular control over what
              information we collect.
            </p>
          </div>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/contact")}
        >
          Contact Mad4Movies
        </button>
      </div>
    </div>
  );
};

export default About;