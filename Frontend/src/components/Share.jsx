import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowShare } from "../features/MovieDetailsSlice";
import PropTypes from "prop-types";
import X_DarkMode from "../img/X_DarkMode.jpg";
import X_LightMode from "../img/X_LightMode.jpg";
import { useMediaQuery } from "react-responsive";

const Share = ({ shareBtnRef }) => {
  const movie = useSelector((state) => state.movieDetails.movie);
  const shareRef = useRef();
  const dispatch = useDispatch();
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const currentUrl = window.location.href;
  const copyRef = useRef();
  const urlRef = useRef();
  const movieName = movie?.title;
  const releaseYear = movie?.release_date?.slice(0, 4) || "";
  const rating = movie?.vote_average?.toFixed(1) || "";

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallMobile = useMediaQuery({ maxWidth: 400 }); 

  const message = `🎬 *${movieName}* (${releaseYear}) ⭐ ${rating}\n\n"${
    movie?.overview?.split(".")[0] || "An incredible movie experience"
  }..."\n\n🔗 Watch Trailer: ${currentUrl}\n\n#MovieRecommendation #FilmLover`;

  const platform = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}"e=${encodeURIComponent(message)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(message)}`,
  };

  const shareHandlers = {
    whatsapp: () => window.open(platform.whatsapp, "_blank"),
    twitter: () => window.open(platform.twitter, "_blank"),
    facebook: () => window.open(platform.facebook, "_blank"),
    telegram: () => window.open(platform.telegram, "_blank"),
    instagram: () => window.open(platform.instagram, "_blank"),
  };

  const handleCopyUrl = () => {
    if (copyRef?.current) {
      const url = currentUrl;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            copyRef.current.innerText = "✓ Copied!";
            copyRef.current.style.backgroundColor = lightMode
              ? "#4CAF50"
              : "#388E3C";
            setTimeout(() => {
              copyRef.current.innerText = "Copy Link";
              copyRef.current.style.backgroundColor = "#E50914";
            }, 2000);
          })
          .catch(() => {
            console.error("");
            fallbackCopy(url);
          });
      } else {
        fallbackCopy(url);
      }
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      copyRef.current.innerText = "✓ Copied!";
      copyRef.current.style.backgroundColor = lightMode ? "#4CAF50" : "#388E3C";
      setTimeout(() => {
        copyRef.current.innerText = "Copy Link";
        copyRef.current.style.backgroundColor = "#E50914";
      }, 2000);
    } catch {
      console.log("");
      copyRef.current.innerText = "Copy Failed";
      copyRef.current.style.backgroundColor = "#B00020";
      setTimeout(() => {
        copyRef.current.innerText = "Copy Link";
        copyRef.current.style.backgroundColor = "#E50914";
      }, 2000);
    }
    document.body.removeChild(textArea);
  };

  useEffect(() => {
    const closeShareComp = (e) => {
      if (
        e.type === "click" &&
        shareRef?.current &&
        !shareRef.current.contains(e.target) &&
        shareBtnRef?.current !== e.target &&
        !shareBtnRef?.current?.contains(e.target)
      ) {
        dispatch(setShowShare(false));
      } else if (e.type === "keydown" && e.key === "Escape") {
        dispatch(setShowShare(false));
      }
    };

    document.addEventListener("click", closeShareComp);
    document.addEventListener("keydown", closeShareComp);

    return () => {
      document.removeEventListener("click", closeShareComp);
      document.removeEventListener("keydown", closeShareComp);
    };
  }, [shareRef, dispatch, shareBtnRef]);

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: lightMode
        ? "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      handler: shareHandlers.instagram,
      color: "#E1306C",
    },
    {
      name: "WhatsApp",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      handler: shareHandlers.whatsapp,
      color: "#25D366",
    },
    {
      name: "Facebook",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      handler: shareHandlers.facebook,
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: lightMode ? X_LightMode : X_DarkMode,
      handler: shareHandlers.twitter,
      color: "#1DA1F2",
      bgColor: lightMode ? "#F0F0F0" : "#2D3748",
    },
    {
      name: "Telegram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      handler: shareHandlers.telegram,
      color: "#0088CC",
    },
  ];

  const getContainerStyles = () => {
    if (isMobile) {
      return {
        width: "90vw",
        padding: "20px",
        borderRadius: "12px",
      };
    } else if (isTablet) {
      return {
        width: "75vw",
        maxWidth: "600px",
        padding: "25px 30px",
        borderRadius: "14px",
      };
    } else {
      return {
        width: "560px",
        padding: "30px 40px",
        borderRadius: "16px",
      };
    }
  };

  const getTitleStyles = () => {
    if (isMobile) {
      return {
        fontSize: "20px",
        marginBottom: "6px",
      };
    } else if (isTablet) {
      return {
        fontSize: "24px",
        marginBottom: "8px",
      };
    } else {
      return {
        fontSize: "26px",
        marginBottom: "8px",
      };
    }
  };

  const getSubtitleStyles = () => {
    if (isMobile) {
      return {
        fontSize: "13px",
      };
    } else {
      return {
        fontSize: "15px",
      };
    }
  };

  const getSocialGridStyles = () => {
    if (isMobile) {
      return {
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: isSmallMobile ? "8px" : "12px", 
        marginBottom: "25px",
      };
    } else {
      return {
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        marginBottom: "35px",
      };
    }
  };

  const getSocialButtonStyles = () => {
    if (isSmallMobile) {
      return {
        iconSize: "36px",
        iconMargin: "6px",
        textSize: "10px",
        iconImgSize: "16px",
      };
    } else if (isMobile) {
      return {
        iconSize: "40px",
        iconMargin: "8px",
        textSize: "12px",
        iconImgSize: "20px",
      };
    } else if (isTablet) {
      return {
        iconSize: "45px",
        iconMargin: "8px",
        textSize: "12px",
        iconImgSize: "22px",
      };
    } else {
      return {
        iconSize: "50px",
        iconMargin: "10px",
        textSize: "13px",
        iconImgSize: "24px",
      };
    }
  };

  const getButtonStyles = () => {
    if (isMobile) {
      return {
        padding: "14px",
        fontSize: "14px",
        borderRadius: "10px",
      };
    } else if (isTablet) {
      return {
        padding: "15px",
        fontSize: "15px",
        borderRadius: "12px",
      };
    } else {
      return {
        padding: "16px",
        fontSize: "16px",
        borderRadius: "12px",
      };
    }
  };

  const getUrlInputStyles = () => {
    if (isMobile) {
      return {
        padding: "12px 16px",
        fontSize: "14px",
        borderRadius: "10px",
        marginBottom: "20px",
      };
    } else if (isTablet) {
      return {
        padding: "13px 18px",
        fontSize: "14px",
        borderRadius: "12px",
        marginBottom: "25px",
      };
    } else {
      return {
        padding: "14px 20px",
        fontSize: "15px",
        borderRadius: "12px",
        marginBottom: "30px",
      };
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 999,
          backdropFilter: "blur(5px)",
          animation: "fadeInOverlay 0.3s ease-out",
        }}
      ></div>

      <div
        ref={shareRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: lightMode ? "#ffffff" : "#1E293B",
          boxShadow: lightMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          textAlign: "center",
          zIndex: 1000,
          fontFamily: "'Inter', sans-serif",
          border: lightMode
            ? "1px solid rgba(0,0,0,0.05)"
            : "1px solid rgba(255,255,255,0.05)",
          animation: "modalSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
          ...getContainerStyles(),
        }}
      >
        <button
          onClick={() => dispatch(setShowShare(false))}
          style={{
            position: "absolute",
            top: isMobile ? "12px" : "20px",
            right: isMobile ? "12px" : "20px",
            background: "none",
            border: "none",
            fontSize: isMobile ? "20px" : "24px",
            color: lightMode ? "#777" : "#999",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            ":hover": {
              transform: "rotate(90deg)",
              color: "#E50914",
            },
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: isMobile ? "15px" : "25px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: getTitleStyles().fontSize,
              fontWeight: "700",
              color: lightMode ? "#1F2937" : "#F3F4F6",
              letterSpacing: "-0.5px",
              marginBottom: getTitleStyles().marginBottom,
            }}
          >
            Share this movie
          </h3>
          <p
            style={{
              fontSize: getSubtitleStyles().fontSize,
              color: lightMode ? "#6B7280" : "#9CA3AF",
              margin: 0,
            }}
          >
            Spread the word about this amazing movie
          </p>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: getUrlInputStyles().marginBottom,
          }}
        >
          <input
            type="text"
            value={currentUrl}
            readOnly
            style={{
              width: "100%",
              border: "none",
              fontSize: getUrlInputStyles().fontSize,
              color: lightMode ? "#374151" : "#E5E7EB",
              backgroundColor: lightMode ? "#F9FAFB" : "#334155",
              outline: "none",
              transition: "all 0.3s ease",
              fontFamily: "'Roboto Mono', monospace",
              padding: getUrlInputStyles().padding,
              borderRadius: getUrlInputStyles().borderRadius,
            }}
            ref={urlRef}
            onFocus={(e) => e.target.select()}
          />
        </div>

        <div
          style={{
            display: "grid",
            gap: getSocialGridStyles().gap,
            marginBottom: getSocialGridStyles().marginBottom,
            ...getSocialGridStyles(),
          }}
        >
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "none",
                border: "none",
                padding: isMobile ? "8px 0" : "12px 0",
                borderRadius: "12px",
                ":hover": {
                  transform: "translateY(-5px)",
                  backgroundColor: lightMode
                    ? `${platform.color}10`
                    : `${platform.color}20`,
                },
              }}
              onClick={platform.handler}
            >
              <div
                style={{
                  width: getSocialButtonStyles().iconSize,
                  height: getSocialButtonStyles().iconSize,
                  borderRadius: "50%",
                  backgroundColor:
                    platform.name === "Twitter"
                      ? platform.bgColor
                      : platform.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: getSocialButtonStyles().iconMargin,
                  boxShadow: `0 4px 12px ${
                    platform.name === "Twitter"
                      ? "rgba(0, 0, 0, 0.1)"
                      : `${platform.color}40`
                  }`,
                }}
              >
                <img
                  src={platform.icon}
                  alt={platform.name}
                  style={{
                    width: getSocialButtonStyles().iconImgSize,
                    height: getSocialButtonStyles().iconImgSize,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: getSocialButtonStyles().textSize,
                  fontWeight: "600",
                  color: lightMode ? "#4B5563" : "#D1D5DB",
                }}
              >
                {platform.name}
              </span>
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: isMobile ? "12px" : "20px",
          }}
        >
          <button
            style={{
              flex: 1,
              border: "none",
              backgroundColor: lightMode ? "#F3F4F6" : "#334155",
              color: lightMode ? "#374151" : "#E5E7EB",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              ":hover": {
                backgroundColor: lightMode ? "#E5E7EB" : "#3E4C65",
                transform: "translateY(-2px)",
              },
              ...getButtonStyles(),
            }}
            onClick={() => dispatch(setShowShare(false))}
          >
            Close
          </button>
          <button
            style={{
              flex: 1,
              border: "none",
              backgroundColor: "#E50914",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(229, 9, 20, 0.3)",
              ":hover": {
                backgroundColor: "#D30813",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(229, 9, 20, 0.4)",
              },
              ...getButtonStyles(),
            }}
            ref={copyRef}
            onClick={handleCopyUrl}
          >
            Copy Link
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes modalSlideIn {
            from { 
              opacity: 0; 
              transform: translate(-50%, -48%); 
            }
            to { 
              opacity: 1; 
              transform: translate(-50%, -50%); 
            }
          }
        `}
      </style>
    </div>
  );
};

Share.propTypes = {
  shareBtnRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default Share;
