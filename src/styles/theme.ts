import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#6FFF82",
    secondary: "#06C04A",
  },
  components: {
    Text: {
      baseStyle: {
        color: "#333333",
      },
    },
    Button: {
      variants: {
        custom: {
          bg: "secondary",
          color: "white",
          _hover: {
            bg: "primary",
          },
          _active: {
            bg: "#044f00ff",
          },
          _focus: {
            boxShadow: "none",
          },
          _disabled: {
            bg: "#e0e0e0",
            color: "#b0b0b0",
          },
        },
        pagination: {
          bg: "secondary",
          color: "white",
          _hover: {
            bg: "primary",
          },
          _active: {
            bg: "#044f00ff",
          },
          _disabled: {
            bg: "#e0e0e0",
            color: "#b0b0b0",
          },
        },
      },
    },
  },
});

export default theme;
