import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMovieId, setRecentlyViewed } from "../features/MovieDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import slugify from "slugify";

function MovieCard({ 
  title, 
  date, 
  rating, 
  image, 
  index, 
  movies, 
  lightMode, 
  containerWidth, 
  isMobile 
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const id = useParams();

  const createSlug = (title) => {
    return encodeURIComponent(slugify(title, { lower: true, strict: true }));
  };

  const getCardStyles = () => {
    if (isMobile) {
      return {
        width: "calc((100vw - 55px) / 3)",
        height: "255px",
      };
    } else {
      const gapTotal = 4 * 15;
      const cardWidth = (containerWidth - gapTotal) / 5;
      
      return {
        width: `${cardWidth}px`,
        height: `${cardWidth * 1.7}px`,
      };
    }
  };

  const cardStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: lightMode 
      ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
      : "0 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease",
    background: lightMode ? "#fff" : "#2D3748",
    padding: "0",
    color: lightMode ? "#1a202c" : "#f7fafc",
    position: "relative",
    zIndex: "5",
    overflow: "hidden",
    boxSizing: "border-box",
    ...getCardStyles(),
  };

  function handleTitleClick() {
    dispatch(setMovieId(id));
    dispatch(setRecentlyViewed(movies[index].id));
    navigate(`/movie/${movies[index].id}/${createSlug(movies[index].title)}`);
  }

  const getFontSizes = () => {
    if (isMobile) {
      return {
        title: `${Math.max(12, window.innerWidth * 0.035)}px`,
        date: `${Math.max(8, window.innerWidth * 0.022)}px`,
        rating: `${Math.max(10, window.innerWidth * 0.028)}px`,
      };
    } else {
      const baseSize = parseFloat(cardStyles.width) * 0.09;
      return {
        title: `${baseSize}px`,
        date: `${baseSize * 0.7}px`,
        rating: `${baseSize * 0.8}px`,
      };
    }
  };

  const {
    title: titleFontSize,
    date: dateFontSize,
    rating: ratingFontSize,
  } = getFontSizes();

  const imageStyles = {
    width: "100%",
    height: isMobile ? "200px" : `${parseFloat(cardStyles.width) * 1.4}px`,
    objectFit: image ? "cover" : "contain",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    margin: "0",
    background: lightMode ? "#f0f4ff" : "#232A35",
  };

  return (
    <div>
      <div style={cardStyles}>
        <img
          src={
            image
              ? `https://image.tmdb.org/t/p/w500${image}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt={title}
          style={imageStyles}
        />
        <div
          style={{
            width: "100%",
            padding: isMobile ? "8px 8px 4px" : "8px 10px",
            display: "flex",
            flexDirection: "column",
            flex: "1",
            boxSizing: "border-box",
            background: lightMode
              ? "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
              : "linear-gradient(to bottom, rgba(45,55,72,0.9), rgba(45,55,72,0.7))",
          }}
        >
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: isMobile ? "ellipsis" : "clip",
            }}
            ref={containerRef}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: titleFontSize,
                fontWeight: "600",
                fontFamily: "'Poppins', sans-serif",
                color: lightMode ? "#2d3748" : "#f7fafc",
                cursor: "pointer",
                textTransform: "capitalize",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: isMobile ? "ellipsis" : "clip",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
                e.target.style.color = lightMode ? "#4299e1" : "#63b3ed";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
                e.target.style.color = lightMode ? "#2d3748" : "#f7fafc";
              }}
              onClick={handleTitleClick}
              ref={titleRef}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: "2px",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: "1",
              maxWidth: "100%",
              overflow: "hidden",
              marginTop: isMobile ? "4px" : "0",
              padding: isMobile ? "0 4px" : "0",
              gap: isMobile ? "4px" : "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: isMobile ? "60%" : "70%",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontSize: dateFontSize,
                  color: lightMode ? "#4a5568" : "#a0aec0",
                  margin: "0",
                  whiteSpace: "nowrap",
                  fontWeight: "500",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {date ? date : "N/A"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                maxWidth: isMobile ? "40%" : "30%",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontSize: ratingFontSize,
                  fontWeight: "600",
                  color: "#e53e3e",
                  margin: "0",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {Math.round(rating * 10) / 10}
                <span style={{ color: "#e53e3e", marginLeft: "2px" }}>⭐</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string,
  index: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      release_date: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
  lightMode: PropTypes.bool.isRequired,
  containerWidth: PropTypes.number,
  isMobile: PropTypes.bool,
};

MovieCard.defaultProps = {
  isMobile: false,
};

export default MovieCard;