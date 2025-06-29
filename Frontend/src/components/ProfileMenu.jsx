import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../features/AuthSlice";

function ProfileMenu() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          zIndex: 999,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "2px",
          top: "40.334px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: lightMode ? "#f0f4ff" : "#232A35",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            width: "125px",
            padding: "8px 0",
            border: "1px solid #3a4556",
          }}
        >
          <Link
            to={`/user/${currentUser?.username}`}
            style={{
              padding: "12px 16px",
              color: lightMode ? "black" : "white",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#3a4556",
              },
              textDecoration: "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>My Profile</span>
          </Link>

          <div
            style={{
              height: "1px",
              backgroundColor: "#3a4556",
              margin: "4px 0",
            }}
          />

          <div
            style={{
              padding: "12px 16px",
              color: lightMode ? "red" : "#F87171",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#3a4556",
              },
            }}
            onClick={() => {
              dispatch(handleLogout());
              localStorage.removeItem("auth_token");
              window.location.reload();
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
