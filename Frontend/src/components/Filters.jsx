import { useState } from "react";
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
  const [localGenre, setLocalGenre] = useState([]);
  const [localRating1, setLocalRating1] = useState("");
  const [localRating2, setLocalRating2] = useState("");
  const [localRuntime1, setLocalRuntime1] = useState("");
  const [localRuntime2, setLocalRuntime2] = useState("");
  const [localYear1, setLocalYear1] = useState("");
  const [localYear2, setLocalYear2] = useState("");
  const [localSortBy, setLocalSortBy] = useState("");
  const showGenre = useSelector((state) => state.movieDetails.showGenre ?? false);
  const [localShowMovie, setLocalShowMovie] = useState("Everything");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallMobile = useMediaQuery({ maxWidth: 374 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const [mobileFilterContainer, setMobileFilterContainer] = useState(false);

  function handleSortBy(e) {
    const value = e.target.value;
    setLocalSortBy(value);
  }

  function handleShowResults() {
    dispatch(setRating1(localRating1));
    dispatch(setRating2(localRating2));
    dispatch(setGenre(localGenre));
    dispatch(setRuntime1(localRuntime1));
    dispatch(setRuntime2(localRuntime2));
    dispatch(setYear1(localYear1));
    dispatch(setYear2(localYear2));
    dispatch(applySort(localSortBy));
    dispatch(setShowMovie(localShowMovie));
  }

  function handleSetRating1(e) {
    let value = e.target.value;
    if (value < 0) value = 0;
    else if (value > 10) value = 10;
    setLocalRating1(value);
  }

  function handleSetRating2(e) {
    let value = e.target.value;
    if (value < 0) value = 0;
    else if (value > 10) value = 10;
    setLocalRating2(value);
  }

  function handleSelectGenre(genre) {
    if (localGenre.includes(genre)) {
      setLocalGenre((prev) => prev.filter((elem) => elem !== genre));
    } else {
      setLocalGenre((prev) => [...prev, genre]);
    }
  }

  const handleRuntime1 = (e) => {
    let value = e.target.value;
    if (value < 0) value = 0;
    setLocalRuntime1(value);
  };

  const handleRuntime2 = (e) => {
    setLocalRuntime2(e.target.value);
  };

  function handleSetYear1(e) {
    setLocalYear1(e.target.value);
  }

  function handleSetYear2(e) {
    setLocalYear2(e.target.value);
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
      backgroundColor: localGenre.includes(genre)
        ? lightMode
          ? "#ebf8ff"
          : "#2b6cb0"
        : lightMode
        ? "#edf2f7"
        : "#2d3748",
      color: localGenre.includes(genre)
        ? lightMode
          ? "#3182ce"
          : "#ffffff"
        : lightMode
        ? "#4a5568"
        : "#a0aec0",
      border: localGenre.includes(genre)
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
    backgroundColor: localGenre.includes(genre)
      ? lightMode
        ? "#ebf8ff"
        : "#2b6cb0"
      : lightMode
      ? "#edf2f7"
      : "#2d3748",
    color: localGenre.includes(genre)
      ? lightMode
        ? "#3182ce"
        : "#ffffff"
      : lightMode
      ? "#4a5568"
      : "#a0aec0",
    border: localGenre.includes(genre)
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

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "30px",
    backgroundColor: lightMode ? "#4299e1" : "#3182ce",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: lightMode
      ? "0 4px 6px rgba(66, 153, 225, 0.3)"
      : "0 4px 6px rgba(49, 130, 206, 0.3)",
    ":hover": {
      backgroundColor: lightMode ? "#3182ce" : "#2b6cb0",
      transform: "translateY(-2px)",
      boxShadow: lightMode
        ? "0 6px 8px rgba(66, 153, 225, 0.4)"
        : "0 6px 8px rgba(49, 130, 206, 0.4)",
    },
    ":active": {
      transform: "translateY(0)",
    },
  };

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
                onChange={(e) => setLocalShowMovie(e.target.value)}
                value={localShowMovie}
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
                  value={localRuntime1}
                  onChange={handleRuntime1}
                />
                <input
                  type="number"
                  placeholder="Max"
                  style={{ ...inputStyle, width: "50%" }}
                  value={localRuntime2}
                  onChange={handleRuntime2}
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
                  value={localRating1}
                  onChange={handleSetRating1}
                />
                <input
                  type="number"
                  placeholder="Max"
                  min="1"
                  max="10"
                  style={{ ...inputStyle, width: "50%" }}
                  value={localRating2}
                  onChange={handleSetRating2}
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
                  value={localYear1}
                  onChange={handleSetYear1}
                />
                <input
                  type="number"
                  placeholder="To Year"
                  style={{ ...inputStyle, width: "50%" }}
                  value={localYear2}
                  onChange={handleSetYear2}
                />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={sectionTitleStyle}>Sort By</h3>
              <select
                style={selectStyle}
                onChange={handleSortBy}
                value={localSortBy}
              >
                <option>Release Date (Asc)</option>
                <option>Release Date (Desc)</option>
                <option>Rating</option>
              </select>
            </div>

            <button
              style={buttonStyle}
              onClick={() => {
                handleShowResults();
                setMobileFilterContainer(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      {!isMobile && !mobileFilterContainer && (
        <div style={containerStyle}>
          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Show Me</h3>
            <select
              style={selectStyle}
              onChange={(e) => setLocalShowMovie(e.target.value)}
              value={localShowMovie}
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
                value={localRuntime1}
                onChange={handleRuntime1}
              />
              <input
                type="number"
                placeholder="Max"
                style={{ ...inputStyle, width: "50%" }}
                value={localRuntime2}
                onChange={handleRuntime2}
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
                value={localRating1}
                onChange={handleSetRating1}
              />
              <input
                type="number"
                placeholder="Max"
                min="1"
                max="10"
                style={{ ...inputStyle, width: "50%" }}
                value={localRating2}
                onChange={handleSetRating2}
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
                value={localYear1}
                onChange={handleSetYear1}
              />
              <input
                type="number"
                placeholder="To Year"
                style={{ ...inputStyle, width: "50%" }}
                value={localYear2}
                onChange={handleSetYear2}
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={sectionTitleStyle}>Sort By</h3>
            <select
              style={selectStyle}
              onChange={handleSortBy}
              value={localSortBy}
            >
              <option>Release Date (Asc)</option>
              <option>Release Date (Desc)</option>
              <option>Rating</option>
            </select>
          </div>

          <button style={buttonStyle} onClick={handleShowResults}>
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}