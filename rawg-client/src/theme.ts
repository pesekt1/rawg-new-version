import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Utility function for hover boxShadow
const getHoverBoxShadow = (colorMode: string) =>
  colorMode === "light"
    ? "0px 8px 20px rgba(255, 107, 107, 0.3)" // shadow for light mode
    : "0px 4px 10px rgba(255, 107, 107, 0.5)"; // Dark mode shadow

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
        bg: props.colorMode === "light" ? "lightGray.50" : "gray.900", // Use a solid color for dark mode
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
      },
      a: {
        color: props.colorMode === "light" ? "accent.600" : "accent.500",
        _hover: {
          textDecoration: "underline",
          color: props.colorMode === "light" ? "accent.700" : "accent.600",
        },
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
    CardContainer: {
      baseStyle: (props: any) => ({
        bg: props.colorMode === "light" ? "white" : "gray.800",
        borderRadius: "12px",
        boxShadow:
          props.colorMode === "light"
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.8)",
        _hover: {
          boxShadow: getHoverBoxShadow(props.colorMode), // Reuse hover shadow
          transition: "box-shadow 0.3s ease-in-out",
        },
      }),
    },
    Button: {
      // Use PascalCase for the Button component
      baseStyle: (props: any) => ({
        bg: props.colorMode === "light" ? "lightGray.200" : "gray.700",
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
        _hover: {
          bg: props.colorMode === "light" ? "lightGray.300" : "accent.500",
          color: props.colorMode === "light" ? "gray.900" : "white",
          boxShadow: getHoverBoxShadow(props.colorMode),
        },
      }),
      variants: {
        // Shared button styles for custom buttons
        customButton: (props: any) => ({
          bg: "transparent",
          color: props.colorMode === "light" ? "gray.800" : "white",
          _hover: {
            bg: props.colorMode === "light" ? "lightGray.300" : "accent.500",
            color: props.colorMode === "light" ? "gray.900" : "white",
          },
          _active: {
            bg: props.colorMode === "light" ? "lightGray.400" : "accent.600",
            color: props.colorMode === "light" ? "gray.900" : "white",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(255, 107, 107, 0.6)", // Focus ring
          },
        }),

        // Generalized variant for outlined buttons
        outlinedButton: (props: any) => ({
          bg: "transparent",
          border: "2px solid",
          borderColor: props.colorMode === "light" ? "gray.300" : "gray.600",
          borderRadius: "8px",
          color: props.colorMode === "light" ? "gray.800" : "white",
          _hover: {
            bg: "accent.500",
            color: "white",
            borderColor: "accent.600",
            boxShadow: "0 0 8px rgba(255, 107, 107, 0.6)", // Add hover shadow
          },
          _active: {
            bg: "accent.600",
            borderColor: "accent.700",
          },
          _focus: {
            outline: "none", // Remove outline
            boxShadow: "none", // Remove focus ring
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        position: "relative",
        overflow: "hidden",
        height: "100%",
        bg: props.colorMode === "light" ? "white" : "gray.700",
        borderRadius: "12px",
        boxShadow:
          props.colorMode === "light"
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.8)",
        transition: "transform 0.4s, filter 0.4s",
        _hover: {
          transform: "scale(1.05)",
          filter: "brightness(1.2)",
          boxShadow: getHoverBoxShadow(props.colorMode),
        },
      }),
    },
  },
});

export default theme;
