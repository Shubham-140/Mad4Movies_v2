import { useEffect, useState } from "react";
import {
  setGenre,
  setRuntime1,
  setRuntime2,
  setRating1,
  setRating2,
  setYear1,
  setYear2,
  applySort,
  setShowMovie,
} from "../features/MovieDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export default function Filters() {
  const dispatch = useDispatch();
  const lightMode = useSelector((state) => state.color.isDarkMode ?? false);
  const showGenre = useSelector((state) => state.movieDetails.showGenre ?? false);
  const selectedGenre = useSelector(
    (state) => state.movieDetails.selectedGenre ?? []
  );
  const runtime = useSelector((state) => state.movieDetails.runtime);
  const rating = useSelector((state) => state.movieDetails.rating);
  const selectedYear = useSelector((state) => state.movieDetails.selectedYear);
  const sortBy = useSelector((state) => state.movieDetails.sort ?? "");
  const showMovie = useSelector(
    (state) => state.movieDetails.showMovie ?? "Everything"
  );
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallMobile = useMediaQuery({ maxWidth: 374 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const [mobileFilterContainer, setMobileFilterContainer] = useState(false);

  const [draftRuntime1, setDraftRuntime1] = useState(runtime[0] ?? "");
  const [draftRuntime2, setDraftRuntime2] = useState(runtime[1] ?? "");
  const [draftRating1, setDraftRating1] = useState(rating[0] ?? "");
  const [draftRating2, setDraftRating2] = useState(rating[1] ?? "");
  const [draftYear1, setDraftYear1] = useState(selectedYear[0] ?? "");
  const [draftYear2, setDraftYear2] = useState(selectedYear[1] ?? "");

  useEffect(() => {
    setDraftRuntime1(runtime[0] ?? "");
    setDraftRuntime2(runtime[1] ?? "");
    setDraftRating1(rating[0] ?? "");
    setDraftRating2(rating[1] ?? "");
    setDraftYear1(selectedYear[0] ?? "");
    setDraftYear2(selectedYear[1] ?? "");
  }, [runtime, rating, selectedYear]);

  function handleSortBy(e) {
    dispatch(applySort(e.target.value));
  }

  function handleSelectGenre(genre) {
    const next = selectedGenre.includes(genre)
      ? selectedGenre.filter((elem) => elem !== genre)
      : [...selectedGenre, genre];
    dispatch(setGenre(next));
  }

  function clampRating(value) {
    if (value === "") return value;
    let num = Number(value);
    if (num < 0) num = 0;
    else if (num > 10) num = 10;
    return String(num);
  }

  function commitRuntime1() {
    dispatch(setRuntime1(draftRuntime1));
  }

  function commitRuntime2() {
    dispatch(setRuntime2(draftRuntime2));
  }

  function commitRating1() {
    dispatch(setRating1(draftRating1));
  }

  function commitRating2() {
    dispatch(setRating2(draftRating2));
  }

  function commitYear1() {
    dispatch(setYear1(draftYear1));
  }

  function commitYear2() {
    dispatch(setYear2(draftYear2));
  }

  const getMobileStyles = () => {
    if (!isMobile) return {};

    return {
      container: {
        padding: isSmallMobile ? "15px" : "20px",
        width: isSmallMobile ? "90%" : "85%",
      },
      sectionTitle: {
        fontSize: isSmallMobile ? "0.9rem" : "1rem",
      },
      select: {
        padding: isSmallMobile ? "10px" : "12px",
        fontSize: isSmallMobile ? "0.9rem" : "0.95rem",
      },
      input: {
        padding: isSmallMobile ? "10px" : "12px",
        fontSize: isSmallMobile ? "0.9rem" : "0.95rem",
      },
      genreTag: {
        padding: isSmallMobile ? "6px 12px" : "8px 14px",
        fontSize: isSmallMobile ? "0.8rem" : "0.85rem",
      },
      button: {
        padding: isSmallMobile ? "12px" : "14px",
        fontSize: isSmallMobile ? "0.95rem" : "1rem",
      },
      filterButton: {
        width: isSmallMobile ? "28px" : "30px",
        height: isSmallMobile ? "28px" : "30px",
      },
    };
  };

  const mobileStyles = getMobileStyles();

  const getContainerStyle = () => {
    const baseStyle = {
      backgroundColor: lightMode ? "#ffffff" : "#1a202c",
      color: lightMode ? "#2d3748" : "#f7fafc",
      borderRadius: "12px",
      boxShadow: lightMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      border: lightMode
        ? "1px solid rgba(226, 232, 240, 0.8)"
        : "1px solid rgba(74, 85, 104, 0.5)",
    };

    if (isMobile) {
      return {
        ...baseStyle,
        padding: isSmallMobile ? "15px" : "20px",
        width: isSmallMobile ? "90%" : "85%",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxHeight: "90vh",
        overflowY: "auto",
        zIndex: 1000,
      };
    }

    return {
      ...baseStyle,
      width: "300px",
      padding: isTablet ? "clamp(15px, 2vw, 20px)" : "clamp(20px, 1.5vw, 25px)",
      position: "sticky",
    };
  };

  const getGenreTagStyle = (genre) => {
    if (isMobile) return { ...genreTagStyle(genre), ...mobileStyles.genreTag };
    return {
      padding: isTablet ? "clamp(5px, 1vw, 7px) clamp(9px, 1.4vw, 11px)" : "clamp(6px, 0.8vw, 8px) clamp(12px, 1.3vw, 14px)",
      borderRadius: "20px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: selectedGenre.includes(genre)
        ? lightMode
          ? "#ebf8ff"
          : "#2b6cb0"
        : lightMode
        ? "#edf2f7"
        : "#2d3748",
      color: selectedGenre.includes(genre)
        ? lightMode
          ? "#3182ce"
          : "#ffffff"
        : lightMode
        ? "#4a5568"
        : "#a0aec0",
      border: selectedGenre.includes(genre)
        ? lightMode
          ? "1px solid #bee3f8"
          : "1px solid #4299e1"
        : lightMode
        ? "1px solid #e2e8f0"
        : "1px solid #4a5568",
      fontSize: isTablet ? "clamp(0.7rem, 1vw, 0.75rem)" : "clamp(0.75rem, 0.8vw, 0.85rem)",
      fontWeight: "500",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: lightMode
          ? "0 2px 5px rgba(0, 0, 0, 0.1)"
          : "0 2px 5px rgba(0, 0, 0, 0.3)",
      },
    };
  };

  const sectionTitleStyle = {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: lightMode ? "#4a5568" : "#a0aec0",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: lightMode ? "1px solid #e2e8f0" : "1px solid #2d3748",
    backgroundColor: lightMode ? "#f7fafc" : "#2d3748",
    color: lightMode ? "#2d3748" : "#f7fafc",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
    marginBottom: "30px",
    ":focus": {
      borderColor: lightMode ? "#4299e1" : "#63b3ed",
      boxShadow: lightMode
        ? "0 0 0 3px rgba(66, 153, 225, 0.2)"
        : "0 0 0 3px rgba(99, 179, 237, 0.2)",
    },
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: lightMode ? "1px solid #e2e8f0" : "1px solid #2d3748",
    backgroundColor: lightMode ? "#f7fafc" : "#2d3748",
    color: lightMode ? "#2d3748" : "#f7fafc",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
    ":focus": {
      borderColor: lightMode ? "#4299e1" : "#63b3ed",
      boxShadow: lightMode
        ? "0 0 0 3px rgba(66, 153, 225, 0.2)"
        : "0 0 0 3px rgba(99, 179, 237, 0.2)",
    },
  };

  const genreTagStyle = (genre) => ({
    padding: "8px 14px",
    borderRadius: "20px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: selectedGenre.includes(genre)
      ? lightMode
        ? "#ebf8ff"
        : "#2b6cb0"
      : lightMode
      ? "#edf2f7"
      : "#2d3748",
    color: selectedGenre.includes(genre)
      ? lightMode
        ? "#3182ce"
        : "#ffffff"
      : lightMode
      ? "#4a5568"
      : "#a0aec0",
    border: selectedGenre.includes(genre)
      ? lightMode
        ? "1px solid #bee3f8"
        : "1px solid #4299e1"
      : lightMode
      ? "1px solid #e2e8f0"
      : "1px solid #4a5568",
    fontSize: "0.85rem",
    fontWeight: "500",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: lightMode
        ? "0 2px 5px rgba(0, 0, 0, 0.1)"
        : "0 2px 5px rgba(0, 0, 0, 0.3)",
    },
  });

  const containerStyle = getContainerStyle();

  return (
    <div>
      {isMobile && !mobileFilterContainer && (
        <div
          style={{
            position: "absolute",
            right: isSmallMobile ? "15px" : "30px",
            top: isSmallMobile ? "15px" : "20px",
            zIndex: 10,
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMobileFilterContainer(true)}
          >
            <svg
              width={mobileStyles.filterButton?.width || (isTablet ? "28px" : "30px")}
              height={mobileStyles.filterButton?.height || (isTablet ? "28px" : "30px")}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20V6.172L14.586 11.586C14.2109 11.9611 14.0001 12.4697 14 13V20L10 18V13C9.99994 12.4697 9.78914 11.9611 9.414 11.586L4 6.172V4Z"
                stroke={lightMode ? "#4A5568" : "#E2E8F0"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {lightMode ? (
                <path
                  d="M4 4H20V6.172L14.586 11.586C14.2109 11.9611 14.0001 12.4697 14 13V20L10 18V13C9.99994 12.4697 9.78914 11.9611 9.414 11.586L4 6.172V4Z"
                  fill="#EDF2F7"
                />
              ) : (
                <path
                  d="M4 4H20V6.172L14.586 11.586C14.2109 11.9611 14.0001 12.4697 14 13V20L10 18V13C9.99994 12.4697 9.78914 11.9611 9.414 11.586L4 6.172V4Z"
                  fill="#2D3748"
                  fillOpacity="0.2"
                />
              )}
            </svg>
          </button>
        </div>
      )}

      {mobileFilterContainer && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: lightMode
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(0, 0, 0, 0.85)",
              zIndex: 999,
            }}
            onClick={() => setMobileFilterContainer(false)}
          />

          <div style={containerStyle}>
            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Show Me</h3>
              <select
                style={selectStyle}
                onChange={(e) => dispatch(setShowMovie(e.target.value))}
                value={showMovie}
              >
                <option value="Everything">Everything</option>
                <option value="Seen">Movies I have seen</option>
                <option value="Unseen">Movies I haven&apos;t seen</option>
              </select>
            </div>

            {showGenre && (
              <div style={{ marginBottom: "30px" }}>
                <h3 style={sectionTitleStyle}>Genre</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: isTablet ? "8px" : "10px" }}>
                  {[
                    "Action",
                    "Comedy",
                    "Sci-Fi",
                    "Drama",
                    "Horror",
                    "Romance",
                    "Adventure",
                    "Thriller",
                    "Sport",
                    "Animation",
                    "Crime",
                    "Reality",
                    "Documentary",
                    "Fantasy",
                    "TV",
                    "Mystery",
                    "Musical",
                    "War",
                    "Western",
                    "History",
                    "Family",
                  ].map((genre) => (
                    <div
                      key={genre}
                      style={getGenreTagStyle(genre)}
                      onClick={() => handleSelectGenre(genre)}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Runtime (minutes)</h3>
              <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
                <input
                  type="number"
                  placeholder="Min"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftRuntime1}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value !== "" && Number(value) < 0) value = "0";
                    setDraftRuntime1(value);
                  }}
                  onBlur={commitRuntime1}
                />
                <input
                  type="number"
                  placeholder="Max"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftRuntime2}
                  onChange={(e) => setDraftRuntime2(e.target.value)}
                  onBlur={commitRuntime2}
                />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Rating (1-10)</h3>
              <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
                <input
                  type="number"
                  placeholder="Min"
                  min="1"
                  max="10"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftRating1}
                  onChange={(e) => setDraftRating1(clampRating(e.target.value))}
                  onBlur={commitRating1}
                />
                <input
                  type="number"
                  placeholder="Max"
                  min="1"
                  max="10"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftRating2}
                  onChange={(e) => setDraftRating2(clampRating(e.target.value))}
                  onBlur={commitRating2}
                />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Release Year</h3>
              <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
                <input
                  type="number"
                  placeholder="From Year"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftYear1}
                  onChange={(e) => setDraftYear1(e.target.value)}
                  onBlur={commitYear1}
                />
                <input
                  type="number"
                  placeholder="To Year"
                  style={{ ...inputStyle, width: "50%" }}
                  value={draftYear2}
                  onChange={(e) => setDraftYear2(e.target.value)}
                  onBlur={commitYear2}
                />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Sort By</h3>
              <select
                style={selectStyle}
                onChange={handleSortBy}
                value={sortBy}
              >
                <option value="">Default</option>
                <option>Release Date (Asc)</option>
                <option>Release Date (Desc)</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </>
      )}

      {!isMobile && !mobileFilterContainer && (
        <div style={containerStyle}>
          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Show Me</h3>
            <select
              style={selectStyle}
              onChange={(e) => dispatch(setShowMovie(e.target.value))}
              value={showMovie}
            >
              <option value="Everything">Everything</option>
              <option value="Seen">Movies I have seen</option>
              <option value="Unseen">Movies I haven&apos;t seen</option>
            </select>
          </div>

          {showGenre && (
            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Genre</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: isTablet ? "8px" : "10px" }}>
                {[
                  "Action",
                  "Comedy",
                  "Sci-Fi",
                  "Drama",
                  "Horror",
                  "Romance",
                  "Adventure",
                  "Thriller",
                  "Sport",
                  "Animation",
                  "Crime",
                  "Reality",
                  "Documentary",
                  "Fantasy",
                  "TV",
                  "Mystery",
                  "Musical",
                  "War",
                  "Western",
                  "History",
                  "Family",
                ].map((genre) => (
                  <div
                    key={genre}
                    style={getGenreTagStyle(genre)}
                    onClick={() => handleSelectGenre(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Runtime (minutes)</h3>
            <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
              <input
                type="number"
                placeholder="Min"
                style={{ ...inputStyle, width: "50%" }}
                value={draftRuntime1}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value !== "" && Number(value) < 0) value = "0";
                  setDraftRuntime1(value);
                }}
                onBlur={commitRuntime1}
              />
              <input
                type="number"
                placeholder="Max"
                style={{ ...inputStyle, width: "50%" }}
                value={draftRuntime2}
                onChange={(e) => setDraftRuntime2(e.target.value)}
                onBlur={commitRuntime2}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Rating (1-10)</h3>
            <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
              <input
                type="number"
                placeholder="Min"
                min="1"
                max="10"
                style={{ ...inputStyle, width: "50%" }}
                value={draftRating1}
                onChange={(e) => setDraftRating1(clampRating(e.target.value))}
                onBlur={commitRating1}
              />
              <input
                type="number"
                placeholder="Max"
                min="1"
                max="10"
                style={{ ...inputStyle, width: "50%" }}
                value={draftRating2}
                onChange={(e) => setDraftRating2(clampRating(e.target.value))}
                onBlur={commitRating2}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Release Year</h3>
            <div style={{ display: "flex", gap: isTablet ? "8px" : "10px" }}>
              <input
                type="number"
                placeholder="From Year"
                style={{ ...inputStyle, width: "50%" }}
                value={draftYear1}
                onChange={(e) => setDraftYear1(e.target.value)}
                onBlur={commitYear1}
              />
              <input
                type="number"
                placeholder="To Year"
                style={{ ...inputStyle, width: "50%" }}
                value={draftYear2}
                onChange={(e) => setDraftYear2(e.target.value)}
                onBlur={commitYear2}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Sort By</h3>
            <select
              style={selectStyle}
              onChange={handleSortBy}
              value={sortBy}
            >
              <option value="">Default</option>
              <option>Release Date (Asc)</option>
              <option>Release Date (Desc)</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}