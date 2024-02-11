import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { GuessContainer } from "./components/GuessContainer";
import { Keyboard } from "./components/Keyboard";
import { theme } from "./constants/theme";
import { useCheckWord } from "./hooks/useCheckWord";

const StyledApp = styled.div`
  background: ${(props) => props.theme.colors.background};
  height: 100vh;
  width: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
`;

const StyledGuessButton = styled.button`
  border: none;
  padding: 16px 24px;
  width: 100%;
  max-width: 340px;
  height: 50px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.darkGray};
  color: white;
  font-weight: 600;
  margin: auto;
  &:disabled {
    background: #1a1a1a;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  color: white;
  display: flex;

  h1 {
    margin: auto auto;
    padding: 0;
    font-weight: 800;
  }
`;

const StyledGameWrapper = styled.div<{ $gameScale: number }>`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  height: fit-content;
  width: 100%;
  height: 100%;
  max-height: 750px;
  max-width: 500px;
  zoom: ${(props) => props.$gameScale};
`;

function App() {
  const hook = useCheckWord();
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameScale, setGameScale] = useState(1);

  // Callback to submit.
  const submitGuess = () => {
    hook.guessWord(currentGuess);
    setCurrentGuess("");
  };

  /**
   * Handle the most recent key press.
   * @param key The key being pressed.
   */
  const handleKeyPress = (key: string) => {
    // Disable key input.
    if (hook.data.length > 5 || hook.solved) {
      return;
    }
    switch (key) {
      case "BACKSPACE":
        setCurrentGuess((v) => v.slice(0, -1));
        break;
      case "ENTER":
        currentGuess.length === 5 && submitGuess();
        break;
      default:
        if (currentGuess.length < 5) {
          setCurrentGuess((v) => `${v}${key}`);
        }
        break;
    }
  };

  /**
   * Function to handle resizing the window and ensuring the game is fully visible.
   */
  const resizeGame = () => {
    // Ensure all of the game and keyboard are always in view.
    // 500x750
    const widthScale = window.innerWidth / 500;
    const heightScale = (window.innerHeight - 100) / 750;
    setGameScale(Math.min(Math.min(widthScale, heightScale), 1));
  };

  useEffect(() => {
    window.addEventListener("resize", resizeGame);
    return () => {
      window.removeEventListener("resize", resizeGame);
    };
  }, []);

  useEffect(() => {
    const keyboardInput = (e: KeyboardEvent) => {
      e.preventDefault();
      handleKeyPress(e.key.toUpperCase());
    };

    window.addEventListener("keydown", keyboardInput);
    return () => {
      window.removeEventListener("keydown", keyboardInput);
    };
  }, [handleKeyPress]);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp className="App">
        <StyledHeader>
          <h1>Wordle</h1>
        </StyledHeader>
        <StyledGameWrapper $gameScale={gameScale}>
          <GuessContainer
            pastGuesses={hook.data}
            currentGuess={{ guess: currentGuess }}
          />
          <StyledGuessButton
            disabled={currentGuess.length < 5}
            onClick={() => submitGuess()}
          >
            Guess Word
          </StyledGuessButton>
          <Keyboard onKeyPress={(key) => handleKeyPress(key)} />
        </StyledGameWrapper>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
