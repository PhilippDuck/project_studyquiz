import { extendTheme } from "@chakra-ui/react";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Roboto:400,700"],
  },
});

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
  },
  colors: {
    primary: {
      50: "#E9FCFA",
      100: "#C1F5F0",
      200: "#23DCC9",
      300: "#72E9DD",
      400: "#4BE2D3",
      500: "#23DCC9",
      600: "#1CB0A1",
      700: "#158479",
      800: "#0E5851",
      900: "#072C28",
    },
    gray: {
      50: "#F3F3F3",
      100: "#F3F3F3",
      200: "#DBDBDB",
      300: "4C4C4C",
      400: "4C4C4C",
      500: "#535353",
      600: "#535353",
      700: "#131313",
      800: "#141414",
      900: "#0f0f0f",
    },
  },
});
export default theme;
