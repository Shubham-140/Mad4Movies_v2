import { useDispatch, useSelector } from "react-redux";
import { setShowFAQ, showFAQAddedPrompt } from "../features/FAQSlice";
import { useCallback, useEffect, useState, useRef } from "react";
import { setLoginWindow } from "../features/AuthSlice";
import styled, { keyframes } from "styled-components";

const modalEnter = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: clamp(0.5rem, 3vw, 0.75rem);
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 1024px) {
    align-items: flex-start;
    padding-top: 20vh;
  }

  @media (max-width: 768px) {
    padding-top: clamp(10vh, 15vw, 15vh);
  }

  @media (max-width: 480px) {
    padding-top: clamp(8vh, 12vw, 12vh);
  }
`;

const ModalContent = styled.div`
  width: ${({ isMobile }) => 
    isMobile 
      ? "min(100%, clamp(280px, 90vw, 400px))" 
      : window.innerWidth < 1024 
        ? "clamp(300px, 90vw, 450px)" 
        : "clamp(350px, 80vw, 500px)"};
  max-height: 80vh;
  padding: ${({ isMobile }) => 
    isMobile 
      ? "clamp(1rem, 3vw, 1.25rem)" 
      : window.innerWidth < 1024 
        ? "clamp(1.25rem, 2.5vw, 1.5rem)" 
        : "clamp(1.5rem, 2vw, 1.75rem)"};
  border-radius: 1rem;
  background-color: ${({ lightMode }) => (lightMode ? "#ffffff" : "#232A35")};
  box-shadow: ${({ lightMode }) =>
    lightMode
      ? "0 20px 40px rgba(0, 0, 0, 0.15)"
      : "0 20px 40px rgba(0, 0, 0, 0.3)"};
  position: relative;
  animation: ${modalEnter} 0.3s ease-out forwards;
  overflow: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    margin-top: 0;
    margin-bottom: auto;
  }

  @media (max-width: 768px) {
    width: clamp(260px, 92vw, 360px);
    padding: clamp(0.875rem, 3.5vw, 1.125rem);
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${({ isMobile }) => 
    isMobile 
      ? "clamp(1rem, 3vw, 1.25rem)" 
      : window.innerWidth < 1024 
        ? "clamp(1.25rem, 2.5vw, 1.5rem)" 
        : "clamp(1.5rem, 2vw, 1.75rem)"};
  flex: 1;
`;

const InputField = styled.input`
  width: 100%;
  padding: ${({ isMobile }) => 
    isMobile 
      ? "clamp(0.75rem, 3vw, 0.875rem)" 
      : window.innerWidth < 1024 
        ? "clamp(0.875rem, 2.5vw, 1rem)" 
        : "clamp(1rem, 2vw, 1.125rem)"};
  font-size: ${({ isMobile }) => 
    isMobile 
      ? "clamp(0.875rem, 3vw, 0.9375rem)" 
      : window.innerWidth < 1024 
        ? "clamp(0.875rem, 2vw, 1rem)" 
        : "clamp(0.9375rem, 1.5vw, 1.125rem)"};
  border-radius: 0.625rem;
  border: ${({ lightMode, error }) =>
    error
      ? "1px solid #ef4444"
      : lightMode
      ? "1px solid #e2e8f0"
      : "1px solid rgba(255, 255, 255, 0.1)"};
  background-color: ${({ lightMode }) =>
    lightMode ? "#f8fafc" : "rgba(255, 255, 255, 0.05)"};
  color: ${({ lightMode }) => (lightMode ? "#1e293b" : "#ffffff")};
  transition: all 0.3s ease;
  outline: none;
  min-height: ${({ isMobile }) => 
    isMobile 
      ? "clamp(2.5rem, 8vw, 3rem)" 
      : window.innerWidth < 1024 
        ? "clamp(2.75rem, 7vw, 3.25rem)" 
        : "clamp(3rem, 6vw, 3.5rem)"};
  box-sizing: border-box;

  &:focus {
    border-color: ${({ lightMode }) => (lightMode ? "#3b82f6" : "#ff7e5f")};
    box-shadow: ${({ lightMode }) =>
      lightMode
        ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
        : "0 0 0 2px rgba(255, 126, 95, 0.2)"};
  }

  @media (max-width: 768px) {
    padding: clamp(0.625rem, 3.5vw, 0.75rem);
    font-size: clamp(0.8125rem, 3.5vw, 0.875rem);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ isMobile }) => 
    isMobile 
      ? "clamp(0.5rem, 2vw, 0.75rem)" 
      : window.innerWidth < 1024 
        ? "clamp(0.625rem, 1.5vw, 0.875rem)" 
        : "clamp(0.75rem, 1.2vw, 1rem)"};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: clamp(0.375rem, 2.5vw, 0.625rem);
  }
