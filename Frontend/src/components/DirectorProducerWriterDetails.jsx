import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setArtist } from "../features/MovieDetailsSlice";
import slugify from "slugify";

const DirectorProducerWriterDetails = ({ id }) => {
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [director, setDirector] = useState({});
  const [producer, setProducer] = useState({});
  const [writer, setWriter] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const nameRefs = useRef({});
  const roleRefs = useRef({});
  const [overflowStates, setOverflowStates] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createSlug = (name) => {
    return encodeURIComponent(slugify(name, { lower: true, strict: true }));
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.crew) {
          const foundDirector = data.crew.find(
            (member) => member.job === "Director"
          );
          const foundProducer = data.crew.find(
            (member) => member.job === "Producer"
          );
          const foundWriter = data.crew.find(
            (member) => member.job === "Writer"
          );

          setDirector({
            name: foundDirector?.name || "N/A",
            img: foundDirector?.profile_path
              ? `https://image.tmdb.org/t/p/w500${foundDirector.profile_path}`
              : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            id: foundDirector?.id,
            role: "Director",
          });

          setProducer({
            name: foundProducer?.name || "N/A",
            img: foundProducer?.profile_path
              ? `https://image.tmdb.org/t/p/w500${foundProducer.profile_path}`
              : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            id: foundProducer?.id,
            role: "Producer",
          });

          setWriter({
            name: foundWriter?.name || "N/A",
            img: foundWriter?.profile_path
              ? `https://image.tmdb.org/t/p/w500${foundWriter.profile_path}`
              : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            id: foundWriter?.id,
            role: "Writer",
          });
        }
      });
  }, [id]);

  function handleShowPersonDetails(id, name) {
    if (name === "N/A") {
      return;
    }
    dispatch(setArtist(id));
    navigate(`/profile/${id}/${createSlug(name)}`);
  }

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowStates = {};
      const crewMembers = [director, producer, writer].filter(
        (member) => member.name !== "N/A"
      );
      crewMembers.forEach((member, index) => {
        const nameEl = nameRefs.current[index];
        const roleEl = roleRefs.current[index];
        if (nameEl && roleEl) {
          nameEl.style.visibility = "hidden";
          nameEl.style.visibility = "visible";
          roleEl.style.visibility = "hidden";
          roleEl.style.visibility = "visible";
          newOverflowStates[index] = {
            name: nameEl.scrollWidth > nameEl.clientWidth,
            role: roleEl.scrollWidth > roleEl.clientWidth,
          };
        }
      });
      setOverflowStates(newOverflowStates);
    };
    const timer = setTimeout(checkOverflow, 0);
    return () => clearTimeout(timer);
  }, [director, producer, writer]);

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: isMobile 
        ? "clamp(24px, 6vw, 32px) 0" 
        : window.innerWidth < 1024 
          ? "clamp(28px, 5vw, 36px) 0" 
          : "clamp(32px, 4vw, 40px) 0",
      position: "relative",
      background: lightMode ? "#f0f4ff" : "#232A35",
      marginTop: isMobile 
        ? "clamp(-30px, -6vw, -40px)" 
        : window.innerWidth < 1024 
          ? "clamp(-35px, -5vw, -50px)" 
          : "clamp(-40px, -4vw, -60px)",
      zIndex: "10",
    },
    title: {
      fontSize: isMobile 
        ? "clamp(1rem, 4vw, 1.5rem)" 
        : window.innerWidth < 1024 
          ? "clamp(1.25rem, 3.5vw, 1.75rem)" 
          : "clamp(1.5rem, 2.5vw, 2rem)",
      fontWeight: "700",
      marginBottom: "0px",
      textAlign: "left",
      marginLeft: isMobile 
        ? "clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "clamp(24px, 4vw, 32px)" 
          : "clamp(32px, 3vw, 40px)",
      color: lightMode ? "#2d3748" : "white",
      position: "relative",
      display: "inline-block",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: "-8px",
        left: "0",
        width: isMobile 
          ? "clamp(30px, 10vw, 50px)" 
          : window.innerWidth < 1024 
            ? "clamp(40px, 8vw, 60px)" 
            : "clamp(50px, 6vw, 70px)",
        height: "3px",
        background: lightMode ? "#0076b3" : "#00a8ff",
        borderRadius: "2px",
      },
    },
    sliderContainer: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      padding: isMobile 
        ? "clamp(8px, 3vw, 16px) 0" 
        : window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 18px) 0" 
          : "clamp(16px, 2vw, 20px) 0",
    },
    slider: {
      display: "flex",
      overflowX: "auto",
      scrollBehavior: "smooth",
      padding: isMobile 
        ? "clamp(8px, 3vw, 12px) clamp(16px, 4vw, 24px)" 
        : window.innerWidth < 1024 
          ? "clamp(10px, 2.5vw, 14px) clamp(24px, 4vw, 32px)" 
          : "clamp(12px, 2vw, 16px) clamp(32px, 3vw, 40px)",
      gap: isMobile 
        ? "clamp(12px, 3vw, 20px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 2.5vw, 24px)" 
          : "clamp(20px, 2vw, 30px)",
      flexGrow: "1",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: isMobile 
        ? "clamp(100px, 22vw, 140px)" 
        : window.innerWidth < 1024 
          ? "clamp(140px, 18vw, 180px)" 
          : "clamp(160px, 16vw, 200px)",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },
    imageContainer: {
      position: "relative",
      width: isMobile 
        ? "clamp(80px, 18vw, 120px)" 
        : window.innerWidth < 1024 
          ? "clamp(100px, 14vw, 140px)" 
          : "clamp(120px, 12vw, 160px)",
      height: isMobile 
        ? "clamp(80px, 18vw, 120px)" 
        : window.innerWidth < 1024 
          ? "clamp(100px, 14vw, 140px)" 
          : "clamp(120px, 12vw, 160px)",
      borderRadius: "50%",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
      border: lightMode ? "3px solid white" : "3px solid #2d3748",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: lightMode ? "#0076b3" : "#00a8ff",
        boxShadow: lightMode
          ? "0 10px 25px rgba(0, 118, 179, 0.25)"
          : "0 10px 25px rgba(0, 168, 255, 0.25)",
      },
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    textContainer: {
      width: "100%",
      textAlign: "center",
      marginTop: isMobile 
        ? "clamp(8px, 2vw, 12px)" 
        : window.innerWidth < 1024 
          ? "clamp(10px, 1.5vw, 14px)" 
          : "clamp(12px, 1.2vw, 16px)",
      overflow: "hidden",
      position: "relative",
    },
    nameContainer: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      height: isMobile 
        ? "clamp(16px, 3vw, 20px)" 
        : window.innerWidth < 1024 
          ? "clamp(18px, 2.5vw, 22px)" 
          : "clamp(20px, 2vw, 24px)",
    },
    name: {
      fontSize: isMobile 
        ? "clamp(0.75rem, 3vw, 0.875rem)" 
        : window.innerWidth < 1024 
          ? "clamp(0.875rem, 2vw, 1rem)" 
          : "clamp(1rem, 1.5vw, 1.125rem)",
      fontWeight: "600",
      marginBottom: isMobile 
        ? "clamp(2px, 1vw, 4px)" 
        : window.innerWidth < 1024 
          ? "clamp(3px, 0.8vw, 5px)" 
          : "clamp(4px, 0.6vw, 6px)",
      color: lightMode ? "#2d3748" : "white",
      cursor: "pointer",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
      position: "absolute",
      width: "100%",
      paddingRight: isMobile 
        ? "clamp(10px, 3vw, 15px)" 
        : window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 18px)" 
          : "clamp(15px, 2vw, 20px)",
      "&:hover": {
        color: lightMode ? "#0076b3" : "#00a8ff",
        textDecoration: "underline",
      },
    },
    roleContainer: {
      position: "relative",
      width: "100%",
      overflow: "hidden",
      height: isMobile 
        ? "clamp(14px, 2.5vw, 18px)" 
        : window.innerWidth < 1024 
          ? "clamp(16px, 2vw, 20px)" 
          : "clamp(18px, 1.8vw, 22px)",
    },
    role: {
      fontSize: isMobile 
        ? "clamp(0.625rem, 2.5vw, 0.75rem)" 
        : window.innerWidth < 1024 
          ? "clamp(0.75rem, 1.8vw, 0.875rem)" 
          : "clamp(0.875rem, 1.2vw, 1rem)",
      color: lightMode ? "#4a5568" : "#a0aec0",
      whiteSpace: "nowrap",
      position: "absolute",
      width: "100%",
      paddingRight: isMobile 
        ? "clamp(10px, 3vw, 15px)" 
        : window.innerWidth < 1024 
          ? "clamp(12px, 2.5vw, 18px)" 
          : "clamp(15px, 2vw, 20px)",
    },
  };

  const crewMembers = [director, producer, writer].filter(
    (member) => member.name !== "N/A"
  );

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes slideText {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-100%);
            }
            50.01% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
      <div style={styles.title}>Key Crew Members</div>
      <div style={styles.sliderContainer}>
        <div style={styles.slider}>
          {crewMembers.map((member, index) => (
            <div key={index} style={styles.card}>
              <div
                style={styles.imageContainer}
                onClick={() => handleShowPersonDetails(member.id, member.name)}
              >
                <img src={member.img} alt={member.name} style={styles.image} />
              </div>
              <div style={styles.textContainer}>
                <div style={styles.nameContainer}>
                  <div
                    ref={(el) => (nameRefs.current[index] = el)}
                    style={{
                      ...styles.name,
                      animation: overflowStates[index]?.name
                        ? "slideText 10s linear infinite"
                        : "none",
                    }}
                    onClick={() =>
                      handleShowPersonDetails(member.id, member.name)
                    }
                  >
                    {member.name}
                  </div>
                </div>
                <div style={styles.roleContainer}>
                  <div
                    ref={(el) => (roleRefs.current[index] = el)}
                    style={{
                      ...styles.role,
                      animation: overflowStates[index]?.role
                        ? "slideText 10s linear infinite"
                        : "none",
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DirectorProducerWriterDetails.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DirectorProducerWriterDetails;