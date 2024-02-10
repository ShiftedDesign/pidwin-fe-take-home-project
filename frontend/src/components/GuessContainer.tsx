import { IGuess } from "src/api/IGuess";

export interface IGuessContainerProps {
  /**
   * Array of past guesses.
   */
  pastGuesses: IGuess[];

  /**
   * The current guess before submitting.
   */
  currentGuesses: string[];

  /**
   * Optional field to change the max number of guesses allowed.
   */
  maxGuesses?: number;
}

export const GuessContainer = (props: IGuessContainerProps) => {
  return (
    <div>
      {props.pastGuesses.map((guess) => (
        <div></div>
      ))}
      {}
    </div>
  );
};
