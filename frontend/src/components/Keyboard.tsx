import styled from "styled-components";
import { KeyboardKey } from "./KeyboardKey";
import { IoBackspaceOutline } from "react-icons/io5";

export interface IKeyboardProps {
  /**
   * Flag for if the keyboard should be disabled.
   */
  disabled: boolean;

  /**
   * Callback for when a single key is pressed.
   * @param key The key value that is pressed.
   */
  onKeyPress: (key: string) => void;
}

const StyledKeyboard = styled.div``;

const StyledKeyboardRow = styled.div``;

const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

export const Keyboard = (props: IKeyboardProps) => {
  const { onKeyPress } = props;
  return (
    <StyledKeyboard>
      <StyledKeyboardRow>
        {topRow.map((key) => (
          <KeyboardKey
            keyInput={key}
            onKeyPress={onKeyPress}
            key={key}
          ></KeyboardKey>
        ))}
      </StyledKeyboardRow>
      <StyledKeyboardRow>
        {midRow.map((key) => (
          <KeyboardKey
            keyInput={key}
            onKeyPress={onKeyPress}
            key={key}
          ></KeyboardKey>
        ))}
      </StyledKeyboardRow>
      <StyledKeyboardRow>
        <KeyboardKey keyInput="ENTER" onKeyPress={onKeyPress}></KeyboardKey>
        {bottomRow.map((key) => (
          <KeyboardKey
            keyInput={key}
            onKeyPress={onKeyPress}
            key={key}
          ></KeyboardKey>
        ))}
        <KeyboardKey keyInput="BACKSPACE" onKeyPress={onKeyPress}>
          <IoBackspaceOutline />
        </KeyboardKey>
      </StyledKeyboardRow>
    </StyledKeyboard>
  );
};
