import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const [list, setList] = useState([]);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [favList, setFavList] = useState([]);
  const watchList = useSelector((state) => state.movieDetails.watchList);
  const favorites = useSelector((state) => state.movieDetails.favorites);
  const watched = useSelector((state) => state.movieDetails.watched);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { username } = useParams();

  useEffect(() => {
    fetch(`https://mad4movies.onrender.com/user/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setCurrentUser(data);
        setIsLoading(false);
      });
  }, [username]);

  const bgColor = lightMode ? "#f0f4ff" : "#232A35";
  const cardBgColor = lightMode ? "#ffffff" : "#3a4659";
  const textColor = lightMode ? "#232A35" : "#f3f4f6";
  const secondaryTextColor = lightMode ? "#6b7280" : "#9ca3af";

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (!ratings) {
  //     return;
  //   }
  //   const values = Object.values(ratings);
  //   let sum = 0;
  //   for (let i = 0; i < values.length; i++) {
  //     sum += values[i];
  //   }
  //   setUserRatingSum(sum);
  // }, [ratings]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (currentUser?.age !== null) return;
  }, [currentUser?.age]);

  useEffect(() => {
    if (currentUser?.username !== "") return;
  }, [currentUser?.username]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const result = await Promise.all(
          watchList
            .slice(0, 10)
            ?.map((id) =>
              fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${
                  import.meta.env.VITE_TMDB_API_KEY
                }`
              ).then((response) => response.json())
            )
        );
        setList(result);
      } catch {
        console.log("");
      }
    }
    if (watchList.length > 0) fetchDetails();
  }, [watchList]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const result = await Promise.all(
          favorites
            .slice(0, 10)
            ?.map((id) =>
              fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${
                  import.meta.env.VITE_TMDB_API_KEY
                }`
              ).then((response) => response.json())
            )
        );
        setFavList(result);
      } catch {
        console.log("");
      }
    }
    if (favorites.length > 0) fetchDetails();
  }, [favorites]);

  const LoadingDots = () => {
    return (
      <span
        style={{ display: "inline-flex", alignItems: "center", height: "1em" }}
      >
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: secondaryTextColor,
              margin: "0 2px",
              animation: "bounce 1s infinite ease-in-out",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </span>
    );
  };

  const LoadingDesc = () => {
    return (
      <div
        style={{
          height: "60px",
          backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
          borderRadius: "6px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${
              lightMode ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"
            }, transparent)`,
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
    );
  };

  const mobileStyles = {
    container: {
      backgroundColor: bgColor,
      minHeight: "100vh",
      padding: "20px",
      color: textColor,
      maxWidth: "1490px",
      margin: "0 auto",
    },
    profileHeader: {
      backgroundColor: cardBgColor,
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
      position: "relative",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    avatarContainer: {
      flexShrink: 0,
      position: "relative",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `4px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    profileInfo: {
      flex: 1,
      width: "auto",
    },
    profileName: {
      fontSize:
        window.innerWidth < 320
          ? "14px"
          : window.innerWidth < 480
          ? "16px"
          : "17.5px",
      fontWeight: "700",
      margin: "0 0 10px 0",
      letterSpacing: "0.5px",
      minHeight: "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "30px",
      left: "100px",
    },
    joinDate: {
      color: secondaryTextColor,
      fontSize:
        window.innerWidth < 320
          ? "11px"
          : window.innerWidth < 480
          ? "12px"
          : "13px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      minHeight: "20px",
      justifyContent: "center",
      position: "absolute",
      left: "100px",
      top: "70px",
    },
    bio: {
      backgroundColor: lightMode ? "#f0f4ff" : "#4a5568",
      padding: "15px",
      borderRadius: "12px",
      borderLeft: `4px solid ${lightMode ? "#3b82f6" : "#60a5fa"}`,
      color: textColor,
      lineHeight: "1.6",
      width: "100%",
      maxWidth: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
      minWidth: "100%",
      marginTop: "5px",
      textAlign: "left",
    },
    bioText: {
      margin: 0,
      display: "-webkit-box",
      WebkitLineClamp: showMore ? "none" : 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },
    showMoreButton: {
      background: "none",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "10px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginBottom: "30px",
    },
    infoCard: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      margin: "0 0 15px 0",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    infoItemGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
    },
    infoItem: {
      marginBottom: "12px",
    },
    infoLabel: {
      fontSize: "13px",
      fontWeight: "500",
      color: secondaryTextColor,
      marginBottom: "5px",
    },
    infoValue: {
      fontSize: "15px",
      fontWeight: "500",
      minHeight: "24px",
      display: "flex",
      alignItems: "center",
      marginTop: "-5px",
    },
    achievements: {
      backgroundColor: cardBgColor,
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    achievementsGrid: {
      display: "flex",
      gap: "15px",
      overflowX: "auto",
      padding: "10px 0",
    },
    achievementCard: {
      flexShrink: 0,
      width: "120px",
      textAlign: "center",
      padding: "12px",
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    achievementIcon: {
      fontSize: "30px",
      marginBottom: "8px",
    },
    achievementTitle: {
      fontSize: "13px",
      fontWeight: "600",
      margin: "5px 0",
    },
    achievementDesc: {
      fontSize: "11px",
      color: secondaryTextColor,
      margin: "0",
    },
    movieSection: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      marginBottom: "15px",
      position: "relative",
    },
    viewAllButton: {
      backgroundColor: "transparent",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: "4px 0",
      fontSize: "13px",
      whiteSpace: "nowrap",
      position: "absolute",
      top: "-1px",
      right: "0px",
      zIndex: "1000",
    },
    moviesGrid: {
      display: "flex",
      overflowX: "auto",
      gap: "35px",
    },
    emptyState: {
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "30px",
      color: secondaryTextColor,
      marginBottom: "10px",
    },
    emptyText: {
      color: secondaryTextColor,
      margin: "0",
      fontSize: "14px",
    },
    editButton: {
      position: "absolute",
      top: "15px",
      right: "15px",
      backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
      border: `1px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      color: textColor,
      cursor: "pointer",
      padding: "8px",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    },
  };

  const tabletStyles = {
    container: {
      backgroundColor: bgColor,
      minHeight: "100vh",
      padding: "clamp(25px, 2.5vw, 32px)",
      color: textColor,
      maxWidth: "1490px",
      margin: "0 auto",
    },
    profileHeader: {
      backgroundColor: cardBgColor,
      padding: "clamp(24px, 2.5vw, 32px)",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "clamp(24px, 2.5vw, 30px)",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "clamp(20px, 2.5vw, 28px)",
      position: "relative",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    avatarContainer: {
      flexShrink: 0,
      position: "relative",
    },
    avatar: {
      width: "clamp(96px, 8vw, 128px)",
      height: "clamp(96px, 8vw, 128px)",
      borderRadius: "50%",
      objectFit: "cover",
      border: `4px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    profileInfo: {
      flex: 1,
      width: "auto",
      textAlign: "left",
    },
    profileName: {
      fontSize: "clamp(22px, 2.5vw, 26px)",
      fontWeight: "700",
      margin: "0 0 clamp(8px, 2vw, 10px) 0",
      letterSpacing: "0.5px",
      minHeight: "clamp(30px, 4vw, 34px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    joinDate: {
      color: secondaryTextColor,
      fontSize: "clamp(11px, 1.8vw, 13px)",
      marginBottom: "clamp(20px, 2.5vw, 24px)",
      display: "flex",
      alignItems: "center",
      gap: "clamp(4px, 1vw, 5px)",
      minHeight: "clamp(16px, 2vw, 20px)",
      justifyContent: "flex-start",
    },
    bio: {
      backgroundColor: lightMode ? "#f0f4ff" : "#4a5568",
      padding: "clamp(16px, 2vw, 20px)",
      borderRadius: "12px",
      borderLeft: `4px solid ${lightMode ? "#3b82f6" : "#60a5fa"}`,
      color: textColor,
      lineHeight: "1.6",
      width: "auto",
      maxWidth: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
      textAlign: "left",
    },
    bioText: {
      margin: 0,
      display: "-webkit-box",
      WebkitLineClamp: showMore ? "none" : 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },
    showMoreButton: {
      background: "none",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontSize: "clamp(11px, 1.8vw, 13px)",
      cursor: "pointer",
      marginTop: "clamp(8px, 2vw, 10px)",
      display: "none",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "clamp(24px, 2.5vw, 32px)",
      marginBottom: "clamp(24px, 2.5vw, 30px)",
    },
    infoCard: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "clamp(20px, 2.5vw, 24px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionTitle: {
      fontSize: "clamp(16px, 2vw, 19px)",
      fontWeight: "600",
      margin: "0 0 clamp(12px, 2vw, 15px) 0",
      display: "flex",
      alignItems: "center",
      gap: "clamp(8px, 1.5vw, 10px)",
    },
    infoItemGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "clamp(12px, 2vw, 15px)",
    },
    infoItem: {
      marginBottom: "clamp(10px, 2vw, 12px)",
    },
    infoLabel: {
      fontSize: "clamp(11px, 1.8vw, 13px)",
      fontWeight: "500",
      color: secondaryTextColor,
      marginBottom: "clamp(4px, 1vw, 5px)",
    },
    infoValue: {
      fontSize: "clamp(13px, 1.8vw, 15px)",
      fontWeight: "500",
      minHeight: "clamp(20px, 2vw, 24px)",
      display: "flex",
      alignItems: "center",
    },
    achievements: {
      backgroundColor: cardBgColor,
      padding: "clamp(20px, 2.5vw, 24px)",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "clamp(24px, 2.5vw, 30px)",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    achievementsGrid: {
      display: "flex",
      gap: "clamp(16px, 2vw, 24px)",
      overflowX: "auto",
      padding: "clamp(12px, 2vw, 16px) 0",
    },
    achievementCard: {
      flexShrink: 0,
      width: "clamp(112px, 10vw, 128px)",
      textAlign: "center",
      padding: "clamp(12px, 2vw, 16px)",
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    achievementIcon: {
      fontSize: "clamp(29px, 3vw, 32px)",
      marginBottom: "clamp(6px, 1.5vw, 8px)",
    },
    achievementTitle: {
      fontSize: "clamp(11px, 1.8vw, 13px)",
      fontWeight: "600",
      margin: "clamp(4px, 1vw, 5px) 0",
    },
    achievementDesc: {
      fontSize: "clamp(10px, 1.8vw, 11px)",
      color: secondaryTextColor,
      margin: "0",
    },
    movieSection: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "clamp(20px, 2.5vw, 24px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "clamp(24px, 2.5vw, 30px)",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionHeader: {
      display: "flex",
      flexDirection: "row",
      gap: "0",
      marginBottom: "clamp(20px, 2.5vw, 24px)",
      justifyContent: "space-between",
      alignItems: "center",
      position: "static",
    },
    viewAllButton: {
      backgroundColor: "transparent",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "clamp(4px, 1vw, 5px)",
      padding: "clamp(8px, 2vw, 10px) 0",
      fontSize: "clamp(11px, 1.8vw, 13px)",
      alignSelf: "auto",
      position: "static",
      top: "auto",
      right: "auto",
      zIndex: "auto",
    },
    moviesGrid: {
      display: "flex",
      overflowX: "auto",
      gap: "45px",
    },
    emptyState: {
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      padding: "clamp(24px, 2.5vw, 32px)",
      borderRadius: "12px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "clamp(29px, 3vw, 32px)",
      color: secondaryTextColor,
      marginBottom: "clamp(12px, 2vw, 16px)",
    },
    emptyText: {
      color: secondaryTextColor,
      margin: "0",
      fontSize: "clamp(13px, 1.8vw, 15px)",
    },
    editButton: {
      position: "absolute",
      top: "clamp(16px, 2vw, 20px)",
      right: "clamp(16px, 2vw, 20px)",
      backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
      border: `1px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      color: textColor,
      cursor: "pointer",
      padding: "clamp(8px, 1.5vw, 10px)",
      borderRadius: "50%",
      width: "clamp(32px, 4vw, 40px)",
      height: "clamp(32px, 4vw, 40px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    },
  };

  const desktopStyles = {
    container: {
      backgroundColor: bgColor,
      minHeight: "100vh",
      padding: "clamp(31px, 2vw, 40px)",
      color: textColor,
      maxWidth: "1490px",
      margin: "0 auto",
    },
    profileHeader: {
      backgroundColor: cardBgColor,
      padding: "clamp(30px, 2vw, 40px)",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: "clamp(25px, 2vw, 35px)",
      position: "relative",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    avatarContainer: {
      flexShrink: 0,
      position: "relative",
    },
    avatar: {
      width: "clamp(120px, 10vw, 160px)",
      height: "clamp(120px, 10vw, 160px)",
      borderRadius: "50%",
      objectFit: "cover",
      border: `4px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    profileInfo: {
      flex: 1,
      width: "auto",
      textAlign: "left",
    },
    profileName: {
      fontSize: "clamp(28px, 3vw, 32px)",
      fontWeight: "700",
      margin: "0 0 10px 0",
      letterSpacing: "0.5px",
      minHeight: "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    joinDate: {
      color: secondaryTextColor,
      fontSize: "clamp(14px, 1.5vw, 16px)",
      marginBottom: "clamp(25px, 2vw, 30px)",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      minHeight: "20px",
      justifyContent: "flex-start",
    },
    bio: {
      backgroundColor: lightMode ? "#f0f4ff" : "#4a5568",
      padding: "clamp(20px, 2vw, 25px)",
      borderRadius: "12px",
      borderLeft: `4px solid ${lightMode ? "#3b82f6" : "#60a5fa"}`,
      color: textColor,
      lineHeight: "1.6",
      width: "auto",
      maxWidth: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
      textAlign: "left",
    },
    bioText: {
      margin: 0,
      display: "-webkit-box",
      WebkitLineClamp: showMore ? "none" : 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },
    showMoreButton: {
      background: "none",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "10px",
      display: "none",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "clamp(30px, 2vw, 40px)",
      marginBottom: "30px",
    },
    infoCard: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "clamp(25px, 2vw, 30px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionTitle: {
      fontSize: "clamp(20px, 2vw, 24px)",
      fontWeight: "600",
      margin: "0 0 20px 0",
      display: "flex",
      alignItems: "center",
      gap: "clamp(10px, 1.5vw, 15px)",
    },
    infoItemGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "15px",
    },
    infoItem: {
      marginBottom: "clamp(15px, 2vw, 20px)",
    },
    infoLabel: {
      fontSize: "clamp(14px, 1.5vw, 15px)",
      fontWeight: "500",
      color: secondaryTextColor,
      marginBottom: "5px",
    },
    infoValue: {
      fontSize: "clamp(16px, 1.5vw, 18px)",
      fontWeight: "500",
      minHeight: "24px",
      display: "flex",
      alignItems: "center",
    },
    achievements: {
      backgroundColor: cardBgColor,
      padding: "clamp(25px, 2vw, 30px)",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    achievementsGrid: {
      display: "flex",
      gap: "clamp(20px, 2vw, 30px)",
      overflowX: "auto",
      padding: "clamp(15px, 2vw, 20px) 0",
    },
    achievementCard: {
      flexShrink: 0,
      width: "clamp(140px, 12vw, 160px)",
      textAlign: "center",
      padding: "clamp(15px, 2vw, 20px)",
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    achievementIcon: {
      fontSize: "clamp(36px, 3vw, 40px)",
      marginBottom: "clamp(10px, 1.5vw, 12px)",
    },
    achievementTitle: {
      fontSize: "clamp(14px, 1.5vw, 16px)",
      fontWeight: "600",
      margin: "5px 0",
    },
    achievementDesc: {
      fontSize: "clamp(12px, 1.5vw, 13px)",
      color: secondaryTextColor,
      margin: "0",
    },
    movieSection: {
      backgroundColor: cardBgColor,
      borderRadius: "16px",
      padding: "clamp(25px, 2vw, 30px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      border: lightMode ? "1px solid #e5e7eb" : "1px solid #4a5568",
    },
    sectionHeader: {
      display: "flex",
      flexDirection: "row",
      gap: "0",
      marginBottom: "clamp(25px, 2vw, 30px)",
      justifyContent: "space-between",
      alignItems: "center",
      position: "static",
    },
    viewAllButton: {
      backgroundColor: "transparent",
      border: "none",
      color: lightMode ? "#3b82f6" : "#60a5fa",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: "clamp(10px, 1.5vw, 12px) 0",
      fontSize: "clamp(14px, 1.5vw, 16px)",
      alignSelf: "auto",
      position: "static",
      top: "auto",
      right: "auto",
      zIndex: "auto",
    },
    moviesGrid: {
      display: "flex",
      overflowX: "auto",
      gap: "105px",
    },
    emptyState: {
      backgroundColor: lightMode ? "#f9fafb" : "#4a5568",
      padding: "clamp(30px, 2vw, 40px)",
      borderRadius: "12px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "clamp(36px, 3vw, 40px)",
      color: secondaryTextColor,
      marginBottom: "clamp(15px, 2vw, 20px)",
    },
    emptyText: {
      color: secondaryTextColor,
      margin: "0",
      fontSize: "clamp(16px, 1.5vw, 18px)",
    },
    editButton: {
      position: "absolute",
      top: "clamp(20px, 2vw, 25px)",
      right: "clamp(20px, 2vw, 25px)",
      backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
      border: `1px solid ${lightMode ? "#e5e7eb" : "#4a5568"}`,
      color: textColor,
      cursor: "pointer",
      padding: "clamp(10px, 1.5vw, 12px)",
      borderRadius: "50%",
      width: "clamp(40px, 4vw, 48px)",
      height: "clamp(40px, 4vw, 48px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    },
  };

  const styles =
    windowSize.width < 768
      ? mobileStyles
      : windowSize.width >= 768 && windowSize.width < 1024
      ? tabletStyles
      : desktopStyles;

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div style={styles.profileHeader}>
        <div style={styles.avatarContainer}>
          <img
            src={`https://dummyimage.com/150x150/000/fff.png&text=${
              isLoading ? "" : name.trim().slice(0, 1)
            }`}
            alt="User"
            style={styles.avatar}
          />
        </div>

        <div style={styles.profileInfo}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={styles.profileName}>
              {isLoading ? <LoadingDots /> : currentUser?.name || "Name"}
            </h1>
          </div>

          <p style={styles.joinDate}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Joined on{" "}
            {isLoading ? <LoadingDots /> : currentUser?.joinedOn.slice(0, 10)}
          </p>

          <div style={styles.bio}>
            {isLoading ? (
              <LoadingDesc />
            ) : currentUser?.description ? (
              <>
                <p style={styles.bioText}>{currentUser?.description}</p>
                {currentUser?.description.length > 100 && (
                  <button
                    style={styles.showMoreButton}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}
              </>
            ) : (
              <p
                style={{
                  margin: 0,
                  color: secondaryTextColor,
                  fontStyle: "italic",
                }}
              >
                No description provided
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h2 style={styles.sectionTitle}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Personal Information
          </h2>

          <div style={styles.infoItemGrid}>
            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Username</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.username || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Age</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.age || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Gender</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.gender || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Country</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.country || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Preferred Language</p>
              <p style={styles.infoValue}>
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  currentUser?.preferredLanguage || "N/A"
                )}
              </p>
            </div>
          </div>
        </div>

        <div style={styles.infoCard}>
          <h2 style={styles.sectionTitle}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="2.18"
                ry="2.18"
              ></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            Movie Preferences
          </h2>

          <div style={styles.infoItemGrid}>
            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Movies Watched</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : watched.length || 0}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Favorite Movie</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.favMovie || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Favorite Artist</p>
              <p style={styles.infoValue}>
                {isLoading ? <LoadingDots /> : currentUser?.favArtist || "N/A"}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Favorite Character</p>
              <p style={styles.infoValue}>
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  currentUser?.favCharacter || "N/A"
                )}
              </p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>Average Rating</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  <span style={styles.infoValue}>
                    {currentUser?.avgRating} ⭐
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.achievements}>
        <h2 style={styles.sectionTitle}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          Achievements
        </h2>

        {isLoading ? (
          <LoadingDots />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <p
              style={{ fontSize: "20px", color: lightMode ? "black" : "white" }}
            >
              No achievements unlocked yet!
            </p>
          </div>
        )}
      </div>

      <div style={styles.movieSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Your Watchlist
          </h2>
          <button
            style={styles.viewAllButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
            onClick={() => navigate("/watchlist")}
          >
            View All
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div style={styles.moviesGrid}>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
                  borderRadius: "8px",
                  width: "160px",
                  height: "300px",
                  minWidth: "160px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${
                      lightMode
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.1)"
                    }, transparent)`,
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>
            ))}
          </div>
        ) : list.length > 0 ? (
          <div style={styles.moviesGrid}>
            {list.map((elem, index) => (
              <div
                key={elem.id}
                style={{
                  width:
                    windowSize.width < 768
                      ? "1fr"
                      : windowSize.width < 1024
                      ? "1fr"
                      : "1fr",
                  minWidth:
                    windowSize.width < 768
                      ? "100px"
                      : windowSize.width < 1024
                      ? "120px"
                      : "150px",
                }}
              >
                <MovieCard
                  key={elem.id}
                  title={elem.title}
                  date={elem.release_date}
                  rating={elem.vote_average}
                  image={elem.poster_path}
                  index={index}
                  movies={list}
                  lightMode={lightMode}
                  isMobile={windowSize.width < 768}
                  containerWidth={windowSize.width}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={secondaryTextColor}
              strokeWidth="2"
              style={styles.emptyIcon}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <p style={styles.emptyText}>
              Your watchlist is empty. Start adding movies to see them here!
            </p>
          </div>
        )}
      </div>

      <div style={styles.movieSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Your Favorites
          </h2>
          <button
            style={styles.viewAllButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
            onClick={() => navigate("/favorites")}
          >
            View All
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div style={styles.moviesGrid}>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
                  borderRadius: "8px",
                  width: "160px",
                  height: "300px",
                  minWidth: "160px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${
                      lightMode
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.1)"
                    }, transparent)`,
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>
            ))}
          </div>
        ) : favList.length > 0 ? (
          <div style={styles.moviesGrid}>
            {favList.map((elem, index) => (
              <div
                key={elem.id}
                style={{
                  width:
                    windowSize.width < 768
                      ? "1fr"
                      : windowSize.width < 1024
                      ? "1fr"
                      : "1fr",
                  minWidth:
                    windowSize.width < 768
                      ? "100px"
                      : windowSize.width < 1024
                      ? "120px"
                      : "150px",
                }}
              >
                <MovieCard
                  key={elem.id}
                  title={elem.title}
                  date={elem.release_date}
                  rating={elem.vote_average}
                  image={elem.poster_path}
                  index={index}
                  movies={list}
                  lightMode={lightMode}
                  isMobile={windowSize.width < 768}
                  containerWidth={windowSize.width}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={secondaryTextColor}
              strokeWidth="2"
              style={styles.emptyIcon}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <p style={styles.emptyText}>
              You haven&apos;t added any favorites yet. Mark movies as favorite
              to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
