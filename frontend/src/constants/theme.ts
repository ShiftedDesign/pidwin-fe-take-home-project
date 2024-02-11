// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      darkGray: string;
      lightGray: string;
      green: string;
      yellow: string;
      red: string;
    };
  }
}

export const theme = {
  colors: {
    background: "#121213",
    darkGray: "#3A3A3C",
    lightGray: "#5C5C62",
    green: "#538D4E",
    yellow: "#B59F3B",
    red: "#FF624D",
  },
};
