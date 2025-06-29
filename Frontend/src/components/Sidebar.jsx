import PropTypes from "prop-types";
import { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleMode } from "../features/ColorSlice";
import { motion, AnimatePresence } from "framer-motion";
import { handleLogout } from "../features/AuthSlice";

const Sidebar = ({ setOpenSidebar, openSidebar, sidebarRef }) => {
  const sideRef = useRef();
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const menuContainerRef = useRef();
  const dispatch = useDispatch();
  const [deviceType, setDeviceType] = useState("desktop");
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setDeviceType("small-mobile");
      } else if (width >= 480 && width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallMobile = deviceType === "small-mobile";
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  const theme = {
    background: lightMode ? "#f0f4ff" : "#232A35",
    text: lightMode ? "#232A35" : "#f0f4ff",
    accent: "#E50914",
    divider: lightMode ? "rgba(35,42,53,0.1)" : "rgba(240,244,255,0.1)",
    hoverBg: lightMode ? "rgba(35,42,53,0.05)" : "rgba(240,244,255,0.05)",
    toggleBg: lightMode ? "#E5E7EB" : "#334155",
    toggleHandle: lightMode ? "#4B5563" : "#E50914",
  };

  const accountItems = [
    { path: `/user/${currentUser?.username}`, icon: "👤", label: "My Profile" },
    { path: "/my-settings", icon: "⚙️", label: "Settings" },
  ];

  const sidebarStyle = {
    width: isSmallMobile
      ? "85%"
      : isMobile
      ? "80%"
      : isTablet
      ? "250px"
      : "285px",
    maxWidth: isSmallMobile ? "260px" : isMobile ? "280px" : "none",
    height: isSmallMobile ? "calc(100vh - 80px)" : "100vh",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: openSidebar
      ? "0"
      : isSmallMobile
      ? "-85%"
      : isMobile
      ? "-80%"
      : isTablet
      ? "-260px"
      : "-320px",
    background: theme.background,
    boxShadow: `8px 0 24px ${
      lightMode ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.3)"
    }`,
    marginTop: isSmallMobile ? "40px" : "44.3px",
    zIndex: "100",
    transition: "all 0.3s linear",
    borderRight: `1px solid ${theme.divider}`,
  };

  const menuContainerStyle = {
    overflowY: "auto",
    height: "calc(100vh - 55px)",
    padding: isSmallMobile ? "8px 0" : isMobile ? "10px 0" : "16px 0",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.accent} ${theme.background}`,
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
  };

  async function handleUserLogout() {
    dispatch(handleLogout());
    localStorage.removeItem("auth_token");
    window.location.reload();
  }

  const handleCloseSidebar = () => {
    setTimeout(() => {
      setOpenSidebar(false);
    }, 30);
  };

  const closeSidebar = useCallback(
    (e) => {
      if (
        (sideRef.current &&
          !sideRef.current.contains(e.target) &&
          !sidebarRef?.current?.contains(e.target)) ||
        e.key === "Escape"
      ) {
        setOpenSidebar(false);
      }
    },
    [setOpenSidebar, sidebarRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);
    document.addEventListener("keydown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeSidebar);
      document.removeEventListener("keydown", closeSidebar);
    };
  }, [closeSidebar]);

  const NavLinkItem = ({ path, icon, label }) => (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        padding: isSmallMobile
          ? "10px 16px"
          : isMobile
          ? "12px 18px"
          : isTablet
          ? "12px 24px"
          : "14px 28px",
        margin: isSmallMobile ? "0 4px" : isMobile ? "0 6px" : "0 8px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s linear",
        fontSize: isSmallMobile
          ? "12px"
          : isMobile
          ? "13px"
          : isTablet
          ? "14px"
          : "15px",
        textDecoration: "none",
        fontWeight: "500",
        background: isActive ? "rgba(229, 9, 20, 0.1)" : "transparent",
        color: isActive ? theme.accent : theme.text,
        ":hover": {
          background: theme.hoverBg,
          transform: "translateX(4px)",
        },
      })}
      onClick={handleCloseSidebar}
    >
      {({ isActive }) => (
        <>
          <span
            style={{
              marginRight: isSmallMobile ? "10px" : isMobile ? "12px" : "16px",
              fontSize: isSmallMobile
                ? "15px"
                : isMobile
                ? "16px"
                : isTablet
                ? "18px"
                : "20px",
              color: isActive ? theme.accent : theme.text,
            }}
          >
            {icon}
          </span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );

  NavLinkItem.propTypes = {
    path: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <AnimatePresence>
      {openSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "linear" }}
          style={overlayStyle(openSidebar, theme)}
        >
          <motion.div
            ref={sideRef}
            initial={{
              x: isSmallMobile
                ? -280
                : isMobile
                ? -280
                : isTablet
                ? -260
                : -320,
            }}
            animate={{ x: 0 }}
            exit={{
              x: isSmallMobile
                ? -280
                : isMobile
                ? -280
                : isTablet
                ? -260
                : -320,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={sidebarStyle}
          >
            <div style={menuContainerStyle} ref={menuContainerRef}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: isSmallMobile
                    ? "10px 16px"
                    : isMobile
                    ? "12px 18px"
                    : isTablet
                    ? "12px 24px"
                    : "14px 24px",
                  margin: isSmallMobile
                    ? "10px 10px 6px 10px"
                    : isMobile
                    ? "12px 12px 6px 12px"
                    : "16px 16px 8px 16px",
                  background: theme.hoverBg,
                  borderRadius: "12px",
                  border: `1px solid ${theme.divider}`,
                  cursor: "pointer",
                  marginBottom: isSmallMobile
                    ? "16px"
                    : isMobile
                    ? "20px"
                    : "30px",
                }}
                onClick={() => dispatch(toggleMode())}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      marginRight: isSmallMobile
                        ? "8px"
                        : isMobile
                        ? "10px"
                        : "12px",
                      fontSize: isSmallMobile
                        ? "16px"
                        : isMobile
                        ? "18px"
                        : isTablet
                        ? "20px"
                        : "22px",
                      color: theme.accent,
                    }}
                  >
                    {lightMode ? "☀️" : "🌙"}
                  </span>
                  <span
                    style={{
                      color: theme.text,
                      fontWeight: "500",
                      fontSize: isSmallMobile
                        ? "12px"
                        : isMobile
                        ? "13px"
                        : isTablet
                        ? "14px"
                        : "inherit",
                    }}
                  >
                    {lightMode ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
                <div
                  style={{
                    width: isSmallMobile
                      ? "34px"
                      : isMobile
                      ? "36px"
                      : isTablet
                      ? "40px"
                      : "44px",
                    height: isSmallMobile ? "18px" : isMobile ? "20px" : "24px",
                    borderRadius: "12px",
                    background: theme.toggleBg,
                    position: "relative",
                  }}
                >
                  <motion.div
                    animate={{
                      x: lightMode
                        ? isSmallMobile
                          ? "14px"
                          : isMobile
                          ? "16px"
                          : isTablet
                          ? "18px"
                          : "22px"
                        : "2px",
                      backgroundColor: theme.toggleHandle,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      width: isSmallMobile
                        ? "14px"
                        : isMobile
                        ? "16px"
                        : "20px",
                      height: isSmallMobile
                        ? "14px"
                        : isMobile
                        ? "16px"
                        : "20px",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                    }}
                  ></motion.div>
                </div>
              </motion.div>

              <div
                style={{
                  padding: isSmallMobile
                    ? "4px 16px 10px 16px"
                    : isMobile
                    ? "6px 18px 12px 18px"
                    : isTablet
                    ? "6px 24px 14px 24px"
                    : "8px 24px 16px 24px",
                }}
              >
                <h3
                  style={{
                    fontSize: isSmallMobile
                      ? "10px"
                      : isMobile
                      ? "11px"
                      : "12px",
                    fontWeight: "600",
                    color: theme.text,
                    opacity: 0.7,
                    marginBottom: isSmallMobile ? "10px" : "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Navigation
                </h3>
                <div
                  style={{
                    height: "1px",
                    background: theme.divider,
                    borderRadius: "2px",
                  }}
                ></div>
              </div>

              {navigationItems.map((item) => (
                <NavLinkItem key={item.path} {...item} />
              ))}

              {isLoggedIn && (
                <>
                  <div
                    style={{
                      padding: isSmallMobile
                        ? "12px 16px 10px 16px"
                        : isMobile
                        ? "16px 18px 12px 18px"
                        : isTablet
                        ? "20px 24px 14px 24px"
                        : "24px 24px 16px 24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isSmallMobile
                          ? "10px"
                          : isMobile
                          ? "11px"
                          : "12px",
                        fontWeight: "600",
                        color: theme.text,
                        opacity: 0.7,
                        marginBottom: isSmallMobile ? "10px" : "12px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Your Library
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        background: theme.divider,
                        borderRadius: "2px",
                      }}
                    ></div>
                  </div>

                  {libraryItems.map((item) => (
                    <NavLinkItem key={item.path} {...item} />
                  ))}
                </>
              )}

              {isLoggedIn && (
                <>
                  <div
                    style={{
                      padding: isSmallMobile
                        ? "12px 16px 10px 16px"
                        : isMobile
                        ? "16px 18px 12px 18px"
                        : isTablet
                        ? "20px 24px 14px 24px"
                        : "24px 24px 16px 24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isSmallMobile
                          ? "10px"
                          : isMobile
                          ? "11px"
                          : "12px",
                        fontWeight: "600",
                        color: theme.text,
                        opacity: 0.7,
                        marginBottom: isSmallMobile ? "10px" : "12px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Account
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        background: theme.divider,
                        borderRadius: "2px",
                      }}
                    ></div>
                  </div>

                  {accountItems.map((item) => (
                    <NavLinkItem key={item.path} {...item} />
                  ))}

                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: isSmallMobile
                        ? "10px 16px"
                        : isMobile
                        ? "12px 18px"
                        : isTablet
                        ? "12px 24px"
                        : "14px 28px",
                      margin: isSmallMobile
                        ? "0 4px"
                        : isMobile
                        ? "0 6px"
                        : "0 8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s linear",
                      fontSize: isSmallMobile
                        ? "12px"
                        : isMobile
                        ? "13px"
                        : isTablet
                        ? "14px"
                        : "15px",
                      textDecoration: "none",
                      fontWeight: "500",
                      background: "transparent",
                      color: theme.text,
                      border: "none",
                      width: "calc(100% - 16px)",
                      textAlign: "left",
                      ":hover": {
                        background: theme.hoverBg,
                        transform: "translateX(4px)",
                      },
                    }}
                    onClick={handleUserLogout}
                  >
                    <span
                      style={{
                        marginRight: isSmallMobile
                          ? "10px"
                          : isMobile
                          ? "12px"
                          : "16px",
                        fontSize: isSmallMobile
                          ? "15px"
                          : isMobile
                          ? "16px"
                          : isTablet
                          ? "18px"
                          : "20px",
                        color: theme.text,
                      }}
                    >
                      🚪
                    </span>
                    <span>Logout</span>
                  </button>
                </>
              )}

              <div
                style={{
                  padding: isSmallMobile
                    ? "12px 16px 10px 16px"
                    : isMobile
                    ? "16px 18px 12px 18px"
                    : isTablet
                    ? "20px 24px 14px 24px"
                    : "24px 24px 16px 24px",
                }}
              >
                <h3
                  style={{
                    fontSize: isSmallMobile
                      ? "10px"
                      : isMobile
                      ? "11px"
                      : "12px",
                    fontWeight: "600",
                    color: theme.text,
                    opacity: 0.7,
                    marginBottom: isSmallMobile ? "10px" : "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  About & Legal
                </h3>
                <div
                  style={{
                    height: "1px",
                    background: theme.divider,
                    borderRadius: "2px",
                  }}
                ></div>
              </div>

              {aboutLegalItems.map((item) => (
                <NavLinkItem key={item.path} {...item} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const navigationItems = [
  { path: "/", icon: "🏠", label: "Home" },
  { path: "/trending-movies", icon: "🔥", label: "Trending" },
  { path: "/in-theatres", icon: "🆕", label: "New Releases" },
  { path: "/upcoming-movies", icon: "📅", label: "Upcoming" },
  { path: "/top-rated-movies", icon: "⭐", label: "Top Rated" },
  { path: "/recommended-movies", icon: "✅", label: "Recommended" },
];

const libraryItems = [
  { path: "/watchlist", icon: "📌", label: "Watchlist" },
  { path: "/favorites", icon: "❤️", label: "Favorites" },
];

const aboutLegalItems = [
  { path: "/about", icon: "ℹ️", label: "About Mad4Movies" },
  { path: "/blog", icon: "📝", label: "Blog" },
  { path: "/privacy-policy", icon: "🔒", label: "Privacy Policy" },
  { path: "/cookie-policy", icon: "🍪", label: "Cookie Policy" },
  { path: "/terms", icon: "📜", label: "Terms of Service" },
  { path: "/contact", icon: "📧", label: "Contact Us" },
];

const overlayStyle = (openSidebar) => ({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  background: openSidebar ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
  backdropFilter: openSidebar ? "blur(0.7px)" : "none",
  zIndex: "100",
  transition: "background 0.3s linear, backdrop-filter 0.3s linear",
  pointerEvents: openSidebar ? "auto" : "none",
});

Sidebar.propTypes = {
  setOpenSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.bool.isRequired,
  sidebarRef: PropTypes.shape({ current: PropTypes.any }),
};

export default Sidebar;
