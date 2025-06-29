import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  fetchReviews,
  createReview,
  updateReviewText,
  toggleReviewReaction,
  deleteReview,
  selectReviewsByMovieId,
  // selectReviewStatus,
  // selectReviewError,
} from "../features/ReviewSlice";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useMediaQuery } from "react-responsive";
import { setLoginWindow } from "../features/AuthSlice";

function ReviewSection() {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const movieId = useSelector((state) => state.movieDetails.movieId);
  const [confirmDeleteReview, setConfirmDeleteReview] = useState(false);
  const [review, setReview] = useState("");
  const [reviewIdToSend, setReviewIdToSend] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [editedReviewId, setEditedReviewId] = useState(null);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Get reviews from Redux store
  const reviews = useSelector((state) =>
    selectReviewsByMovieId(state, movieId)
  );
  // const status = useSelector(selectReviewStatus);
  // const error = useSelector(selectReviewError);

  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallTablet = useMediaQuery({ minWidth: 768, maxWidth: 833 });
  const isMediumTablet = useMediaQuery({ minWidth: 834, maxWidth: 899 });
  const isLargeTablet = useMediaQuery({ minWidth: 900, maxWidth: 1030 });
  const is1023 = useMediaQuery({ query: "(width: 1023px)" });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const containerWidth = isMobile
    ? "100%"
    : isSmallTablet
    ? "58vw"
    : isMediumTablet
    ? "62vw"
    : isLargeTablet || is1023
    ? "60vw"
    : "60vw";

  const marginLeftValue = isMobile
    ? "0"
    : isSmallTablet
    ? "-50px"
    : isMediumTablet
    ? "-55px"
    : isLargeTablet || is1023
    ? "-65px"
    : "0";

  const avatarSize = isMobile ? 32 : isTablet ? 35.7 : 42;
  const contentFontSize = isMobile ? "14px" : isTablet ? "12.75px" : "15px";
  const sectionPadding = isMobile ? "8px 16px" : isTablet ? "21.25px" : "25px";
  const elementGap = isMobile ? "12px" : isTablet ? "12.75px" : "15px";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch reviews when movieId changes
  useEffect(() => {
    if (movieId) {
      dispatch(fetchReviews(movieId));
    }
  }, [movieId, dispatch]);

  function handlePublishReview() {
    if (!review.trim() || !currentUser) return;

    const reviewData = {
      movieId,
      review,
      userId: currentUser._id,
      name: currentUser.name,
    };

    dispatch(createReview(reviewData));
    setReview("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  const handleEditSubmit = (reviewId) => {
    if (!editedReview.trim()) return;

    dispatch(
      updateReviewText({
        reviewId,
        newReview: editedReview,
      })
    );

    setEditedReviewId(null);
    setEditedReview("");
  };

  const handleToggleReaction = (reviewId, action) => {
    if (!isLoggedIn) {
      dispatch(setLoginWindow(true));
      return;
    }

    dispatch(
      toggleReviewReaction({
        reviewId,
        action,
        userId: currentUser._id,
      })
    );
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setConfirmDeleteReview(false);
  };

  const getTitleStyles = () => {
    if (windowWidth < 768) {
      return {
        fontSize: "28px",
        marginLeft: "15px",
      };
    } else if (windowWidth < 1024) {
      return {
        fontSize: "35.7px",
        marginLeft: "17px",
      };
    } else {
      return {
        fontSize: "42px",
        marginLeft: "20px",
      };
    }
  };

  const getUnderlineStyles = () => {
    if (isMobile) return { top: "40px", width: "50px" };
    if (isTablet) return { top: "45px", width: "55px" };
    return { top: "55px", width: "65px" };
  };

  const getContainerStyles = () => {
    if (isMobile) return { padding: "15px 8px" };
    if (isTablet) return { padding: "18px 12px" };
    return { padding: "10px 0px" };
  };

  if (isMobile) {
    return (
      <div
        style={{
          backgroundColor: lightMode ? "#f0f4ff" : "rgba(35,42,53,0.8)",
          width: "100%",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            ...getContainerStyles(),
            backgroundColor: "transparent",
            marginBottom: isMobile ? "0px" : "30px",
            position: "relative",
            overflow: "visible",
          }}
        >
          <div
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 1,
              marginLeft: "3.7%",
            }}
          >
            <h2
              style={{
                ...getTitleStyles(),
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.5px",
                color: lightMode ? "#1a365d" : "#f6ad55",
                margin: "0",
                padding: "0",
                position: "relative",
                display: "inline-block",
              }}
            >
              Review Section
              <span
                style={{
                  position: "absolute",
                  ...getUnderlineStyles(),
                  left: "0",
                  height: "4px",
                  backgroundColor: lightMode ? "#3b82f6" : "orange",
                  borderRadius: "2px",
                }}
              />
            </h2>
          </div>
        </div>

        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${
              lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
            }`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <img
              src={`https://dummyimage.com/150x150/000/fff.png&text=${currentUser?.name.slice(
                0,
                1
              )}`}
              alt="User"
              style={{
                width: `${avatarSize}px`,
                height: `${avatarSize}px`,
                borderRadius: "50%",
                marginRight: "12px",
                objectFit: "cover",
                border: `1.5px solid white`,
              }}
            />
            <textarea
              ref={textareaRef}
              placeholder="Share your thoughts about this movie..."
              style={{
                flex: 1,
                minHeight: "20px",
                maxHeight: "31px",
                border: "none",
                backgroundColor: "transparent",
                fontSize: contentFontSize,
                lineHeight: "1.4",
                outline: "none",
                color: lightMode ? "#121212" : "#fff",
                padding: "8px 0",
                resize: "none",
                fontFamily: "inherit",
                overflowY: "hidden",
                borderBottom:
                  isTextAreaFocused || review.length > 0
                    ? `1px solid ${lightMode ? "black" : "white"}`
                    : undefined,
              }}
              onFocus={() => setIsTextAreaFocused(true)}
              onBlur={() => setIsTextAreaFocused(false)}
              onChange={(e) => {
                setReview(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              value={review}
              rows="1"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "18px",
                border: "none",
                background: "transparent",
                color: lightMode ? "#606060" : "#aaa",
                fontWeight: "500",
                fontSize: contentFontSize,
              }}
              onClick={() => setReview("")}
              disabled={!review.trim()}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "18px",
                border: "none",
                background: review.trim()
                  ? lightMode
                    ? "#E50914"
                    : "#ff4757"
                  : lightMode
                  ? "#cccccc"
                  : "#555555",
                color: "white",
                fontWeight: "500",
                fontSize: contentFontSize,
              }}
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginWindow(true));
                  return;
                }
                handlePublishReview();
              }}
              disabled={!review.trim()}
            >
              Comment
            </button>
          </div>
        </div>

        {reviews && Object.keys(reviews).length > 0 && (
          <div style={{ padding: "0 16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "16px 0",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: lightMode ? "#606060" : "#aaa",
                }}
              >
                {Object.keys(reviews).length} comments
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {Object.entries(reviews).map(([reviewId, element]) => (
                <div
                  key={reviewId}
                  style={{
                    display: "flex",
                    gap: elementGap,
                  }}
                >
                  <img
                    src={`https://dummyimage.com/150x150/000/fff.png&text=${element?.name
                      .trim()
                      .slice(0, 1)}`}
                    alt="User"
                    style={{
                      width: `${avatarSize}px`,
                      height: `${avatarSize}px`,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `1.5px solid white`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: contentFontSize,
                            fontWeight: "500",
                            color: lightMode ? "#121212" : "#fff",
                          }}
                        >
                          {element.name}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: lightMode ? "#909090" : "#aaa",
                          }}
                        >
                          {new Date(element.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {editedReviewId !== reviewId ? (
                        <p
                          style={{
                            fontSize: contentFontSize,
                            color: lightMode ? "#121212" : "#fff",
                            margin: "4px 0",
                            lineHeight: "1.4",
                            wordBreak: "break-word",
                          }}
                        >
                          {element.review}
                        </p>
                      ) : (
                        <>
                          <textarea
                            value={editedReview}
                            onChange={(e) => {
                              setEditedReview(e.target.value);
                              e.target.style.height = "auto";
                              e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            style={{
                              flex: 1,
                              minHeight: "20px",
                              maxHeight: "120px",
                              border: "none",
                              borderBottom: `1px solid ${
                                lightMode ? "black" : "white"
                              }`,
                              fontSize: contentFontSize,
                              lineHeight: "1.4",
                              outline: "none",
                              backgroundColor: "transparent",
                              color: lightMode ? "#121212" : "#fff",
                              padding: "4px 0",
                              resize: "none",
                              fontFamily: "inherit",
                              overflowY: "hidden",
                              width: "100%",
                              margin: "4px 0 8px",
                            }}
                            rows="1"
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "8px",
                              marginTop: "4px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setEditedReviewId(null);
                                setEditedReview("");
                              }}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "18px",
                                border: "none",
                                background: "transparent",
                                color: lightMode ? "#606060" : "#aaa",
                                fontWeight: "500",
                                fontSize: "13px",
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditSubmit(reviewId)}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "18px",
                                border: "none",
                                background: "#E50914",
                                color: "white",
                                fontWeight: "500",
                                fontSize: "13px",
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {editedReviewId !== reviewId && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          marginTop: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleToggleReaction(reviewId, "like")}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "transparent",
                            border: "none",
                            padding: "0",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 0 24 24"
                            width="20"
                            fill={
                              element.likedBy.includes(currentUser?._id)
                                ? "#E50914"
                                : lightMode
                                ? "#606060"
                                : "#aaa"
                            }
                          >
                            <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" />
                          </svg>
                          <span
                            style={{
                              fontSize: "13px",
                              color: element.likedBy.includes(currentUser?._id)
                                ? "#E50914"
                                : lightMode
                                ? "#606060"
                                : "#aaa",
                            }}
                          >
                            {element.likedBy.length}
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            handleToggleReaction(reviewId, "dislike")
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "transparent",
                            border: "none",
                            padding: "0",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 0 24 24"
                            width="20"
                            fill={
                              element.dislikedBy.includes(currentUser?._id)
                                ? "#E50914"
                                : lightMode
                                ? "#606060"
                                : "#aaa"
                            }
                            style={{ transform: "rotate(180deg)" }}
                          >
                            <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" />
                          </svg>
                          <span
                            style={{
                              fontSize: "13px",
                              color: element.dislikedBy.includes(
                                currentUser?._id
                              )
                                ? "#E50914"
                                : lightMode
                                ? "#606060"
                                : "#aaa",
                            }}
                          >
                            {element.dislikedBy.length}
                          </span>
                        </button>

                        {currentUser?._id === element.userId && (
                          <div style={{ marginLeft: "auto" }}>
                            <button
                              onClick={() => {
                                setEditedReview(element.review);
                                setEditedReviewId(reviewId);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                padding: "0",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={lightMode ? "#606060" : "#aaa"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setConfirmDeleteReview(true);
                                setReviewIdToSend(reviewId);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                padding: "0 0 0 8px",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={lightMode ? "#606060" : "#aaa"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {confirmDeleteReview && (
          <DeleteConfirmationModal
            reviewIdToSend={reviewIdToSend}
            setConfirmDeleteReview={setConfirmDeleteReview}
            onConfirm={handleDeleteReview}
          />
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: lightMode ? "#f0f4ff" : "rgba(35,42,53,0.8)",
        minHeight: "100vh",
        width: containerWidth,
        padding: isMobile ? "0" : "5px 0",
        overflowX: isMobile ? undefined : "hidden",
        marginLeft: marginLeftValue,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          ...getContainerStyles(),
          backgroundColor: "transparent",
          marginBottom: isMobile ? "30px" : isTablet ? "25px" : "30px",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            zIndex: 1,
            marginLeft: isMobile ? "3.7%" : "4%",
          }}
        >
          <h2
            style={{
              ...getTitleStyles(),
              fontWeight: "700",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.5px",
              color: lightMode ? "#1a365d" : "#f6ad55",
              margin: "0",
              padding: "0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Review Section
            <span
              style={{
                position: "absolute",
                ...getUnderlineStyles(),
                left: "0",
                height: "4px",
                backgroundColor: lightMode ? "#3b82f6" : "orange",
                borderRadius: "2px",
              }}
            />
          </h2>
        </div>
      </div>

      <div
        style={{
          maxWidth: isMobile ? "100%" : isTablet ? "595px" : "700px",
          margin: isMobile ? "0" : isTablet ? "0 0 25.5px" : "0 auto 30px",
          marginLeft: isMobile ? "0" : isTablet ? "17px" : "20px",
          color: lightMode ? "#000" : "#fff",
          padding: sectionPadding,
          background: lightMode ? "white" : "#2D3748",
          borderRadius: isTablet ? "10.2px" : "12px",
          boxShadow: lightMode
            ? "0 10px 30px rgba(0, 0, 0, 0.1)"
            : "0 10px 25px rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            marginBottom: isMobile ? "12px" : isTablet ? "12.75px" : "15px",
          }}
        >
          <img
            src={`https://dummyimage.com/150x150/000/fff.png&text=${currentUser?.name.slice(
              0,
              1
            )}`}
            alt="User"
            style={{
              width: `${avatarSize}px`,
              height: `${avatarSize}px`,
              borderRadius: "50%",
              marginRight: elementGap,
              objectFit: "cover",
              border: isTablet ? "1.275px solid white" : "1.5px solid white",
            }}
          />
          <textarea
            id="review"
            name="review"
            placeholder="Share your thoughts about this movie..."
            ref={textareaRef}
            style={{
              flex: 1,
              minHeight: isTablet ? "20.4px" : "24px",
              maxHeight: isTablet ? "170px" : "200px",
              border: "none",
              borderBottom: isTablet
                ? "1.7px solid #ff007f"
                : "2px solid #ff007f",
              fontSize: contentFontSize,
              lineHeight: isTablet ? "1.275" : "1.5",
              outline: "none",
              backgroundColor: "transparent",
              color: lightMode ? "#121212" : "#fff",
              padding: isTablet ? "6.8px 8.5px" : "8px 10px",
              transition: "all 0.3s ease",
              resize: "none",
              fontFamily: "inherit",
              overflowY: "hidden",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
            onChange={(e) => {
              setReview(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            value={review}
            rows="1"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: elementGap,
          }}
        >
          <button
            style={{
              padding: isMobile
                ? "8px 16px"
                : isTablet
                ? "8.5px 17px"
                : "10px 20px",
              borderRadius: isTablet ? "6.8px" : "8px",
              border: isTablet ? "1.275px solid white" : "1.5px solid white",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: lightMode ? "#E50914" : "#ff007f",
              fontWeight: "600",
              transition: "all 0.3s ease",
              opacity: review.trim() ? 1 : 0.6,
              fontSize: contentFontSize,
            }}
            disabled={!review.trim()}
            onClick={() => setReview("")}
          >
            Cancel
          </button>
          <button
            style={{
              padding: isMobile
                ? "8px 16px"
                : isTablet
                ? "8.5px 21.25px"
                : "10px 25px",
              borderRadius: isTablet ? "6.8px" : "8px",
              border: "none",
              background: "linear-gradient(135deg, #E50914, #B81D24)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: isTablet
                ? "0 3.4px 12.75px rgba(229, 9, 20, 0.3)"
                : "0 4px 15px rgba(229, 9, 20, 0.3)",
              opacity: review.trim() ? 1 : 0.6,
              fontSize: contentFontSize,
            }}
            onClick={() => {
              if (!isLoggedIn) {
                dispatch(setLoginWindow(true));
                return;
              }
              handlePublishReview();
            }}
            disabled={!review.trim()}
          >
            {isMobile ? "Publish" : "Publish Review"}
          </button>
        </div>
      </div>

      {reviews && Object.keys(reviews).length > 0 && (
        <div
          style={{
            maxWidth: isMobile ? "100%" : isTablet ? "595px" : "700px",
            margin: isMobile ? "0" : isTablet ? "0 0 17px" : "0 auto",
            marginLeft: isMobile ? "0" : isTablet ? "17px" : "20px",
            color: lightMode ? "#121212" : "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: isMobile ? "16px" : isTablet ? "17px" : "20px",
              paddingLeft: isMobile ? "16px" : isTablet ? "0" : "0",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "16px" : isTablet ? "18.7px" : "22px",
                fontWeight: "600",
                margin: "0",
                color: lightMode ? "#121212" : "#fff",
              }}
            >
              {Object.keys(reviews).length}{" "}
              {Object.keys(reviews).length === 1 ? "Review" : "Reviews"}
            </h2>
            <div
              style={{
                height: isTablet ? "1.275px" : "1.5px",
                flex: 1,
                background: `linear-gradient(90deg, ${
                  lightMode ? "#E50914" : "#ff007f"
                }, transparent)`,
                marginLeft: isMobile ? "8px" : isTablet ? "12.75px" : "15px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : isTablet ? "2.55px" : "3px",
            }}
          >
            {Object.entries(reviews).map(([reviewId, element]) => (
              <div
                key={reviewId}
                style={{
                  display: "flex",
                  gap: elementGap,
                  padding: isMobile
                    ? "0 16px 16px"
                    : isTablet
                    ? "13.6px"
                    : "16px",
                  background: lightMode ? "rgba(255,255,255,0.9)" : "#2D3748",
                  borderRadius: isTablet ? "6.8px" : "8px",
                  boxShadow: lightMode
                    ? "0 4px 12px rgba(0,0,0,0.08)"
                    : "0 4px 12px rgba(255, 255, 255, 0.03)",
                  transition: "all 0.2s ease",
                }}
              >
                <img
                  src={`https://dummyimage.com/150x150/000/fff.png&text=${element.name
                    .trim()
                    .slice(0, 1)}`}
                  alt="User"
                  style={{
                    width: `${avatarSize}px`,
                    height: `${avatarSize}px`,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: isTablet
                      ? "1.275px solid white"
                      : "1.5px solid white",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {editedReviewId !== reviewId ? (
                      <>
                        <div
                          style={{
                            fontSize: contentFontSize,
                            fontWeight: "600",
                            color: lightMode ? "#E50914" : "#ff007f",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginRight: isMobile
                              ? "8px"
                              : isTablet
                              ? "8.5px"
                              : "10px",
                          }}
                        >
                          {element.name}
                        </div>
                        <div
                          style={{
                            fontSize: isMobile
                              ? "12px"
                              : isTablet
                              ? "10.625px"
                              : "12.5px",
                            opacity: "0.7",
                            color: lightMode ? "#666" : "#aaa",
                          }}
                        >
                          {new Date(element.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </div>
                        {currentUser?._id === element.userId && (
                          <div
                            style={{
                              marginLeft: "auto",
                              display: "flex",
                              gap: isMobile
                                ? "8px"
                                : isTablet
                                ? "6.8px"
                                : "8px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setEditedReview(element.review);
                                setEditedReviewId(reviewId);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                padding: isTablet ? "3.4px" : "4px",
                                cursor: "pointer",
                                borderRadius: isTablet ? "3.4px" : "4px",
                                transition: "all 0.2s ease",
                                ":hover": {
                                  background: lightMode
                                    ? "rgba(0,0,0,0.05)"
                                    : "rgba(255,255,255,0.1)",
                                },
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={
                                  isMobile ? "18" : isTablet ? "15.3" : "18"
                                }
                                height={
                                  isMobile ? "18" : isTablet ? "15.3" : "18"
                                }
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={lightMode ? "#666" : "#aaa"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setConfirmDeleteReview(true);
                                setReviewIdToSend(reviewId);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                padding: isTablet ? "3.4px" : "4px",
                                cursor: "pointer",
                                borderRadius: isTablet ? "3.4px" : "4px",
                                transition: "all 0.2s ease",
                                ":hover": {
                                  background: lightMode
                                    ? "rgba(229, 9, 20, 0.1)"
                                    : "rgba(229, 9, 20, 0.2)",
                                },
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={
                                  isMobile ? "18" : isTablet ? "15.3" : "18"
                                }
                                height={
                                  isMobile ? "18" : isTablet ? "15.3" : "18"
                                }
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={lightMode ? "#666" : "#aaa"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            fontSize: contentFontSize,
                            fontWeight: "600",
                            color: lightMode ? "#E50914" : "#ff007f",
                          }}
                        >
                          {element.name}
                        </div>
                      </div>
                    )}
                  </div>

                  {editedReviewId !== reviewId ? (
                    <div
                      style={{
                        fontSize: contentFontSize,
                        lineHeight: isTablet ? "1.275" : "1.5",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                    >
                      {element.review}
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={editedReview}
                        onChange={(e) => {
                          setEditedReview(e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        style={{
                          flex: 1,
                          minHeight: isTablet ? "20.4px" : "24px",
                          maxHeight: isTablet ? "170px" : "200px",
                          border: "none",
                          borderBottom: isTablet
                            ? "1.7px solid #ff007f"
                            : "2px solid #ff007f",
                          fontSize: contentFontSize,
                          lineHeight: isTablet ? "1.275" : "1.5",
                          outline: "none",
                          backgroundColor: "transparent",
                          color: lightMode ? "#121212" : "#fff",
                          padding: isTablet ? "6.8px 8.5px" : "8px 10px",
                          transition: "all 0.3s ease",
                          resize: "none",
                          fontFamily: "inherit",
                          overflowY: "hidden",
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          width: "100%",
                          marginBottom: isMobile
                            ? "8px"
                            : isTablet
                            ? "10.2px"
                            : "12px",
                        }}
                        rows="1"
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: isMobile ? "8px" : isTablet ? "10.2px" : "12px",
                        }}
                      >
                        <button
                          onClick={() => {
                            setEditedReviewId(null);
                            setEditedReview("");
                          }}
                          style={{
                            padding: isMobile
                              ? "6px 12px"
                              : isTablet
                              ? "6.8px 13.6px"
                              : "8px 16px",
                            borderRadius: isTablet ? "5.1px" : "6px",
                            border: isTablet
                              ? "0.85px solid #ff4757"
                              : "1px solid #ff4757",
                            background: "transparent",
                            color: lightMode ? "#E50914" : "#ff4757",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            ":hover": {
                              background: lightMode
                                ? "rgba(229, 9, 20, 0.08)"
                                : "rgba(229, 9, 20, 0.15)",
                            },
                            fontSize: isMobile
                              ? "13px"
                              : isTablet
                              ? "11.05px"
                              : "inherit",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            handleEditSubmit(reviewId);
                          }}
                          style={{
                            padding: isMobile
                              ? "6px 12px"
                              : isTablet
                              ? "6.8px 13.6px"
                              : "8px 16px",
                            borderRadius: isTablet ? "5.1px" : "6px",
                            border: "none",
                            background:
                              "linear-gradient(135deg, #E50914, #B81D24)",
                            color: "white",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: isTablet
                              ? "0 1.7px 6.8px rgba(229, 9, 20, 0.3)"
                              : "0 2px 8px rgba(229, 9, 20, 0.3)",
                            ":hover": {
                              transform: "translateY(-1px)",
                              boxShadow: isTablet
                                ? "0 3.4px 10.2px rgba(229, 9, 20, 0.4)"
                                : "0 4px 12px rgba(229, 9, 20, 0.4)",
                            },
                            fontSize: isMobile
                              ? "13px"
                              : isTablet
                              ? "11.05px"
                              : "inherit",
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  )}

                  {editedReviewId !== reviewId && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "16px" : isTablet ? "13.6px" : "16px",
                        marginTop: isMobile
                          ? "8px"
                          : isTablet
                          ? "4.25px"
                          : "5px",
                      }}
                    >
                      <button
                        onClick={() => handleToggleReaction(reviewId, "like")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "4px" : isTablet ? "5.1px" : "6px",
                          background: element.likedBy.includes(currentUser?._id)
                            ? lightMode
                              ? "rgba(229, 9, 20, 0.1)"
                              : "rgba(229, 9, 20, 0.2)"
                            : "transparent",
                          border: isTablet
                            ? `0.85px solid ${
                                element.likedBy.includes(currentUser?._id)
                                  ? "#ff4757"
                                  : "rgba(255,255,255,0.08)"
                              }`
                            : `1px solid ${
                                element.likedBy.includes(currentUser?._id)
                                  ? "#ff4757"
                                  : "rgba(255,255,255,0.08)"
                              }`,
                          borderRadius: isTablet ? "15.3px" : "18px",
                          padding: isMobile
                            ? "0"
                            : isTablet
                            ? "1.7px 10.2px 1.7px 5.1px"
                            : "2px 12px 2px 6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: element.likedBy.includes(currentUser?._id)
                            ? lightMode
                              ? "0 1px 3px rgba(229, 9, 20, 0.2)"
                              : "0 1px 6px rgba(229, 9, 20, 0.3)"
                            : "none",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={isMobile ? "20" : isTablet ? "17" : "20"}
                          viewBox="0 0 24 24"
                          width={isMobile ? "20" : isTablet ? "17" : "20"}
                          fill={
                            element.likedBy.includes(currentUser?._id)
                              ? lightMode
                                ? "#E50914"
                                : "#ff4757"
                              : lightMode
                              ? "#606060"
                              : "#9e9e9e"
                          }
                        >
                          <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" />
                        </svg>
                        <span
                          style={{
                            fontSize: isMobile
                              ? "13px"
                              : isTablet
                              ? "11.05px"
                              : "13px",
                            fontWeight: "500",
                            color: element.likedBy.includes(currentUser?._id)
                              ? lightMode
                                ? "#E50914"
                                : "#ff4757"
                              : lightMode
                              ? "#606060"
                              : "#9e9e9e",
                          }}
                        >
                          {element.likedBy.length}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handleToggleReaction(reviewId, "dislike")
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "4px" : isTablet ? "5.1px" : "6px",
                          background: element.dislikedBy.includes(
                            currentUser?._id
                          )
                            ? lightMode
                              ? "rgba(229, 9, 20, 0.1)"
                              : "rgba(229, 9, 20, 0.2)"
                            : "transparent",
                          border: isTablet
                            ? `0.85px solid ${
                                element.dislikedBy.includes(currentUser?._id)
                                  ? "#ff4757"
                                  : "rgba(255,255,255,0.08)"
                              }`
                            : `1px solid ${
                                element.dislikedBy.includes(currentUser?._id)
                                  ? "#ff4757"
                                  : "rgba(255,255,255,0.08)"
                              }`,
                          borderRadius: isTablet ? "15.3px" : "18px",
                          padding: isMobile
                            ? "0"
                            : isTablet
                            ? "1.7px 10.2px 1.7px 5.1px"
                            : "2px 12px 2px 6px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: element.dislikedBy.includes(
                            currentUser?._id
                          )
                            ? lightMode
                              ? "0 1px 3px rgba(229, 9, 20, 0.2)"
                              : "0 1px 6px rgba(229, 9, 20, 0.3)"
                            : "none",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={isMobile ? "20" : isTablet ? "17" : "20"}
                          viewBox="0 0 24 24"
                          width={isMobile ? "20" : isTablet ? "17" : "20"}
                          fill={
                            element.dislikedBy.includes(currentUser?._id)
                              ? lightMode
                                ? "#E50914"
                                : "#ff4757"
                              : lightMode
                              ? "#606060"
                              : "#9e9e9e"
                          }
                          style={{ transform: "rotate(180deg)" }}
                        >
                          <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" />
                        </svg>
                        <span
                          style={{
                            fontSize: isMobile
                              ? "13px"
                              : isTablet
                              ? "11.05px"
                              : "13px",
                            fontWeight: "500",
                            color: element.dislikedBy.includes(currentUser?._id)
                              ? lightMode
                                ? "#E50914"
                                : "#ff4757"
                              : lightMode
                              ? "#606060"
                              : "#9e9e9e",
                          }}
                        >
                          {element.dislikedBy.length}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {confirmDeleteReview && (
        <DeleteConfirmationModal
          reviewIdToSend={reviewIdToSend}
          setConfirmDeleteReview={setConfirmDeleteReview}
          onConfirm={handleDeleteReview}
        />
      )}
    </div>
  );
}

export default ReviewSection;
