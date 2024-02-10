import styled from "styled-components";

interface IKeyboardKeyProps {
  /**
   * The value of this particular key.
   */
  keyInput: string;

  /**
   * Callback for when this particular button is pressed.
   */
  onKeyPress: (key: string) => void;
}

const StyledKeyboardKey = styled.button``;

/**
 * Renders a single keyboard key, the child is displayed in the button.
 * @param props Component props.
 */
export const KeyboardKey = (
  props: React.PropsWithChildren<IKeyboardKeyProps>
) => {
  return (
    <StyledKeyboardKey
      onClick={() => props.onKeyPress(props.keyInput)}
      title={props.keyInput}
      id={props.keyInput}
    >
      {props.children ?? props.keyInput.toUpperCase()}
    </StyledKeyboardKey>
  );
};
