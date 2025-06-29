import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isSmallMobile = useMediaQuery({ maxWidth: 374 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const footerColumns = [
    {
      title: "Explore",
      links: [
        { name: "Top Rated Movies", to: "/top-rated-movies" },
        { name: "Trending Movies", to: "/trending-movies" },
        { name: "Upcoming Movies", to: "/upcoming-movies" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Contact Us", to: "/contact" },
        { name: "Blog", to: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", to: "/privacy-policy" },
        { name: "Terms of Service", to: "/terms" },
        { name: "Cookie Policy", to: "/cookie-policy" },
      ],
    },
  ];

  const getMobileStyles = () => {
    if (!isMobile) return {};

    return {
      brandColumn: {
        textAlign: "center",
        marginBottom: isSmallMobile ? "20px" : "25px",
      },
      brandTitle: {
        fontSize: isSmallMobile ? "1.4rem" : "1.5rem",
        marginBottom: isSmallMobile ? "12px" : "15px",
      },
      brandUnderline: {
        width: isSmallMobile ? "35px" : "40px",
        margin: isSmallMobile ? "6px auto 0" : "8px auto 0",
      },
      brandDescription: {
        fontSize: isSmallMobile ? "0.8rem" : "0.85rem",
        marginBottom: isSmallMobile ? "15px" : "20px",
      },
      columnsContainer: {
        gap: isSmallMobile ? "20px" : "30px",
      },
      columnTitle: {
        fontSize: isSmallMobile ? "1rem" : "1.1rem",
        marginBottom: isSmallMobile ? "12px" : "15px",
      },
      columnLink: {
        fontSize: isSmallMobile ? "0.75rem" : "0.8rem",
      },
      copyright: {
        fontSize: isSmallMobile ? "0.65rem" : "0.7rem",
      },
    };
  };

  const mobileStyles = getMobileStyles();

  const getLayoutStyles = () => {
    if (isTablet) {
      return {
        brandFontSize: "clamp(1.2rem, 2vw, 1.8rem)",
        brandUnderlineWidth: "clamp(1.8rem, 3vw, 3rem)",
        brandDescriptionFontSize: "clamp(0.7rem, 1.2vw, 1rem)",
        brandDescriptionMaxWidth: "clamp(160px, 20vw, 200px)",
        columnTitleFontSize: "clamp(0.9rem, 1.5vw, 1.3rem)",
        columnLinkFontSize: "clamp(0.6rem, 1vw, 0.9rem)",
        marginLeft: "clamp(1.5rem, 3vw, 3rem)",
        margin: "clamp(0.8rem, 1.5vw, 1.5rem)",
        columnGap: "clamp(0.4rem, 0.8vw, 0.8rem)",
      };
    }
    return {
      brandFontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
      brandUnderlineWidth: "clamp(2.2rem, 3.5vw, 4rem)",
      brandDescriptionFontSize: "clamp(0.8rem, 1.3vw, 1.2rem)",
      brandDescriptionMaxWidth: "clamp(200px, 22vw, 250px)",
      columnTitleFontSize: "clamp(1rem, 1.6vw, 1.5rem)",
      columnLinkFontSize: "clamp(0.7rem, 1.1vw, 1.1rem)",
      marginLeft: "clamp(2rem, 4vw, 4rem)",
      margin: "clamp(1rem, 2vw, 2rem)",
      columnGap: "clamp(0.5rem, 1vw, 1rem)",
    };
  };

  const layoutStyles = getLayoutStyles();

  return (
    <footer
      style={{
        backgroundColor: lightMode ? "#f0f4ff" : "#232A35",
        color: lightMode ? "#2d3748" : "#f7fafc",
        padding:
          "clamp(40px, 8vw, 80px) clamp(20px, 5%, 40px) clamp(20px, 5vw, 40px)",
        borderTop: lightMode
          ? "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "clamp(80%, 90vw, 95%)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(30px, 5vw, 60px)",
        }}
      >
        {isMobile ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(25px, 5vw, 40px)",
            }}
          >
            <div style={{ ...mobileStyles.brandColumn }}>
              <h2
                style={{
                  fontWeight: "700",
                  margin: "0 0 clamp(15px, 3vw, 20px) 0",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: "1.2",
                  ...mobileStyles.brandTitle,
                }}
              >
                Mad4Movies
                <span
                  style={{
                    display: "block",
                    height: "4px",
                    background: lightMode ? "#4299e1" : "#63b3ed",
                    borderRadius: "2px",
                    ...mobileStyles.brandUnderline,
                  }}
                />
              </h2>
              <p
                style={{
                  lineHeight: "1.6",
                  color: lightMode ? "#4a5568" : "#a0aec0",
                  margin: "0 0 clamp(15px, 3vw, 25px) 0",
                  ...mobileStyles.brandDescription,
                }}
              >
                Your ultimate guide to the world of cinema. Discover, explore,
                and enjoy films from every corner of the globe.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "clamp(25px, 6vw, 40px)",
                width: "100%",
                ...mobileStyles.columnsContainer,
              }}
            >
              {footerColumns.map((column, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      fontWeight: "600",
                      margin: "0 0 clamp(15px, 3vw, 20px) 0",
                      color: lightMode ? "#1a365d" : "#f7fafc",
                      fontFamily: "'Poppins', sans-serif",
                      ...mobileStyles.columnTitle,
                    }}
                  >
                    {column.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(8px, 2vw, 12px)",
                    }}
                  >
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.to}
                          style={{
                            color: lightMode ? "#4a5568" : "#a0aec0",
                            textDecoration: "none",
                            fontWeight: "500",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
                            ...mobileStyles.columnLink,
                          }}
                          onMouseOver={(e) =>
                            Object.assign(e.target.style, {
                              color: lightMode ? "#3182ce" : "#63b3ed",
                              transform: "translateX(5px)",
                            })
                          }
                          onMouseOut={(e) =>
                            Object.assign(e.target.style, {
                              color: lightMode ? "#4a5568" : "#a0aec0",
                              transform: "translateX(0)",
                            })
                          }
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, auto)",
              alignItems: "flex-start",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h2
                style={{
                  fontSize: layoutStyles.brandFontSize,
                  fontWeight: "700",
                  margin: "0 0 " + layoutStyles.margin + " 0",
                  color: lightMode ? "#1a365d" : "#f7fafc",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: "1.2",
                }}
              >
                Mad4Movies
                <span
                  style={{
                    display: "block",
                    width: layoutStyles.brandUnderlineWidth,
                    height: "clamp(0.2rem, 0.3vw, 0.3rem)",
                    background: lightMode ? "#4299e1" : "#63b3ed",
                    margin: layoutStyles.margin + " 0 0 0",
                    borderRadius: "2px",
                  }}
                />
              </h2>
              <p
                style={{
                  fontSize: layoutStyles.brandDescriptionFontSize,
                  lineHeight: "1.6",
                  color: lightMode ? "#4a5568" : "#a0aec0",
                  margin: "0 0 " + layoutStyles.margin + " 0",
                  maxWidth: layoutStyles.brandDescriptionMaxWidth,
                }}
              >
                Your ultimate guide to the world of cinema. Discover, explore,
                and enjoy films from every corner of the globe.
              </p>
            </div>

            {footerColumns.map((column, index) => (
              <div
                key={index}
                style={{
                  textAlign: "left",
                  marginLeft: layoutStyles.marginLeft,
                }}
              >
                <h3
                  style={{
                    fontSize: layoutStyles.columnTitleFontSize,
                    fontWeight: "600",
                    margin: "0 0 " + layoutStyles.margin + " 0",
                    color: lightMode ? "#1a365d" : "#f7fafc",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {column.title}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: layoutStyles.columnGap,
                    alignItems: "flex-start",
                  }}
                >
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.to}
                        style={{
                          color: lightMode ? "#4a5568" : "#a0aec0",
                          textDecoration: "none",
                          fontSize: layoutStyles.columnLinkFontSize,
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                        onMouseOver={(e) =>
                          Object.assign(e.target.style, {
                            color: lightMode ? "#3182ce" : "#63b3ed",
                            transform: "translateX(5px)",
                          })
                        }
                        onMouseOut={(e) =>
                          Object.assign(e.target.style, {
                            color: lightMode ? "#4a5568" : "#a0aec0",
                            transform: "translateX(0)",
                          })
                        }
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "clamp(20px, 4vw, 40px)",
            borderTop: lightMode
              ? "1px solid rgba(0, 0, 0, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            color: lightMode ? "#718096" : "#a0aec0",
            fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
            gap: "8px",
            textAlign: "center",
            ...mobileStyles.copyright,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="clamp(14px, 3vw, 16px)"
              height="clamp(14px, 3vw, 16px)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
            </svg>
            <span>2025 Mad4Movies. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;