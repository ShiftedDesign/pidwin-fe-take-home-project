import { IGuess } from "src/api/IGuess";
import styled from "styled-components";

export interface IGuessRow {
  guess: IGuess;
}

const StyledGuessRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const StyledGuessBox = styled.div<{
  delay?: number;
  flip?: boolean;
  bgColor?: string;
}>`
  width: 60px;
  height: 60px;
  border: solid 2px #3a3a3c;
  animation-delay: ${(props) => props.delay ?? 0}ms;
  animation: ${(props) => (props.flip ? "" : "")};
  background: ${(props) => props.bgColor ?? "transparent"};
  font-weight: 700;
  font-size: 24px;
  border-radius: 2px;
  display: flex;
  &#filled {
    border-color: #5c5c62;
    transition: border-color 1s;
  }
`;

const StyledCenteredText = styled.div`
  margin: auto;
`;

export const GuessRow = (props: IGuessRow) => {
  const getBackgroundColor = (char?: string) => {
    if (!char) {
      return undefined;
    }
    switch (char) {
      case "1":
        return "#538D4E";
      case "0":
        return "#B59F3B";
      case "x":
        return "#FF624D";
      default:
        return undefined;
    }
  };

  return (
    <StyledGuessRow>
      {props.guess.guess.split("").map((character, index) => (
        <StyledGuessBox
          delay={index * 100}
          flip={!!props.guess.result?.[index]}
          bgColor={getBackgroundColor(props.guess.result?.[index])}
          key={`${props.guess.guess}_${character}_${index}`}
          id={character ? "filled" : ""}
        >
          <StyledCenteredText>{character}</StyledCenteredText>
        </StyledGuessBox>
      ))}
      {
        // Fill the extra boxes so there is always 5 per row.
      }
      {Array(5 - props.guess.guess.length)
        .fill("")
        .map((_, index) => (
          <StyledGuessBox key={`${props.guess.guess}_blank_${index}`} />
        ))}
    </StyledGuessRow>
  );
};
