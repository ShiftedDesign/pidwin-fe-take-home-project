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

const StyledKeyboardKey = styled.button`
  background: ${(props) => props.theme.colors.darkGray};
  border-radius: 5px;
  width: calc(100% / 10);
  max-width: 40px;
  color: white;
  border: none;
  font-weight: 700;
  aspect-ratio: 43/58;
  &#enter,
  &#backspace {
    width: calc(100% / 8);
    max-width: 64px;
    font-size: 12px;
  }
  &#backspace {
    // Correction for icon size.
    font-size: 20px;
  }
  &:active {
    background: ${(props) => props.theme.colors.lightGray};
  }
`;

/**
 * Renders a single keyboard key, the child is displayed in the button.
 * @param props Component props.
 */
export const KeyboardKey = (
  props: React.PropsWithChildren<IKeyboardKeyProps>
) => {
  return (
    <StyledKeyboardKey
      onMouseDown={(e) => {
        e.preventDefault();
        props.onKeyPress(props.keyInput);
      }}
      title={props.keyInput}
      id={props.keyInput.toLocaleLowerCase()}
    >
      {props.children ?? props.keyInput.toUpperCase()}
    </StyledKeyboardKey>
  );
};
