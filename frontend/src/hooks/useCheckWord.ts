import { useState } from "react";
import { IGuess } from "src/api/IGuess";

const checkWordURL = "http://localhost:5000/api/word?guess=";

/**
 * Hook for interfacing with the API.
 */
export const useCheckWord = () => {
  const [data, setData] = useState<IGuess[]>([]);
  const [solved, setSolved] = useState(false);

  const guessWord = async (guess: string) => {
    const response = await (await fetch(`${checkWordURL}${guess}`)).json();
    if (response.result === "11111") {
      setSolved(true);
    }
    setData((v) => [...v, { guess: guess, result: response.result }]);
  };

  return { data, solved, guessWord };
};
