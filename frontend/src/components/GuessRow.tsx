import { IGuess } from "src/api/IGuess";
import styled from "styled-components";
import { GuessBox } from "./GuessBox";

export interface IGuessRow {
  /**
   * The guess object for the row with the current guess and result.
   */
  guess: IGuess;
}

const StyledGuessRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const GuessRow = (props: IGuessRow) => {
  return (
    <StyledGuessRow>
      {props.guess.guess.split("").map((character, index) => (
        <GuessBox
          character={character}
          resultCharacter={props.guess.result?.[index]}
          delay={index * 100}
          index={index}
          key={`${props.guess.guess}_${character}_${index}`}
        />
      ))}
      {
        // Fill the extra boxes so there is always 5 per row.
      }
      {Array(5 - props.guess.guess.length)
        .fill("")
        .map((_, index) => (
          <GuessBox
            key={`${props.guess.guess}_blank_${index}`}
            character={""}
            index={index}
          />
        ))}
    </StyledGuessRow>
  );
};
