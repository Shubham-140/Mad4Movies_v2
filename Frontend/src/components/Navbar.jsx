import { useSelector } from "react-redux";
import Login from "./Login";
import SignUp from "./Signup";
import LogoAndTitle from "./LogoAndTitle";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LoginIcon from "./LoginIcon";
import SidebarButton from "./SidebarButton";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const loginWindow = useSelector((state) => state.auth.loginWindow);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const setSignupWindow = useSelector((state) => state.auth.signupWindow);
  const userMenuSelected = useSelector((state) => state.auth.userMenuSelected);
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  if (isMobile) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "3px 12px",
            backgroundColor: lightMode ? "#f8faff" : "#1a2232",
            color: lightMode ? "#232A35" : "#ffffff",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
            position: "sticky",
            top: "0",
            borderBottom: lightMode
              ? "1px solid rgba(0,0,0,0.04)"
              : "1px solid rgba(255,255,255,0.04)",
            zIndex: "100",
            height: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: "0 0 auto",
              gap: "8px",
              marginLeft: "0",
            }}
          >
            <SidebarButton />
            <LogoAndTitle />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginRight: "0",
            }}
          >
            <SearchBar />
            {!isLoggedIn ? <LoginButton /> : <LoginIcon />}
          </div>
        </div>

        {userMenuSelected && <ProfileMenu />}
        <div>{loginWindow && <Login />}</div>
        <div>{setSignupWindow && <SignUp />}</div>
      </>
    );
  }

  const sidePadding = isTablet ? "10px" : "14px";
  const buttonToLogoGap = isTablet ? "6px" : "8px";
  const navbarHeight = isTablet ? "35px" : "42px";
  const searchBarWidth = isTablet ? "60%" : "65%"; 

  return (
    <>
     <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${sidePadding}`,
        backgroundColor: lightMode ? "#f8faff" : "#1a2232",
        height: navbarHeight,
        position: "sticky", 
        top: "0", 
        zIndex: 100, 
        boxSizing: "border-box",
        width: "100%", 
      }}
    >
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            gap: buttonToLogoGap,
            zIndex: 2,
            margin: 0,
            padding: 0,
          }}
        >
          <SidebarButton isTablet={isTablet} heightReduced={true} />
          <LogoAndTitle isTablet={isTablet} heightReduced={true} />
        </div>

        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
            padding: `0 ${sidePadding}`,
            maxWidth: searchBarWidth,
            zIndex: 1,
            margin: 0,
          }}
        >
          <SearchBar isTablet={isTablet} />
        </div>

        <div
          style={{
            flex: "0 0 auto",
            zIndex: 2,
            margin: 0,
            padding: 0,
          }}
        >
          {!isLoggedIn ? (
            <LoginButton isTablet={isTablet} heightReduced={true} />
          ) : (
            <LoginIcon isTablet={isTablet} heightReduced={true} />
          )}
        </div>
      </div>

      {userMenuSelected && <ProfileMenu />}
      <div>{loginWindow && <Login />}</div>
      <div>{setSignupWindow && <SignUp />}</div>
    </>
  );
};

export default Navbar;