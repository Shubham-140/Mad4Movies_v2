import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

function SidebarButton() {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef();
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  function handleSidebar() {
    setOpenSidebar((prev) => !prev);
  }

  const buttonStyles = {
    cursor: "pointer",
    background: "none",
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: "1001",
    transition: "all 0.3s ease",
    transform: openSidebar ? "rotate(90deg)" : "rotate(0deg)",
    marginLeft: isMobile ? "-2px" : isTablet ? "-1px" : "0",
    margin: 0, 
    padding: isMobile
      ? "5px 6px 5px 2px"
      : isTablet
      ? "6px 7px 6px 3px"
      : "7px 8px 7px 4px",
      top: openSidebar ? "3px" : "2px", 
  };

  const lineStyles = {
    width: isMobile ? "16px" : isTablet ? "18px" : "20px",
    height: "1.5px",
    backgroundColor: lightMode ? "#121212" : "#ffffff",
    margin: "2.5px 0",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        position: "relative",
        margin: 0, 
        padding: 0, 
      }}
    >
      <button
        style={buttonStyles}
        onClick={handleSidebar}
        ref={sidebarRef}
        aria-label="Toggle sidebar"
      >
        <div
          style={{
            ...lineStyles,
            transform: openSidebar
              ? "rotate(45deg) translate(6px, 3px)"
              : "none",
          }}
        />
        <div
          style={{
            ...lineStyles,
            opacity: openSidebar ? "0" : "1",
          }}
        />
        <div
          style={{
            ...lineStyles,
            transform: openSidebar
              ? "rotate(-45deg) translate(6px, -3px)"
              : "none",
          }}
        />
      </button>

      {openSidebar && (
        <Sidebar
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
          sidebarRef={sidebarRef}
        />
      )}
    </div>
  );
}

export default SidebarButton;
