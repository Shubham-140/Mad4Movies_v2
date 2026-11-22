import { useSelector } from "react-redux";

function FullScreenLoader() {
  const lightMode = useSelector((state) => state.color.isDarkMode);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: `4px solid ${lightMode ? "#e2e8f0" : "#4a5568"}`,
          borderTop: `4px solid ${lightMode ? "#4299e1" : "#63b3ed"}`,
          borderRadius: "50%",
          animation: "fullScreenLoaderSpin 1s linear infinite",
        }}
      ></div>
      <p
        style={{
          marginTop: "16px",
          color: lightMode ? "#4a5568" : "#a0aec0",
          fontSize: "1rem",
        }}
      >
        Loading...
      </p>
      <style>{`
        @keyframes fullScreenLoaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default FullScreenLoader;
