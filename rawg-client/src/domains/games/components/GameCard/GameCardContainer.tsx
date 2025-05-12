import { Box, useStyleConfig } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  const styles = useStyleConfig("CardContainer"); // Use Card styles from the theme

  return (
    <Box
      __css={{
        ...styles, // Merge theme-based styles
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
