import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "../services/appwriteAuth";
import { useNavigate } from "react-router-dom";
import { saveUserDetails } from "../features/AuthSlice";

const Settings = () => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [user, setUser] = useState(null);
  const [changeBasicInfo, setChangeBasicInfo] = useState(false);
  const [changeMoviePref, setChangeMoviePref] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceType, setDeviceType] = useState("desktop");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser?.name);
  const [age, setAge] = useState(currentUser?.age);
  const [gender, setGender] = useState(currentUser?.gender);
  const [country, setCountry] = useState(currentUser?.country);
  const [language, setLanguage] = useState(currentUser?.preferredLanguage);
  const [description, setDescription] = useState(currentUser?.description);
  const [favMovie, setFavMovie] = useState(currentUser?.favMovie);
  const [favArtist, setFavArtist] = useState(currentUser?.favArtist);
  const [favCharacter, setFavCharacter] = useState(currentUser?.favCharacter);

  useEffect(() => {
    console.log(name);
  }, [name]);

  if (isLoggedIn === false) {
    navigate("/");
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
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

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  useEffect(() => {
    async function fetchUser() {
      setUser(currentUser);
      setIsLoading(false);
    }
    fetchUser();
  }, [currentUser]);

  const LoadingDots = () => {
    return (
      <span
        style={{ display: "inline-flex", alignItems: "center", height: "1em" }}
      >
        <span
          style={{
            display: "inline-block",
            width: isMobile ? "4px" : "6px",
            height: isMobile ? "4px" : "6px",
            borderRadius: "50%",
            backgroundColor: lightMode ? "#6b7280" : "#9ca3af",
            margin: "0 2px",
            animation: "bounce 1s infinite ease-in-out",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: isMobile ? "4px" : "6px",
            height: isMobile ? "4px" : "6px",
            borderRadius: "50%",
            backgroundColor: lightMode ? "#6b7280" : "#9ca3af",
            margin: "0 2px",
            animation: "bounce 1s infinite ease-in-out",
            animationDelay: "0.2s",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: isMobile ? "4px" : "6px",
            height: isMobile ? "4px" : "6px",
            borderRadius: "50%",
            backgroundColor: lightMode ? "#6b7280" : "#9ca3af",
            margin: "0 2px",
            animation: "bounce 1s infinite ease-in-out",
            animationDelay: "0.4s",
          }}
        />
      </span>
    );
  };

  const LoadingDesc = () => {
    return (
      <div
        style={{
          height: "150px",
          backgroundColor: lightMode ? "#f3f4f6" : "#4a5568",
          borderRadius: isMobile ? "8px" : "10px",
          position: "relative",
          overflow: "hidden",
          width: isMobile ? "100%" : "205%",
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

  const bgColor = lightMode ? "#f0f4ff" : "#232A35";
  const cardBgColor = lightMode ? "#ffffff" : "#3a4659";
  const textColor = lightMode ? "#232A35" : "#f3f4f6";
  const secondaryTextColor = lightMode ? "#6b7280" : "#9ca3af";
  const borderColor = lightMode ? "#e5e7eb" : "#4a5568";
  const accentColor = lightMode ? "#3b82f6" : "#60a5fa";
  const inputBgColor = lightMode ? "#f0f4ff" : "#4a5568";

  const styles = {
    container: {
      backgroundColor: bgColor,
      minHeight: "100vh",
      padding: isMobile ? "5px" : isTablet ? "8px" : "10px",
      color: textColor,
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    header: {
      marginBottom: isMobile ? "20px" : isTablet ? "30px" : "40px",
      textAlign: "center",
    },
    headerContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: isMobile ? "4px" : "8px",
    },
    title: {
      fontSize: isMobile ? "24px" : isTablet ? "32px" : "40px",
      fontWeight: "800",
      margin: 0,
      color: textColor,
    },
    subtitle: {
      fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
      color: secondaryTextColor,
      margin: 0,
    },
    formContainer: {
      backgroundColor: cardBgColor,
      borderRadius: isMobile ? "12px" : isTablet ? "16px" : "20px",
      padding: isMobile ? "20px" : isTablet ? "40px" : "50px",
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      border: `1px solid ${borderColor}`,
      maxWidth: isMobile ? "95%" : isTablet ? "90%" : "1200px",
      margin: "0 auto",
      transition: "all 0.3s ease",
    },
    section: {
      marginBottom: isMobile ? "30px" : isTablet ? "40px" : "60px",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: isMobile ? "20px" : isTablet ? "25px" : "35px",
      paddingBottom: isMobile ? "10px" : "15px",
      borderBottom: `1px solid ${borderColor}`,
      flexDirection: isMobile ? "row" : "row",
      gap: isMobile ? "10px" : "0",
    },
    sectionTitleContainer: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "15px",
    },
    sectionTitle: {
      fontSize: isMobile ? "20px" : isTablet ? "24px" : "28px",
      fontWeight: "700",
      margin: 0,
      color: textColor,
    },
    editIcon: {
      width: isMobile ? "18px" : isTablet ? "20px" : "22px",
      height: isMobile ? "18px" : isTablet ? "20px" : "22px",
      color: secondaryTextColor,
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    saveButton: {
      backgroundColor: accentColor,
      color: "white",
      border: "none",
      borderRadius: isMobile ? "6px" : "8px",
      padding: isMobile ? "8px" : "12px 24px",
      fontSize: isMobile ? "0" : isTablet ? "15px" : "16px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "0" : "8px",
      transition: "all 0.3s ease",
      boxShadow: `0 4px 6px ${
        lightMode ? "rgba(59, 130, 246, 0.2)" : "rgba(96, 165, 250, 0.2)"
      }`,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: isMobile ? "15px" : isTablet ? "20px" : "30px",
    },
    formGroup: {
      marginBottom: isMobile ? "20px" : "30px",
    },
    label: {
      display: "block",
      fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px",
      fontWeight: "500",
      marginBottom: isMobile ? "8px" : "12px",
      color: secondaryTextColor,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "500",
      padding: isMobile ? "12px 16px" : "15px 20px",
      backgroundColor: inputBgColor,
      borderRadius: isMobile ? "8px" : "10px",
      border: `1px solid ${borderColor}`,
      color: textColor,
      outline: "none",
      transition: "all 0.3s ease",
    },
    select: {
      width: "100%",
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "500",
      padding: isMobile ? "12px 16px" : "15px 20px",
      backgroundColor: inputBgColor,
      borderRadius: isMobile ? "8px" : "10px",
      border: `1px solid ${borderColor}`,
      color: textColor,
      outline: "none",
      appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${
        isMobile ? "12" : "16"
      }' height='${
        isMobile ? "12" : "16"
      }' viewBox='0 0 24 24' fill='none' stroke='${secondaryTextColor.replace(
        "#",
        "%23"
      )}' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 16px center",
      backgroundSize: isMobile ? "12px" : "16px",
    },
  };

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

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Account Settings</h1>
          <p style={styles.subtitle}>
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleContainer}>
              <h2 style={styles.sectionTitle}>Basic Information</h2>
              {!isLoading && (
                <svg
                  style={styles.editIcon}
                  onClick={() => setChangeBasicInfo(true)}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = accentColor;
                      e.currentTarget.style.transform = "scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = secondaryTextColor;
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              )}
            </div>
            {changeBasicInfo && (
              <button
                style={styles.saveButton}
                onClick={async () => {
                  try {
                    await dispatch(
                      saveUserDetails({
                        id: currentUser._id, // Make sure this matches your backend :id
                        userData: {
                          name: name,
                          age: age,
                          gender: gender,
                          country: country,
                          preferredLanguage: language,
                          description: description,
                        },
                      })
                    ).unwrap();
                    setChangeBasicInfo(false);
                  } catch (error) {
                    console.error("Update failed:", error);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 6px 12px ${
                      lightMode
                        ? "rgba(59, 130, 246, 0.3)"
                        : "rgba(96, 165, 250, 0.3)"
                    }`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 6px ${
                      lightMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(96, 165, 250, 0.2)"
                    }`;
                  }
                }}
              >
                <svg
                  width={isMobile ? "14" : "18"}
                  height={isMobile ? "14" : "18"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {!isMobile && "Save Changes"}
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  value={name || ""}
                  readOnly={!changeBasicInfo}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => {
                    if (changeBasicInfo) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: 0.7,
                    cursor: "auto",
                  }}
                  readOnly
                  value={user?.username || ""}
                  onChange={() => {}}
                  onFocus={(e) => {
                    if (changeBasicInfo) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Age</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="number"
                  style={{
                    ...styles.input,
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  readOnly={!changeBasicInfo}
                  value={age || null}
                  onChange={(e) => setAge(e.target.value)}
                  onFocus={(e) => {
                    if (changeBasicInfo) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Gender</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <select
                  style={{
                    ...styles.select,
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!changeBasicInfo}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Country</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  readOnly={!changeBasicInfo}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onFocus={(e) => {
                    if (changeBasicInfo) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Preferred Language</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <select
                  style={{
                    ...styles.select,
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                  disabled={!changeBasicInfo}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              {isLoading ? (
                <LoadingDesc />
              ) : (
                <textarea
                  style={{
                    ...styles.input,
                    resize: "vertical",
                    minHeight: "150px",
                    width: isMobile ? "100%" : "205%",
                    opacity: !changeBasicInfo ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  readOnly={!changeBasicInfo}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={(e) => {
                    if (changeBasicInfo) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Movie Preferences Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitleContainer}>
              <h2 style={styles.sectionTitle}>Movie Preferences</h2>
              {!isLoading && (
                <svg
                  style={styles.editIcon}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = accentColor;
                      e.currentTarget.style.transform = "scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = secondaryTextColor;
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setChangeMoviePref(true)}
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              )}
            </div>
            {changeMoviePref && (
              <button
                style={styles.saveButton}
                onClick={async () => {
                  try {
                    await dispatch(
                      saveUserDetails({
                        id: currentUser._id,
                        userData: {
                          favMovie: favMovie,
                          favArtist: favArtist,
                          favCharacter: favCharacter,
                        },
                      })
                    ).unwrap();
                    setChangeMoviePref(false);
                    console.log(currentUser);
                  } catch (error) {
                    console.error("Update failed:", error);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 6px 12px ${
                      lightMode
                        ? "rgba(59, 130, 246, 0.3)"
                        : "rgba(96, 165, 250, 0.3)"
                    }`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 6px ${
                      lightMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(96, 165, 250, 0.2)"
                    }`;
                  }
                }}
              >
                <svg
                  width={isMobile ? "14" : "18"}
                  height={isMobile ? "14" : "18"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {!isMobile && "Save Changes"}
              </button>
            )}
          </div>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Favorite Movie</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: !changeMoviePref ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  readOnly={!changeMoviePref}
                  value={favMovie || ""}
                  onChange={(e) => setFavMovie(e.target.value)}
                  onFocus={(e) => {
                    if (changeMoviePref) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Favorite Artist</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: !changeMoviePref ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  value={favArtist || ""}
                  onChange={(e) => setFavArtist(e.target.value)}
                  readOnly={!changeMoviePref}
                  onFocus={(e) => {
                    if (changeMoviePref) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Favorite Character</label>
              {isLoading ? (
                <div
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LoadingDots />
                </div>
              ) : (
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    opacity: !changeMoviePref ? 0.7 : 1,
                    cursor: "auto",
                  }}
                  value={favCharacter || ""}
                  onChange={(e) => setFavCharacter(e.target.value)}
                  readOnly={!changeMoviePref}
                  onFocus={(e) => {
                    if (changeMoviePref) {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${
                        lightMode
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`;
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
