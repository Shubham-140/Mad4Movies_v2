import { useSelector } from "react-redux";

function EmptyState({ icon = "🔍", title, message }) {
  const lightMode = useSelector((state) => state.color.isDarkMode);

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "50vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        textAlign: "center",
        color: lightMode ? "#4a5568" : "#a0aec0",
      }}
    >
      <div style={{ fontSize: "3.5rem", marginBottom: "1rem", opacity: 0.7 }}>
        {icon}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "1.25rem",
          fontWeight: 500,
          color: lightMode ? "#374151" : "#e5e7eb",
        }}
      >
        {title}
      </p>
      {message && (
        <p style={{ margin: "0.5rem 0 0", fontSize: "1rem" }}>{message}</p>
      )}
    </div>
  );
}

export default EmptyState;
