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
      dispatch(loadAllFavorites(currentUser.favorites));
      dispatch(loadAllWatchList(currentUser.watchList));
      dispatch(loadAllWatched(currentUser.watched));
    }, [currentUser, dispatch]);

  useEffect(() => {
  const fetchUserData = (token, needsParsing = false) => {
    const parsedToken = needsParsing ? JSON.parse(token) : token;
    
    fetch("https://mad4movies.onrender.com/auth/me", {
      headers: { Authorization: `Bearer ${parsedToken}` }
    })
      .then(res => res.json())
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

  // useEffect(() => {
  //   if (!userId || !ratingHydrated || ratings === null) return;

  //   async function syncUserDocument() {
  //     try {
  //       const existing = await getUserDocument(
  //         import.meta.env.VITE_USERRATINGS_COLLECTION_ID,
  //         userId
  //       );
  //       const ratingsString = JSON.stringify(ratings);

  //       if (existing) {
  //         const updated = await updateDocument(
  //           import.meta.env.VITE_USERRATINGS_COLLECTION_ID,
  //           existing.$id,
  //           { ratings: ratingsString }
  //         );
  //         console.log("Document updated", updated);
  //       } else {
  //         const created = await createDocument(
  //           userId,
  //           { ratings: ratingsString },
  //           import.meta.env.VITE_USERRATINGS_COLLECTION_ID
  //         );
  //         console.log("Document created", created);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   syncUserDocument();
  // }, [ratings, userId, ratingHydrated]);

  // useEffect(() => {
  //   if (!userId) return;

  //   async function fetchUserDocument() {
  //     try {
  //       const existing = await getUserDocument(
  //         import.meta.env.VITE_USERRATINGS_COLLECTION_ID,
  //         userId
  //       );

  //       if (existing?.ratings) {
  //         const parsed = JSON.parse(existing.ratings);
  //         dispatch(setIndividualRatingToDB(parsed));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       dispatch(setRatingratingHydrated(true));
  //     }
  //   }

  //   fetchUserDocument();
  // }, [userId, dispatch]);

  // useEffect(() => {
  //   if (!userId) return;

  //   async function fetchUserDocument() {
  //     try {
  //       const doc = await getUserDocument(
  //         import.meta.env.VITE_USERMOVIES_COLLECTION_ID,
  //         userId
  //       );

  //       if (
  //         doc?.favorites &&
  //         doc?.watched &&
  //         doc?.userRatings &&
  //         doc?.watchList &&
  //         doc?.recentlyViewed
  //       ) {
  //         dispatch(setFavMoviesToDB(doc.favorites));
  //         dispatch(setWatchedMoviesToDB(doc.watched));
  //         dispatch(setRatingsToDB(doc.userRatings));
  //         dispatch(setWatchLaterMoviesToDB(doc.watchList));
  //         dispatch(setRecentlyViewedToDB(doc.recentlyViewed));
  //       } else {
  //         dispatch(setFavMoviesToDB([]));
  //         dispatch(setWatchedMoviesToDB([]));
  //         dispatch(setRatingsToDB([]));
  //         dispatch(setWatchLaterMoviesToDB([]));
  //         dispatch(setRecentlyViewedToDB([]));
  //       }
  //     } catch {
  //       console.log("");
  //     } finally {
  //       dispatch(setMovieDetailsHydated(true));
  //     }
  //   }

  //   fetchUserDocument();
  // }, [userId, dispatch]);

  // useEffect(() => {
  //   if (
  //     !userId ||
  //     !movieDetailsHydrated ||
  //     favorites === null ||
  //     watched === null ||
  //     userRatings === null ||
  //     watchList === null ||
  //     recentlyViewed === null
  //   )
  //     return;

  //   async function syncUserDocument() {
  //     try {
  //       const doc = await getUserDocument(
  //         import.meta.env.VITE_USERMOVIES_COLLECTION_ID,
  //         userId
  //       );

  //       if (!doc) {
  //         await createDocument(
  //           userId,
  //           {
  //             favorites,
  //             watched,
  //             userRatings,
  //             watchList,
  //             recentlyViewed,
  //             userId,
  //           },
  //           import.meta.env.VITE_USERMOVIES_COLLECTION_ID
  //         );
  //       } else {
  //         await updateDocument(
  //           import.meta.env.VITE_USERMOVIES_COLLECTION_ID,
  //           doc.$id,
  //           {
  //             favorites,
  //             watched,
  //             userRatings,
  //             watchList,
  //             recentlyViewed,
  //             userId,
  //           }
  //         );
  //       }
  //     } catch {
  //       console.log("");
  //     }
  //   }

  //   syncUserDocument();
  // }, [
  //   userId,
  //   movieDetailsHydrated,
  //   favorites,
  //   watched,
  //   userRatings,
  //   watchList,
  //   recentlyViewed,
  // ]);

  // useEffect(() => {
  //   if (
  //     !userId ||
  //     typeof userId !== "string" ||
  //     userId.trim() === "" ||
  //     age === null
  //   ) {
  //     console.log("syncUserDocument skipped: userId or age is missing");
  //     return;
  //   }

  //   async function syncUserDocument() {
  //     try {
  //       const existing = await getUserDocument(
  //         import.meta.env.VITE_USERDETAILS_COLLECTION_ID,
  //         userId
  //       );

  //       if (existing) {
  //         const updated = await updateDocument(
  //           import.meta.env.VITE_USERDETAILS_COLLECTION_ID,
  //           existing.$id,
  //           {
  //             age: Number(age),
  //             gender,
  //             country,
  //             prefferedLanguage,
  //             favMovie,
  //             favArtist,
  //             favCharacter,
  //             lightMode,
  //             desc,
  //           }
  //         );
  //         console.log("Document updated", updated);
  //       } else {
  //         console.log("Creating document for userId:", userId);
  //         const created = await createDocument(
  //           userId,
  //           {
  //             age: Number(age),
  //             gender,
  //             country,
  //             prefferedLanguage,
  //             favMovie,
  //             favArtist,
  //             favCharacter,
  //             lightMode,
  //             desc,
  //           },
  //           import.meta.env.VITE_USERDETAILS_COLLECTION_ID
  //         );
  //         console.log("Document created", created);
  //       }
  //     } catch (error) {
  //       console.error("some error occurred", error);
  //     }
  //   }

  //   syncUserDocument();
  // }, [
  //   age,
  //   userId,
  //   country,
  //   gender,
  //   prefferedLanguage,
  //   favMovie,
  //   favArtist,
  //   favCharacter,
  //   lightMode,
  //   desc,
  // ]);

  // useEffect(() => {
  //   if (!userId || typeof userId !== "string" || userId.trim() === "") {
  //     console.log("fetchUserDocument skipped: userId is missing");
  //     return;
  //   }

  //   async function fetchUserDocument() {
  //     try {
  //       const doc = await getUserDocument(
  //         import.meta.env.VITE_USERDETAILS_COLLECTION_ID,
  //         userId
  //       );
  //       if (doc) {
  //         console.log("Fetched user document", doc);
  //         dispatch(setAge(doc.age));
  //         dispatch(setGender(doc.gender));
  //         dispatch(setCountry(doc.country));
  //         dispatch(setPrefferedLanguage(doc.prefferedLanguage));
  //         dispatch(setFavMovie(doc.favMovie));
  //         dispatch(setFavCharacter(doc.favCharacter));
  //         dispatch(setFavArtist(doc.favArtist));
  //         dispatch(setMode(doc.lightMode));
  //         dispatch(setDesc(doc.desc));
  //         setIsThemeDetermined(true);
  //       } else {
  //         setIsThemeDetermined(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user document", error);
  //       setIsThemeDetermined(true);
  //     }
  //   }

  //   fetchUserDocument();
  // }, [userId, dispatch]);

  useEffect(() => {
    if (location.pathname.startsWith("/movies/genre/")) {
      dispatch(setShowGenre(false));
    } else {
      dispatch(setShowGenre(true));
    }
  });

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       if (currentUser) {
  //         dispatch(setIsLoggedIn(true));
  //         dispatch(setName(currentUser.name));
  //         dispatch(setUserId(currentUser.$id));
  //         dispatch(setJoinedOn(currentUser.$createdAt.slice(0, 10)));
  //         console.log(currentUser);
  //       }
  //     } catch {
  //       dispatch(setIsLoggedIn(false));
  //     }
  //   };

  //   checkUser();
  // }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById("main")
        ?.scrollIntoView({ top: -10, behavior: "instant" });
    }, 0);
  }, [location]);

  // if (!isThemeDetermined) {
  //   return (
  //     <div
  //       style={{
  //         width: "100vw",
  //         height: "100vh",
  //         backgroundColor: "#f0f4ff", // Default to light theme background
  //       }}
  //     />
  //   );
  // }

  return (
    <>
      <div
        id="main"
        style={{ backgroundColor: lightMode ? "#f0f4ff" : "#232A35" }}
      >
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
