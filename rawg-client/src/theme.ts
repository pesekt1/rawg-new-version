import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
    lightGray: {
      50: "#ffffff",
      100: "#f7f7f7",
      200: "#eeeeee",
      300: "#dddddd",
      400: "#cccccc",
      500: "#bbbbbb",
      600: "#aaaaaa",
      700: "#999999",
      800: "#888888",
      900: "#777777",
    },
    accent: {
      500: "#ff6b6b", // Vibrant accent color for both themes
      600: "#e55a5a",
      700: "#cc4a4a",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg:
          props.colorMode === "light"
            ? "lightGray.50"
            : "linear-gradient(to bottom, #121212, #202020)",
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
      },
      "*::placeholder": {
        color: props.colorMode === "light" ? "lightGray.400" : "gray.500",
      },
      a: {
        color: props.colorMode === "light" ? "accent.600" : "accent.500",
        _hover: {
          textDecoration: "underline",
          color: props.colorMode === "light" ? "accent.700" : "accent.600",
        },
      },
      button: {
        bg: props.colorMode === "light" ? "lightGray.200" : "gray.700",
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
        _hover: {
          bg: props.colorMode === "light" ? "lightGray.300" : "accent.500",
          color: props.colorMode === "light" ? "gray.900" : "white",
          boxShadow:
            props.colorMode === "light"
              ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
              : "0px 4px 10px rgba(255, 107, 107, 0.5)",
        },
      },
      card: {
        bg: props.colorMode === "light" ? "white" : "gray.800",
        boxShadow:
          props.colorMode === "light"
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.8)",
      },
    }),
  },
  textStyles: {
    heading: {
      fontSize: ["24px", "32px", "48px"], // Responsive font sizes for mobile, tablet, and desktop
      fontWeight: "bold",
    },
    body: {
      fontSize: ["14px", "16px", "18px"], // Adjust text size for different screen sizes
    },
  },
  components: {
    Text: {
      baseStyle: {
        textStyle: "body", // Default textStyle for Text component
      },
    },
    Heading: {
      baseStyle: {
        textStyle: "heading", // Ensure Heading uses its own textStyle
      },
    },
  },
});

export default theme;
