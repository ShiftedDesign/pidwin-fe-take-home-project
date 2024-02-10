/**
 * Object that contains the user's guess as well as the result from the server.
 */
export interface IGuess {
  /**
   * The user's guess
   */
  guess: string;

  /**
   * The result of the guess from the API.
   * Contents will be 5 a combination of characters:
   * '1' - Correct
   * '0' - In Word
   * "x" - Wrong
   */
  result: string;
}
