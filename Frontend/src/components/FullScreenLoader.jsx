import { useSelector } from "react-redux";

function FullScreenLoader() {
  const lightMode = useSelector((state) => state.color?.isDarkMode ?? false);

  const bg = lightMode ? "#f0f4ff" : "#232A35";
  const track = lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)";
  const text = lightMode ? "#4a5568" : "#a0aec0";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: bg,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: `4px solid ${track}`,
          borderTopColor: "#E50914",
          animation: "m4m-fullscreen-spin 0.85s linear infinite",
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: 500,
          color: text,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.3px",
        }}
      >
        Loading...
      </p>
      <style>
        {`
          @keyframes m4m-fullscreen-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default FullScreenLoader;
