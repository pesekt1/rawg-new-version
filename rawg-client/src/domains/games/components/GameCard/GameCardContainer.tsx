import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  const border = useColorModeValue("2px solid #a0a0a0", "none");

  return (
    <Box overflow="hidden" borderRadius={10} border={border}>
      {children}
    </Box>
  );
};

export default GameCardContainer;
