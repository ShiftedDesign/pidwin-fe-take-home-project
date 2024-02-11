import { useEffect, useState } from "react";
import styled from "styled-components";

interface IGuessBoxProps {
  /**
   * The character being displayed.
   */
  character: string;

  /**
   * The index of the box.
   */
  index: number;

  /**
   * The key for the box.
   */
  key: string;

  /**
   * Optional result character.
   */
  resultCharacter?: string;

  /**
   * Optional delay for flipping the box.
   */
  delay?: number;
}

const StyledGuessBox = styled.div<{ delay?: number; flip: boolean }>`
  width: 60px;
  height: 60px;
  border: solid 2px #3a3a3c;
  background-color: transparent;
  font-weight: 700;
  font-size: 24px;
  border-radius: 2px;
  display: flex;
  animation-delay: ${(props) => props.delay ?? 0}ms;
  animation-duration: 500ms;
  animation-name: ${(props) => (props.flip ? "flip" : "")};
  &.good {
    background-color: #538d4e;
    border-color: transparent;
  }
  &.bad {
    border-color: #ff624d;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 140%;
      height: 2px;
      background: #ff624d;
      top: -2px;
      left: 30%;
      transform: rotate(-45deg) translate(-50%, 0);
    }
  }
  &.inWord {
    background-color: #b59f3b;
    border-color: transparent;
  }

  @keyframes flip {
    0% {
      transform: rotateY(0);
    }
    50% {
      transform: rotateY(90deg);
    }
    0% {
      transform: rotateY(0);
    }
  }
`;

const StyledCenteredText = styled.div`
  margin: auto;
`;

export const GuessBox = (props: IGuessBoxProps) => {
  const [flippedClass, setFlippedClass] = useState("");

  /**
   * Apply the correct class half way through the animation.
   */
  useEffect(() => {
    setTimeout(() => {
      setFlippedClass(`${getId(props.resultCharacter)}`);
    }, (props.delay ?? 0) + 250);
  }, []);

  /**
   * Returns the correct class name of each box.
   * @param char The result character.
   */
  const getId = (char?: string) => {
    if (!char) {
      return "";
    }
    switch (char) {
      case "1":
        return "good";
      case "0":
        return "inWord";
      case "x":
        return "bad";
      default:
        return undefined;
    }
  };
  return (
    <StyledGuessBox
      delay={props.delay}
      flip={props.resultCharacter !== undefined}
      key={`${props.character}_${props.index}`}
      className={flippedClass}
    >
      <StyledCenteredText>{props.character}</StyledCenteredText>
    </StyledGuessBox>
  );
};
