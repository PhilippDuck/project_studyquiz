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
      50: "#ECF9F8",
      100: "#CAEDEC",
      200: "#A7E2E0",
      300: "#85D6D4",
      400: "#62CAC8",
      500: "#40BFBC",
      600: "#339997",
      700: "#267371",
      800: "#1A4C4B",
      900: "#0D2626",
    },
  },
});
export default theme;
