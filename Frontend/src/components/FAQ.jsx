import { useDispatch, useSelector } from "react-redux";
import { cancelFAQSubmittedPrompt, setShowFAQ } from "../features/FAQSlice";
import AddFAQ from "./AddFAQ";
import FAQSubmittedPrompt from "./FAQSubmittedPrompt";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function FAQ() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const dispatch = useDispatch();
  const showFAQ = useSelector((state) => state.faq.showFAQ);
  const isFaqSubmitted = useSelector((state) => state.faq.isFaqSubmitted);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallMobile = useMediaQuery({ maxWidth: 374 }); 

  const faqs = [
    {
      q: "How do I search for a movie?",
      a: "You can search for a movie by typing its title in the search bar. Our system will fetch relevant results based on your query.",
    },
    {
      q: "Can I filter movies by genre or release year?",
      a: "Yes! You can refine your search by selecting genres, release years, or other filters available in the app.",
    },
    {
      q: "Is there a way to create a personal watchlist or save favorite movies for later?",
      a: "Absolutely! Our app allows you to create a personalized watchlist where you can save your favorite movies and access them anytime. This feature is especially useful for keeping track of movies you want to watch later. Simply click the 'Add to Watchlist' button on any movie, and it will be saved in your profile.",
    },
    {
      q: "Where do you get movie data from?",
      a: "We fetch movie details from a reliable third-party API that provides up-to-date information on films, actors, and ratings.",
    },
    {
      q: "How accurate are the ratings and reviews?",
      a: "Ratings and reviews are sourced from trusted databases and user feedback, ensuring accuracy and credibility.",
    },
    {
      q: "Can I get detailed information about a movie, including cast, reviews?",
      a: "Yes! When you search for a movie, you can click on it to view detailed information such as the plot summary, cast members, director, release year, ratings from various sources, and user reviews.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isFaqSubmitted === true) {
      const timer = setTimeout(() => {
        dispatch(cancelFAQSubmittedPrompt());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, isFaqSubmitted]);

  const getMobileStyles = () => {
    if (!isMobile) return {};

    return {
      container: {
        padding: isSmallMobile ? "12px 6px" : "15px 8px",
      },
      title: {
        fontSize: isSmallMobile ? "24px" : "28px",
        marginLeft: isSmallMobile ? "12px" : "15px",
      },
      underline: {
        top: isSmallMobile ? "32px" : "40px",
        width: isSmallMobile ? "40px" : "50px",
      },
      gradients: {
        topGradient: {
          width: isSmallMobile ? "150px" : "200px",
          height: isSmallMobile ? "120px" : "150px",
        },
        bottomGradient: {
          width: isSmallMobile ? "120px" : "150px",
          height: isSmallMobile ? "120px" : "150px",
        },
      },
      faqContainer: {
        padding: isSmallMobile ? "15px" : "20px",
        marginLeft: "0",
        maxHeight: isSmallMobile ? "400px" : "500px",
      },
      faqItem: {
        marginBottom: isSmallMobile ? "8px" : "10px",
      },
      summary: {
        padding: isSmallMobile ? "12px 15px" : "15px 20px",
        fontSize: isSmallMobile ? "0.95rem" : "1rem",
      },
      answer: {
        padding: isSmallMobile ? "0 15px 12px" : "0 20px 15px",
        fontSize: isSmallMobile ? "0.85rem" : "0.9rem",
      },
      ctaText: {
        fontSize: isSmallMobile ? "13px" : "14px",
        marginBottom: isSmallMobile ? "12px" : "15px",
      },
      ctaButton: {
        fontSize: isSmallMobile ? "13px" : "14px",
        padding: isSmallMobile ? "8px 16px" : "10px 20px",
      },
    };
  };

  const mobileStyles = getMobileStyles();

  const getContainerStyles = () => {
    if (windowWidth < 768) {
      return {
        padding: "15px 8px",
      };
    } else if (windowWidth < 1024) {
      return {
        padding: "18px 10px",
      };
    } else {
      return {
        padding: "20px 10px",
      };
    }
  };

  const getTitleStyles = () => {
    if (windowWidth < 768) {
      return {
        fontSize: "28px",
        marginLeft: "15px",
      };
    } else if (windowWidth < 1024) {
      return {
        fontSize: "36px",
        marginLeft: "18px",
      };
    } else {
      return {
        fontSize: "42px",
        marginLeft: "20px",
      };
    }
  };

  const getUnderlineStyles = () => {
    if (windowWidth < 768) {
      return {
        top: "40px",
        width: "50px",
      };
    } else if (windowWidth < 1024) {
      return {
        top: "50px",
        width: "60px",
      };
    } else {
      return {
        top: "60px",
        width: "70px",
      };
    }
  };

  const getGradientStyles = () => {
    if (windowWidth < 768) {
      return {
        topGradient: { width: "200px", height: "150px" },
        bottomGradient: { width: "150px", height: "150px" },
      };
    } else if (windowWidth < 1024) {
      return {
        topGradient: { width: "250px", height: "180px" },
        bottomGradient: { width: "180px", height: "180px" },
      };
    } else {
      return {
        topGradient: { width: "300px", height: "200px" },
        bottomGradient: { width: "200px", height: "200px" },
      };
    }
  };

  const { topGradient, bottomGradient } = getGradientStyles();

  function handleAddFAQ() {
    dispatch(setShowFAQ(true));
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          maxWidth: "1440px",
          ...getContainerStyles(),
          ...mobileStyles.container, 
          backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
          color: lightMode ? "#222" : "orange",
          boxShadow: lightMode
            ? "0px 8px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)"
            : "0px 8px 30px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            ...topGradient,
            ...mobileStyles.gradients?.topGradient,
            background: lightMode
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 165, 0, 0.08) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            ...bottomGradient,
            ...mobileStyles.gradients?.bottomGradient,
            background: lightMode
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 165, 0, 0.05) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-block",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
            zIndex: 1,
            marginBottom: isMobile ? "16px" : "20px",
            paddingLeft: isMobile
              ? "15px"
              : windowWidth < 1024
              ? "18px"
              : "20px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              ...getTitleStyles(),
              ...mobileStyles.title,
              fontWeight: "700",
              display: "inline-block",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.5px",
              position: "relative",
              color: lightMode ? "#1a365d" : "#f6ad55",
              fontSize: isMobile
                ? "clamp(20px, 6vw, 28px)"
                : getTitleStyles().fontSize,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              paddingRight: "20px",
              margin: 0,
              paddingBottom: "8px", 
            }}
          >
            Frequently Asked Questions
            <span
              style={{
                position: "absolute",
                bottom: "4px", 
                left: "0",
                width: isMobile ? "50px" : getUnderlineStyles().width,
                height: "4px",
                backgroundColor: lightMode ? "#3b82f6" : "orange",
                borderRadius: "2px",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            maxHeight: isMobile ? (isSmallMobile ? "350px" : "400px") : "500px",
            overflowY: "auto",
            marginLeft: windowWidth >= 1024 ? "20px" : "0px",
            padding: isMobile ? (isSmallMobile ? "15px" : "20px") : "20px",
            scrollbarWidth: "thin",
            scrollbarColor: lightMode ? "#3182ce #edf2f7" : "#f6ad55 #2d3748",
            position: "relative",
            background: lightMode
              ? "rgba(255,255,255,0.7)"
              : "rgba(26, 32, 44, 0.7)",
            borderRadius: isMobile ? "12px" : "16px",
            boxShadow: lightMode
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            border: lightMode
              ? "1px solid rgba(203, 213, 224, 0.5)"
              : "1px solid rgba(74, 85, 104, 0.5)",
          }}
          className={
            lightMode ? "faq-container light-mode" : "faq-container dark-mode"
          }
        >
          {faqs.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: isMobile
                  ? isSmallMobile
                    ? "8px"
                    : "10px"
                  : "15px",
                background: lightMode ? "#f0f4ff" : "rgba(45, 55, 72, 0.9)",
                borderRadius: isMobile ? "10px" : "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: lightMode
                  ? "1px solid rgba(226, 232, 240, 0.8)"
                  : "1px solid rgba(74, 85, 104, 0.5)",
                ":hover": {
                  boxShadow: lightMode
                    ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <details
                style={{
                  width: "100%",
                  padding: "0",
                  outline: "none",
                }}
              >
                <summary
                  style={{
                    padding: isMobile
                      ? isSmallMobile
                        ? "12px 15px"
                        : "15px 20px"
                      : "20px 25px",
                    fontSize: isMobile
                      ? isSmallMobile
                        ? "0.95rem"
                        : "1rem"
                      : "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: lightMode ? "#2d3748" : "#f7fafc",
                    transition: "all 0.2s ease",
                    position: "relative",
                    fontFamily: "'Poppins', sans-serif",
                    ":hover": {
                      color: lightMode ? "#3182ce" : "#f6ad55",
                    },
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    width={isSmallMobile ? "16" : "20"}
                    height={isSmallMobile ? "16" : "20"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={lightMode ? "#4a5568" : "#a0aec0"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: "transform 0.3s ease",
                      flexShrink: "0",
                      marginLeft: isSmallMobile ? "8px" : "15px",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div
                  style={{
                    padding: `0 ${
                      isMobile ? (isSmallMobile ? "15px" : "20px") : "25px"
                    } ${isMobile ? (isSmallMobile ? "12px" : "15px") : "20px"}`,
                    color: lightMode ? "#4a5568" : "#cbd5e0",
                    fontSize: isMobile
                      ? isSmallMobile
                        ? "0.85rem"
                        : "0.9rem"
                      : "1rem",
                    lineHeight: "1.6",
                    borderTop: lightMode
                      ? "1px solid rgba(226, 232, 240, 0.8)"
                      : "1px solid rgba(74, 85, 104, 0.5)",
                    marginTop: isMobile ? "8px" : "10px",
                  }}
                >
                  {item.a}
                </div>
              </details>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: isMobile ? "16px" : "20px",
            textAlign: "center",
            width: "100%",
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: isMobile
              ? isSmallMobile
                ? "0 6px"
                : "0 8px"
              : windowWidth < 1024
              ? "0 10px"
              : "0 10px",
          }}
        >
          <p
            style={{
              color: lightMode ? "#4a5568" : "#a0aec0",
              fontSize: isMobile
                ? isSmallMobile
                  ? "13px"
                  : "14px"
                : windowWidth < 1024
                ? "15px"
                : "16px",
              marginBottom: isMobile ? "12px" : "15px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Didn&apos;t find what you were looking for?
          </p>
          <button
            onClick={handleAddFAQ}
            style={{
              background: lightMode ? "#3182ce" : "#f6ad55",
              border: "none",
              color: "#fff",
              fontSize: isMobile
                ? isSmallMobile
                  ? "13px"
                  : "14px"
                : windowWidth < 1024
                ? "16px"
                : "18px",
              fontWeight: "600",
              cursor: "pointer",
              padding: isMobile
                ? isSmallMobile
                  ? "8px 16px"
                  : "10px 20px"
                : "10px 20px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: lightMode
                ? "0 2px 4px rgba(0, 0, 0, 0.1)"
                : "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = lightMode
                ? "#2c5282"
                : "#dd6b20";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = lightMode
                ? "#3182ce"
                : "#f6ad55";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Add Your Question
          </button>
        </div>
      </div>

      <div>{showFAQ && <AddFAQ />}</div>
      <div>{isFaqSubmitted && <FAQSubmittedPrompt />}</div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .faq-container.light-mode::-webkit-scrollbar {
            width: ${isSmallMobile ? "4px" : "6px"} !important;
          }
          .faq-container.light-mode::-webkit-scrollbar-track {
            background: #edf2f7 !important;
            border-radius: 4px !important;
          }
          .faq-container.light-mode::-webkit-scrollbar-thumb {
            background: #3182ce !important;
            border-radius: 4px !important;
          }
          .faq-container.light-mode::-webkit-scrollbar-thumb:hover {
            background: #2c5282 !important;
          }

          .faq-container.dark-mode::-webkit-scrollbar {
            width: ${isSmallMobile ? "4px" : "6px"} !important;
          }
          .faq-container.dark-mode::-webkit-scrollbar-track {
            background: #2d3748 !important;
            border-radius: 4px !important;
          }
          .faq-container.dark-mode::-webkit-scrollbar-thumb {
            background: #f6ad55 !important;
            border-radius: 4px !important;
          }
          .faq-container.dark-mode::-webkit-scrollbar-thumb:hover {
            background: #dd6b20 !important;
          }

          /* Mobile-specific enhancements */
          @media (max-width: 374px) {
            details > summary::-webkit-details-marker {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default FAQ;