`;

const Button = styled.button`
  padding: ${({ isMobile }) => 
    isMobile 
      ? "clamp(0.5rem, 2.5vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)" 
      : window.innerWidth < 1024 
        ? "clamp(0.625rem, 2vw, 0.75rem) clamp(1.125rem, 2.5vw, 1.375rem)" 
        : "clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.25rem, 2vw, 1.5rem)"};
  border-radius: 0.5rem;
  font-size: ${({ isMobile }) => 
    isMobile 
      ? "clamp(0.8125rem, 2.5vw, 0.875rem)" 
      : window.innerWidth < 1024 
        ? "clamp(0.875rem, 2vw, 1rem)" 
        : "clamp(0.9375rem, 1.5vw, 1.125rem)"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ isMobile }) => 
    isMobile 
      ? "clamp(4.5rem, 15vw, 5.5rem)" 
      : window.innerWidth < 1024 
        ? "clamp(5rem, 12vw, 6rem)" 
        : "clamp(5.5rem, 10vw, 6.5rem)"};
  min-height: ${({ isMobile }) => 
    isMobile 
      ? "clamp(2rem, 8vw, 2.25rem)" 
      : window.innerWidth < 1024 
        ? "clamp(2.25rem, 7vw, 2.5rem)" 
        : "clamp(2.5rem, 6vw, 2.75rem)"};
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ lightMode, disabled }) =>
      !disabled &&
      (lightMode
        ? "0 4px 12px rgba(59, 130, 246, 0.3)"
        : "0 4px 12px rgba(255, 65, 108, 0.3)")};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: clamp(0.5rem, 3vw, 0.625rem) clamp(0.875rem, 3.5vw, 1rem);
    min-width: clamp(4rem, 14vw, 5rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.75rem, 3vw, 0.8125rem);
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ lightMode }) => (lightMode ? "#f1f5f9" : "#2d3748")};
  color: ${({ lightMode }) => (lightMode ? "#64748b" : "#a0aec0")};
`;

const SubmitButton = styled(Button)`
  background: ${({ lightMode }) =>
    lightMode
      ? "linear-gradient(135deg, #3b82f6, #6366f1)"
      : "linear-gradient(135deg, #ff7e5f, #ff416c)"};
  color: white;
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

function AddFAQ() {
  const dispatch = useDispatch();
  const showFAQ = useSelector((state) => state.faq.showFAQ);
  const lightMode = useSelector((state) => state.color.isDarkMode);
  const [faq, setFaq] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showFAQ && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showFAQ]);

  useEffect(() => {
    const checkViewport = () => {
      const mobileThreshold = 1024;
      const isMobileDevice = window.innerWidth <= mobileThreshold;
      const visualViewport = window.visualViewport;

      if (isMobileDevice && visualViewport) {
        const keyboardThreshold = 300;
        const viewportHeightDiff = window.innerHeight - visualViewport.height;
        setHasKeyboard(viewportHeightDiff > keyboardThreshold);
      } else {
        setHasKeyboard(false);
      }
    };

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", checkViewport);
    }

    checkViewport();
    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener("resize", checkViewport);
      }
    };
  }, []);

  const handleCancelFAQ = useCallback(() => {
    dispatch(setShowFAQ(false));
  }, [dispatch]);

  function handleAddFAQ() {
    if (!isLoggedIn) {
      dispatch(setLoginWindow(true));
      dispatch(setShowFAQ(false));
      return;
    }

    if (!faq.trim()) {
      setFaq("!FAQ cannot be empty");
      setTimeout(() => setFaq(""), 1500);
      return;
    }
    dispatch(showFAQAddedPrompt());
  }

  useEffect(() => {
    function handlePressEsc(e) {
      if (showFAQ && e.key === "Escape") handleCancelFAQ();
    }
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [handleCancelFAQ, showFAQ]);

  return (
    <ModalOverlay>
      <ModalContent
        lightMode={lightMode}
        isMobile={isMobile}
        style={{
          marginTop: hasKeyboard ? "2rem" : "0",
          marginBottom: hasKeyboard ? "auto" : "0",
        }}
      >
        <InputContainer isMobile={isMobile}>
          <InputField
            ref={inputRef}
            type="text"
            lightMode={lightMode}
            error={faq === "!FAQ cannot be empty"}
            placeholder="Enter your FAQ question..."
            value={faq}
            onChange={(e) => setFaq(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddFAQ()}
            isMobile={isMobile}
          />
        </InputContainer>

        <ButtonContainer isMobile={isMobile}>
          <CancelButton lightMode={lightMode} onClick={handleCancelFAQ} isMobile={isMobile}>
            Cancel
          </CancelButton>
          <SubmitButton
            lightMode={lightMode}
            onClick={handleAddFAQ}
            disabled={faq === "!FAQ cannot be empty"}
            isMobile={isMobile}
          >
            Add FAQ
          </SubmitButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddFAQ;