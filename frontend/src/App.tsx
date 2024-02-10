import { useEffect, useState } from "react";
import "./App.css";
import { Keyboard } from "./components/Keyboard";
import { useCheckWord } from "./hooks/useCheckWord";

function App() {
  const hook = useCheckWord();
  const [currentGuess, setCurrentGuess] = useState("");

  const submitGuess = () => {};

  /**
   * Handle the most recent key press.
   * @param key The key being pressed.
   */
  const handleKeyPress = (key: string) => {
    console.log(key);
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
  }, []);

  return (
    <div className="App">
      {hook.data.map((d) => (
        <div>
          {d.guess} - {d.result}
        </div>
      ))}
      <div>{currentGuess}</div>
      <div>{currentGuess.length}</div>
      <button
        disabled={currentGuess.length < 5}
        onClick={() => {
          hook.guessWord(currentGuess);
          setCurrentGuess("");
        }}
      >
        Guess Word
      </button>
      <Keyboard
        disabled={hook.data.length === 5 || hook.solved}
        onKeyPress={(key) => handleKeyPress(key)}
      />
    </div>
  );
}

export default App;
