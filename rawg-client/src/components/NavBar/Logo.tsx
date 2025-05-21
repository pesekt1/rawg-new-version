import { HStack, Text, useColorModeValue, Box } from "@chakra-ui/react";
import { FaGamepad } from "react-icons/fa";

// Remove LogoProps and height prop
const Logo = () => {
  const iconBg = useColorModeValue(
    "linear(to-br, teal.300, blue.400)",
    "linear(to-br, teal.600, blue.700)"
  );
  const iconColor = useColorModeValue("white", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const borderColor = useColorModeValue("#234E52", "#81E6D9"); // dark teal/light cyan
  const hoverBg = useColorModeValue("teal.100", "teal.700");
  // Use a brighter cyan for the shadow
  const hoverShadow = useColorModeValue(
    "0 0 0 4px #38E8F9",
    "0 0 0 4px #63FFF1"
  );

  return (
    <Box
      cursor="pointer"
      _hover={{
        bg: hoverBg,
        boxShadow: hoverShadow,
        transition: "background 0.2s, box-shadow 0.2s",
      }}
      borderRadius="full"
      display="inline-block"
    >
      <HStack
        spacing={3}
        borderWidth="2px"
        borderStyle="solid"
        borderColor={borderColor}
        borderRadius="full"
        px={3}
        py={1}
        boxShadow="sm"
        bg={useColorModeValue("white", "gray.800")}
        alignItems="center"
      >
        <Box
          bgGradient={iconBg}
          borderRadius="full"
          boxSize="38px"
          minHeight="38px"
          minWidth="38px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          shadow="md"
        >
          <FaGamepad size={20} color={iconColor} />
        </Box>
        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="extrabold"
          color={textColor}
          letterSpacing="widest"
          fontFamily="heading"
          lineHeight="1"
          display="flex"
          alignItems="center"
          // Remove underline on hover
          _hover={{ textDecoration: "none" }}
        >
          Game<span style={{ color: "#319795" }}>DB</span>
        </Text>
      </HStack>
    </Box>
  );
};

export default Logo;
