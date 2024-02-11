import { IGuess } from "src/api/IGuess";
import { GuessRow } from "./GuessRow";
import styled from "styled-components";

export interface IGuessContainerProps {
  /**
   * Array of past guesses.
   */
  pastGuesses: IGuess[];

  /**
   * The current guess before submitting.
   */
  currentGuess: IGuess;
}

const StyledGuessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

export const GuessContainer = (props: IGuessContainerProps) => {
  return (
    <StyledGuessContainer>
      {props.pastGuesses.map((guess) => (
        <GuessRow guess={guess}></GuessRow>
      ))}
      {props.pastGuesses.length < 6 && (
        <GuessRow guess={props.currentGuess}></GuessRow>
      )}
      {5 - props.pastGuesses.length > 0 &&
        Array(5 - props.pastGuesses.length)
          .fill({ guess: "" })
          .map((guess) => <GuessRow guess={guess}></GuessRow>)}
    </StyledGuessContainer>
  );
};
