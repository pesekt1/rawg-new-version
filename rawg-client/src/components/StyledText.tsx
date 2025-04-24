import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

const StyledText = ({ children }: { children: ReactNode }) => {
  const bg = useColorModeValue("lightGray.100", "gray.800");
  const color = useColorModeValue("gray.800", "gray.100");
  return (
    <Box
      bg={bg}
      color={color}
      borderRadius="lg"
      p={5}
      my={4}
      boxShadow={useColorModeValue("md", "dark-lg")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      fontSize="lg"
      fontStyle="italic"
      letterSpacing="wide"
    >
      {children}
    </Box>
  );
};

export default StyledText;
