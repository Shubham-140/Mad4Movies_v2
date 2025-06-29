import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setMovieResultData } from "../features/MovieDetailsSlice";
import SearchResults from "./SearchResults";

function SearchBar() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [displayQuery, setDisplayQuery] = useState("");
  const searchRef = useRef();
  const [backupDisplayQuery, setBackupDisplayQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 768;
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const isDesktop = window.innerWidth > 1024;

  function handleClickSearch() {
    if (displayQuery === "") return;
    searchRef?.current?.blur();
    setActiveIndex(-1);
    setShowSearchBar(false);
    dispatch(setMovieResultData(searchResults));
    navigate(`/search-results/${createSlug(displayQuery)}`);
  }

  const createSlug = (title) => {
    return encodeURIComponent(slugify(title, { lower: true, strict: true }));
  };

  useEffect(() => {
    function handleLoadMovieViaEnter(e) {
      if (searchResults.length === 0 || e.key !== "Enter") return;
      if (activeIndex !== -1 && showSearchBar === true) {
        setShowSearchBar(false);
        setActiveIndex(-1);
        searchRef?.current?.blur();
        navigate(
          `/movie/${searchResults[activeIndex].id}/${createSlug(
            searchResults[activeIndex].title
          )}`
        );
      } else if (activeIndex === -1 && showSearchBar === true) {
        handleClickSearch();
        setShowMobileSearchBar(false);
      }
    }

    document.addEventListener("keydown", handleLoadMovieViaEnter);
    return () =>
      document.removeEventListener("keydown", handleLoadMovieViaEnter);
  }, [activeIndex, showSearchBar, searchResults, navigate, displayQuery]);

  useEffect(() => {
    function handleArrows(e) {
      if (!searchResults.length) return;
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => {
          const newIndex = prev === searchResults.length - 1 ? -1 : prev + 1;
          setDisplayQuery(
            newIndex === -1
              ? backupDisplayQuery
              : searchResults[newIndex]?.title
          );
          return newIndex;
        });
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => {
          const newIndex = prev === -1 ? searchResults.length - 1 : prev - 1;
          setDisplayQuery(
            newIndex === -1
              ? backupDisplayQuery
              : searchResults[newIndex]?.title
          );
          setTimeout(() => {
            searchRef?.current?.focus();
            searchRef?.current?.setSelectionRange(999, 999);
          }, 0);
          return newIndex;
        });
      }
    }

    document.addEventListener("keydown", handleArrows);
    return () => document.removeEventListener("keydown", handleArrows);
  }, [backupDisplayQuery, searchResults]);

  useEffect(() => {
    function fetchSearchResults() {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${query}`
      )
        .then((response) => response?.json())
        .then((data) => setSearchResults(data?.results || []))
        .catch(() => console.error(""));
    }

    const timer = setTimeout(() => fetchSearchResults(), 400);
    return () => clearTimeout(timer);
  }, [query]);

  function handleQueryChange(e) {
    setDisplayQuery(e.target.value);
    setQuery(e.target.value);
    setBackupDisplayQuery(e.target.value);
  }

  if (isMobile) {
    return (
      <div
        style={{
          position: "relative",
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!showMobileSearchBar && (
          <button
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "background-color 0.2s ease",
              ":active": {
                backgroundColor: lightMode
                  ? "rgba(0,0,0,0.05)"
                  : "rgba(255,255,255,0.1)",
              },
            }}
            onClick={() => {
              setShowMobileSearchBar(true);
              setTimeout(() => searchRef.current?.focus(), 100);
            }}
            aria-label="Open search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke={lightMode ? "#5E6E8F" : "#7A8CB1"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke={lightMode ? "#5E6E8F" : "#7A8CB1"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {showMobileSearchBar && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: lightMode ? "#f8faff" : "#1a2232",
              padding: "10px 16px",
              zIndex: 9999,
              boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
              borderBottom: lightMode
                ? "1px solid rgba(0,0,0,0.05)"
                : "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              height: "52px",
            }}
          >
            <button
              onClick={() => {
                setShowMobileSearchBar(false);
                setShowSearchBar(false);
                setDisplayQuery("");
                setQuery("");
              }}
              style={{
                background: "none",
                border: "none",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                ":active": {
                  backgroundColor: lightMode
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.1)",
                },
              }}
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                  fill={lightMode ? "#3b82f6" : "#93c5fd"}
                />
              </svg>
            </button>

            <div
              style={{
                flex: 1,
                display: "flex",
                backgroundColor: lightMode ? "#ffffff" : "#1e293b",
                borderRadius: "18px",
                padding: "0 16px",
                alignItems: "center",
                height: "36px",
                boxShadow: lightMode
                  ? "inset 0 1px 3px rgba(0,0,0,0.1)"
                  : "inset 0 1px 3px rgba(0,0,0,0.3)",
              }}
            >
              <input
                type="text"
                placeholder="Search Movies..."
                style={{
                  width: "100%",
                  padding: isTablet ? "8px 16px" : "10px 18px",
                  borderRadius: "24px 0 0 24px",
                  border: "none",
                  outline: "none",
                  fontSize: isTablet ? "13px" : "14px",
                  background: lightMode ? "#FFFFFF" : "#2D3748",
                  color: lightMode ? "#1A202C" : "#F7FAFC",
                  height: isTablet ? "30px" : "34px",
                  boxShadow: lightMode
                    ? "0 2px 8px rgba(0,0,0,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.3)",
                  ":focus": {
                    outline: "none",
                    boxShadow: lightMode
                      ? "0 2px 8px rgba(0,0,0,0.1)"
                      : "0 2px 8px rgba(0,0,0,0.3)",
                    border: "none",
                    outlineOffset: "0",
                    outlineWidth: "0",
                  },
                  WebkitTapHighlightColor: "transparent",
                  WebkitFocusRingColor: "transparent",
                }}
                value={displayQuery}
                onChange={handleQueryChange}
                ref={searchRef}
                onFocus={() => setShowSearchBar(true)}
              />
              {displayQuery && (
                <button
                  onClick={() => {
                    handleClickSearch();
                    setShowMobileSearchBar(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0 0 0 8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Submit search"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke={lightMode ? "#3b82f6" : "#93c5fd"}
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke={lightMode ? "#3b82f6" : "#93c5fd"}
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {searchResults.length > 0 && showSearchBar && (
          <SearchResults
            searchResults={searchResults}
            activeIndex={activeIndex}
            setShowSearchBar={setShowSearchBar}
            setActiveIndex={setActiveIndex}
            searchRef={searchRef}
            isMobile={isMobile}
            showMobileSearchBar={showMobileSearchBar}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            setShowMobileSearchBar={setShowMobileSearchBar}
          />
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <input
          type="text"
          placeholder="Search Movies..."
          style={{
            width: "100%",
            padding: isTablet ? "8px 16px" : "10px 18px",
            borderRadius: "24px 0 0 24px",
            border: "none",
            outline: "none",
            fontSize: isTablet ? "13px" : "14px",
            background: lightMode ? "#FFFFFF" : "#2D3748",
            color: lightMode ? "#1A202C" : "#F7FAFC",
            height: isTablet ? "30px" : "34px",
            boxShadow: lightMode
              ? "0 2px 8px rgba(0,0,0,0.1)"
              : "0 2px 8px rgba(0,0,0,0.3)",
            ":focus": {
              outline: "none",
              boxShadow: lightMode
                ? "0 2px 8px rgba(0,0,0,0.1)"
                : "0 2px 8px rgba(0,0,0,0.3)",
              border: "none",
              outlineOffset: "0",
              outlineWidth: "0",
            },
            WebkitTapHighlightColor: "transparent",
            WebkitFocusRingColor: "transparent",
          }}
          value={displayQuery}
          onChange={handleQueryChange}
          ref={searchRef}
          onFocus={() => setShowSearchBar(true)}
        />
        <button
          onClick={handleClickSearch}
          style={{
            height: isTablet ? "30px" : "34px",
            padding: "0 14px",
            background: lightMode ? "#FFFFFF" : "#2D3748",
            border: "none",
            borderRadius: "0 24px 24px 0",
            cursor: "pointer",
            boxShadow: lightMode
              ? "0 2px 8px rgba(0,0,0,0.1)"
              : "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke={lightMode ? "#606060" : "#AAAAAA"}
              strokeWidth="2"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke={lightMode ? "#606060" : "#AAAAAA"}
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {searchResults.length > 0 && showSearchBar && (
        <SearchResults
          searchResults={searchResults}
          activeIndex={activeIndex}
          setShowSearchBar={setShowSearchBar}
          setActiveIndex={setActiveIndex}
          searchRef={searchRef}
          isMobile={isMobile}
          showMobileSearchBar={showMobileSearchBar}
          isTablet={isTablet}
          isLoggedIn={isLoggedIn}
          setShowMobileSearchBar={setShowMobileSearchBar}
        />
      )}
    </div>
  );
}

export default SearchBar;
