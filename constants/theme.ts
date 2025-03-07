import { colors } from "@/utils/tailwind";
import {
  Theme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const DefaultTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    primary: colors.indigo["400"],
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};
