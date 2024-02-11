import { useEffect, useState } from "react";
import "./App.css";
import { Keyboard } from "./components/Keyboard";
import { useCheckWord } from "./hooks/useCheckWord";
import styled from "styled-components";
import { GuessContainer } from "./components/GuessContainer";

const StyledApp = styled.div`
  background: #121213;
  height: 100vh;
  width: 100vw;
  color: white;
`;

const StyledGuessButton = styled.button`
  border: none;
  padding: 16px 24px;
  width: 340px;
  height: 50px;
  border-radius: 8px;
  background: #3a3a3c;
  color: white;
  font-weight: 600;
  &:disabled {
    background: #1a1a1a;
    color: #3a3a3c;
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #fafafa;
  color: white;
  display: flex;

  h1 {
    margin: auto auto;
    padding: 0;
    font-weight: 800;
  }
`;

function App() {
  const hook = useCheckWord();
  const [currentGuess, setCurrentGuess] = useState("");

  const submitGuess = () => {};

  /**
   * Handle the most recent key press.
   * @param key The key being pressed.
   */
  const handleKeyPress = (key: string) => {
    switch (key) {
      case "BACKSPACE":
        setCurrentGuess((v) => v.slice(0, -1));
        break;
      case "ENTER":
        currentGuess.length < 5 && submitGuess();
        break;
      default:
        if (currentGuess.length < 5) {
          setCurrentGuess((v) => `${v}${key}`);
        }
        break;
    }
  };

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
    <StyledApp className="App">
      <StyledHeader>
        <h1>Wordle</h1>
      </StyledHeader>
      <GuessContainer
        pastGuesses={hook.data}
        currentGuess={{ guess: currentGuess }}
      />
      <StyledGuessButton
        disabled={currentGuess.length < 5}
        onClick={() => {
          hook.guessWord(currentGuess);
          setCurrentGuess("");
        }}
      >
        Guess Word
      </StyledGuessButton>
      <Keyboard
        disabled={hook.data.length === 5 || hook.solved}
        onKeyPress={(key) => handleKeyPress(key)}
      />
    </StyledApp>
  );
}

export default App;
