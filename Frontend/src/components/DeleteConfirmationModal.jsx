import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../features/ReviewSlice";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'

function DeleteConfirmationModal({ reviewIdToSend, setConfirmDeleteReview }) {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const movieId = useSelector((state) => state.movieDetails.movieId);
  const dispatch = useDispatch();
  const deleteModalRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleCloseModal(e) {
      if (
        deleteModalRef?.current &&
        !deleteModalRef?.current?.contains(e.target)
      ) {
        setConfirmDeleteReview(false);
      }
    }
    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [deleteModalRef, setConfirmDeleteReview]);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(1px)",
    },
    modalContainer: {
      background: lightMode ? "#ffffff" : "#232A35",
      borderRadius: isMobile 
        ? "clamp(6px, 2vw, 8px)" 
        : window.innerWidth < 1024 
          ? "clamp(8px, 1.8vw, 10px)" 
          : "clamp(10px, 1.5vw, 12px)",
      padding: isMobile 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 2.5vw, 20px)" 
          : "clamp(20px, 2vw, 24px)",
      width: isMobile 
        ? "clamp(240px, 85vw, 300px)" 
        : window.innerWidth < 1024 
          ? "clamp(320px, 80vw, 450px)" 
          : "clamp(360px, 75vw, 500px)",
      boxShadow: lightMode
        ? "0 10px 25px rgba(0, 0, 0, 0.15)"
        : "0 10px 25px rgba(0, 0, 0, 0.3)",
      border: lightMode ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
    },
    content: {
      marginBottom: isMobile 
        ? "clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 2.5vw, 20px)" 
          : "clamp(20px, 2vw, 24px)",
    },
    warningIcon: {
      width: isMobile 
        ? "clamp(28px, 7vw, 36px)" 
        : window.innerWidth < 1024 
          ? "clamp(36px, 6vw, 42px)" 
          : "clamp(42px, 5vw, 48px)",
      height: isMobile 
        ? "clamp(28px, 7vw, 36px)" 
        : window.innerWidth < 1024 
          ? "clamp(36px, 6vw, 42px)" 
          : "clamp(42px, 5vw, 48px)",
      display: "block",
      margin: isMobile 
        ? "0 auto clamp(8px, 2vw, 12px)" 
        : window.innerWidth < 1024 
          ? "0 auto clamp(10px, 1.5vw, 14px)" 
          : "0 auto clamp(12px, 1.2vw, 16px)",
    },
    title: {
      fontSize: isMobile 
        ? "clamp(14px, 4vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 3.5vw, 18px)" 
          : "clamp(18px, 3vw, 20px)",
      fontWeight: "600",
      color: lightMode ? "#121212" : "#ffffff",
      textAlign: "center",
      marginBottom: isMobile 
        ? "clamp(4px, 1vw, 6px)" 
        : window.innerWidth < 1024 
          ? "clamp(5px, 0.8vw, 7px)" 
          : "clamp(6px, 0.6vw, 8px)",
    },
    message: {
      fontSize: isMobile 
        ? "clamp(12px, 3vw, 13px)" 
        : window.innerWidth < 1024 
          ? "clamp(13px, 2.5vw, 14px)" 
          : "clamp(14px, 2vw, 15px)",
      color: lightMode ? "#666666" : "#aaaaaa",
      textAlign: "center",
      lineHeight: "1.5",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile 
        ? "clamp(8px, 2vw, 12px)" 
        : window.innerWidth < 1024 
          ? "clamp(10px, 1.5vw, 14px)" 
          : "clamp(12px, 1.2vw, 16px)",
      flexWrap: "wrap",
    },
    cancelButton: {
      padding: isMobile 
        ? "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(7px, 1.8vw, 9px) clamp(14px, 2.5vw, 20px)" 
          : "clamp(8px, 1.5vw, 10px) clamp(16px, 2vw, 24px)",
      borderRadius: isMobile 
        ? "clamp(3px, 1vw, 4px)" 
        : window.innerWidth < 1024 
          ? "clamp(4px, 0.8vw, 5px)" 
          : "clamp(5px, 0.6vw, 6px)",
      border: `1px solid ${lightMode ? "#E50914" : "#ff4757"}`,
      background: "transparent",
      color: lightMode ? "#E50914" : "#ff4757",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      minWidth: isMobile 
        ? "100px" 
        : window.innerWidth < 1024 
          ? "110px" 
          : "120px",
      ":hover": {
        background: lightMode
          ? "rgba(229, 9, 20, 0.08)"
          : "rgba(229, 9, 20, 0.15)",
      },
    },
    deleteButton: {
      padding: isMobile 
        ? "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)" 
        : window.innerWidth < 1024 
          ? "clamp(7px, 1.8vw, 9px) clamp(14px, 2.5vw, 20px)" 
          : "clamp(8px, 1.5vw, 10px) clamp(16px, 2vw, 24px)",
      borderRadius: isMobile 
        ? "clamp(3px, 1vw, 4px)" 
        : window.innerWidth < 1024 
          ? "clamp(4px, 0.8vw, 5px)" 
          : "clamp(5px, 0.6vw, 6px)",
      border: "none",
      background: "linear-gradient(135deg, #E50914, #B81D24)",
      color: "#ffffff",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(229, 9, 20, 0.3)",
      minWidth: isMobile 
        ? "100px" 
        : window.innerWidth < 1024 
          ? "110px" 
          : "120px",
      ":hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
      },
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContainer} ref={deleteModalRef}>
        <div style={styles.content}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E50914"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.warningIcon}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3 style={styles.title}>Delete Review?</h3>
          <p style={styles.message}>
            This action cannot be undone. Are you sure you want to permanently
            delete this review?
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={styles.cancelButton}
            onClick={() => setConfirmDeleteReview(false)}
          >
            Cancel
          </button>
          <button
            style={styles.deleteButton}
            onClick={() => {
              dispatch(
                deleteReview({ movieId: movieId, reviewId: reviewIdToSend })
              );
              setConfirmDeleteReview(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  reviewIdToSend: PropTypes.number.isRequired,
  setConfirmDeleteReview: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;