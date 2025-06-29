import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetails, setLoginWindow } from "../features/AuthSlice";

function Rating() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.movieDetails.movieId);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    if (currentUser?.ratings && movieId in currentUser.ratings) {
      setRating(currentUser.ratings[movieId]);
      setHasRated(true);
    } else {
      setRating(0);
      setHasRated(false);
    }
  }, [movieId, currentUser]);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      dispatch(setLoginWindow(true));
      return;
    }

    if (rating === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const updatedRatings = {
        ...currentUser.ratings,
        [movieId]: rating,
      };

      const response = await dispatch(
        saveUserDetails({
          id: currentUser._id,
          userData: {
            ratings: updatedRatings,
          },
        })
      );

      if (saveUserDetails.fulfilled.match(response)) {
        if (submitRef.current) {
          submitRef.current.textContent = "✓ Submitted";
          submitRef.current.style.backgroundColor = "#4CAF50";
          setTimeout(() => {
            if (submitRef.current) {
              submitRef.current.textContent = hasRated
                ? "Update Rating"
                : "Submit Rating";
              submitRef.current.style.backgroundColor = "#E50914";
            }
          }, 2000);
        }
        setHasRated(true);
      } else {
        throw new Error(response.payload?.error || "Failed to save rating");
      }
    } catch (error) {
      console.error("Failed to save rating:", error);
      alert("Failed to save rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateStarSizeAndGap = () => {
    const containerWidth =
      windowWidth * (isMobile ? 0.9 : isTablet ? 0.8 : 0.7);
    const maxStarSize = isTablet ? 32 : 36;
    const minStarSize = isTablet ? 20 : 24;
    const minGap = 1;

    const availableWidth = containerWidth - 9 * minGap;
    let starSize = Math.min(maxStarSize, availableWidth / 10);
    starSize = Math.max(minStarSize, starSize);

    let gap = minGap;
    if (starSize === minStarSize) {
      const remainingSpace = containerWidth - 10 * starSize;
      gap = Math.max(minGap, remainingSpace / 9);
    }

    return { starSize, gap };
  };

  const { starSize, gap } = calculateStarSizeAndGap();

  return (
    <div
      style={{
        margin: isMobile ? "-30px auto" : "-30px auto",
        padding: isTablet ? "18px 0" : "20px 0",
        backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
        borderRadius: "12px",
        width: isMobile ? "90%" : isTablet ? "85%" : "80%",
        maxWidth: isTablet ? "450px" : "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          textAlign: "center",
          color: lightMode ? "#555" : "#aaa",
          fontSize: isMobile
            ? windowWidth < 375
              ? "14px"
              : "16px"
            : isTablet
            ? "15px"
            : "16px",
          width: "100%",
          margin: "0 0 0px 0",
          padding: "0 15px",
          boxSizing: "border-box",
        }}
      >
        {hasRated
          ? `You rated this: ${rating}/10`
          : rating > 0
          ? `You're rating this: ${rating}/10`
          : "Select your rating"}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: `${gap}px`,
          margin: isTablet ? "12px 0" : "15px 0",
          width: "100%",
          padding: "0 15px",
          boxSizing: "border-box",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            style={{
              fontSize: `${starSize}px`,
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
              width: `${starSize}px`,
              textAlign: "center",
              lineHeight: `${starSize}px`,
              color:
                index < rating ? "#FFD700" : lightMode ? "#E0E0E0" : "#444",
              transform: index < rating ? "scale(1.1)" : "scale(1)",
            }}
            onClick={() => {
              if (!isLoggedIn) {
                dispatch(setLoginWindow(true));
                return;
              }
              setRating(index + 1);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFD700";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                index < rating ? "#FFD700" : lightMode ? "#E0E0E0" : "#444";
              e.currentTarget.style.transform =
                index < rating ? "scale(1.1)" : "scale(1)";
            }}
          >
            ★
          </span>
        ))}
      </div>

      <button
        style={{
          fontSize: isMobile
            ? windowWidth < 375
              ? "14px"
              : "16px"
            : isTablet
            ? "15px"
            : "16px",
          fontWeight: "500",
          background: rating === 0 ? "#666" : "#E50914",
          color: "white",
          borderRadius: "8px",
          padding: isTablet ? "8px 20px" : "10px 25px",
          border: "none",
          cursor: rating === 0 ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          letterSpacing: "0.5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          marginTop: isTablet ? "8px" : "10px",
          "&:hover": {
            transform: rating === 0 ? "none" : "translateY(-2px)",
            boxShadow:
              rating === 0
                ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                : "0 6px 12px rgba(0, 0, 0, 0.25)",
          },
        }}
        onClick={handleSubmit}
        ref={submitRef}
        disabled={rating === 0}
      >
        {hasRated ? "Update Rating" : "Submit Rating"}
      </button>
    </div>
  );
}

export default Rating;
