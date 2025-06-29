import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { setMovie, setRecentlyViewed } from "../features/MovieDetailsSlice";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const SearchResults = ({
  searchResults,
  activeIndex,
  setShowSearchBar,
  setActiveIndex,
  searchRef,
  isMobile,
  setShowMobileSearchBar,
  isTablet,
}) => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const listRef = useRef(null);
  const activeItemRef = useRef(null);
  const isInsideRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createSlug = (title) => {
    return encodeURIComponent(slugify(title, { lower: true, strict: true }));
  };

  function handleClickMovie(movie) {
    dispatch(setMovie(movie));
    dispatch(setRecentlyViewed(movie.id));
    setShowSearchBar(false);
    setActiveIndex(-1);
    searchRef?.current?.blur();
    setShowMobileSearchBar(false);
    navigate(`/movie/${movie.id}/${createSlug(movie.title)}`);
  }

  useEffect(() => {
    if (activeIndex >= 0 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    function handleStopShowingSearchResults(e) {
      setTimeout(() => {
        if (
          e.key === "Escape" ||
          (!isInsideRef.current?.contains(e.target) &&
            !searchRef?.current.contains(e.target))
        ) {
          setShowSearchBar(false);
          setActiveIndex(-1);
          searchRef?.current?.blur();
        }
      }, 0);
    }

    document.addEventListener("click", handleStopShowingSearchResults);
    document.addEventListener("keydown", handleStopShowingSearchResults);

    return () => {
      document.removeEventListener("click", handleStopShowingSearchResults);
      document.removeEventListener("keydown", handleStopShowingSearchResults);
    };
  }, [setActiveIndex, setShowSearchBar, searchRef]);

  return (
    <div
      ref={isInsideRef}
      style={{
        position: isMobile ? "fixed" : "absolute",
        top: isMobile ? "40px" : isTablet ? "34px" : "38px", 
        left: isMobile ? "0" : "0",
        width: isMobile ? "100%" : "100%",
        maxWidth: isMobile ? "none" : "100%",
        maxHeight: isMobile ? "calc(100vh - 40px)" : "400px",
        backgroundColor: lightMode ? "#ffffff" : "#1a1a1a",
        borderRadius: isMobile ? "0" : "9px", 
        boxShadow: lightMode
          ? "0 10px 25px rgba(0, 0, 0, 0.15)"
          : "0 10px 25px rgba(0, 0, 0, 0.4)",
        border: isMobile
          ? "none"
          : lightMode
          ? "1px solid rgba(0,0,0,0.1)"
          : "1px solid rgba(255,255,255,0.1)",
        borderTop: isMobile ? "none" : "none",
        overflow: "hidden",
        zIndex: 9998,
        transform: isMobile ? "none" : "translateY(-2px)", 
      }}
    >
      <ul
        ref={listRef}
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          maxHeight: isMobile ? "calc(100vh - 40px)" : "400px",
          overflowY: "auto",
        }}
      >
        {searchResults.map((elem, index) => (
          <li
            key={elem.id}
            ref={index === activeIndex ? activeItemRef : null}
            onClick={() => {
              handleClickMovie(elem);
              setShowMobileSearchBar(false);
            }}
            style={{
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              backgroundColor:
                index === activeIndex
                  ? lightMode
                    ? "rgba(229, 9, 20, 0.08)"
                    : "rgba(229, 9, 20, 0.15)"
                  : "transparent",
              ":hover": {
                backgroundColor: lightMode
                  ? "rgba(229, 9, 20, 0.08)"
                  : "rgba(229, 9, 20, 0.15)",
              },
            }}
          >
            <div
              style={{
                width: "40px",
                height: "60px",
                flexShrink: 0,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  elem.poster_path
                    ? `https://image.tmdb.org/t/p/w200${elem.poster_path}`
                    : "https://via.placeholder.com/40x60/333/666?text=No+Image"
                }
                alt={elem.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: lightMode ? "#111" : "#fff",
                  }}
                >
                  {elem.title}
                </h3>
                {elem.release_date && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: lightMode ? "#777" : "#aaa",
                    }}
                  >
                    ({elem.release_date.slice(0, 4)})
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: lightMode ? "#666" : "#aaa",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {elem.overview || "No description available"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      overview: PropTypes.string,
      genre_ids: PropTypes.array,
    })
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setShowSearchBar: PropTypes.func.isRequired,
  searchRef: PropTypes.shape({ current: PropTypes.any }),
  isMobile: PropTypes.bool,
  showMobileSearchBar: PropTypes.bool,
  isTablet: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  setShowMobileSearchBar: PropTypes.func,
};

export default SearchResults;
