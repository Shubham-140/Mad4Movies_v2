import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllFavorites,
  loadAllWatched,
  loadAllWatchList,
  setShowGenre,
} from "./features/MovieDetailsSlice";
import { setCurrentUser, setIsLoggedIn } from "./features/AuthSlice";
import { apiUrl } from "./utils/api";
import { setMode } from "./features/ColorSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isThemeDetermined, setIsThemeDetermined] = useState(false);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
      if (!currentUser) {
        return;
      }
      dispatch(loadAllFavorites(currentUser.favorites || []));
      dispatch(loadAllWatchList(currentUser.watchList || []));
      dispatch(loadAllWatched(currentUser.watched || []));
    }, [currentUser, dispatch]);

  useEffect(() => {
  const fetchUserData = (token, needsParsing = false) => {
    const parsedToken = needsParsing ? JSON.parse(token) : token;
    
    fetch(apiUrl("/auth/me"), {
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`auth/me failed: ${res.status}`);
        }
        return res.json();
      })
      .then(user => {
        dispatch(setCurrentUser(user));
        dispatch(setIsLoggedIn(true));
      })
      .catch(() => {
        dispatch(setIsLoggedIn(false));
        localStorage.removeItem("auth_token");
      });
  };

  // 1. Check for Google OAuth redirect first
  const urlParams = new URLSearchParams(window.location.search);
  const googleToken = urlParams.get("token");

  if (googleToken) {
    localStorage.setItem("auth_token", googleToken);
    window.history.replaceState({}, "", "/");
    fetchUserData(googleToken);
  } 
  // 2. Check for existing token (works for both auth types)
  else {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Try parsing first (for manual login), fallback to raw token
      try {
        JSON.parse(token); // Test if it's a manual login token
        fetchUserData(token, true);
      } catch {
        fetchUserData(token); // Google token
      }
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }
}, [dispatch]);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setMode(savedTheme === "dark"));
      setIsThemeDetermined(true);
    }
  }, [dispatch]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (isThemeDetermined) {
      localStorage.setItem("theme", lightMode ? "dark" : "light");
    }
  }, [lightMode, isThemeDetermined]);

  useEffect(() => {
    if (location.pathname.startsWith("/movies/genre/")) {
      dispatch(setShowGenre(false));
    } else {
      dispatch(setShowGenre(true));
    }
  });

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById("main")
        ?.scrollIntoView({ top: -10, behavior: "instant" });
    }, 0);
  }, [location]);

  return (
    <>
      <div
        id="main"
        style={{ backgroundColor: lightMode ? "#f0f4ff" : "#232A35" }}
      >
        <Navbar />
        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
