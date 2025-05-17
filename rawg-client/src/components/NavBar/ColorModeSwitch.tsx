import { HStack, Switch, useColorMode, Icon } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      spacing={4}
      align="center"
      bg={colorMode === "light" ? "lightGray.200" : "gray.700"}
      p={2}
      borderRadius="full"
      justify="space-between"
      w="100px"
    >
      <Icon
        as={FiSun}
        boxSize={4}
        color={colorMode === "light" ? "yellow.400" : "gray.500"}
      />
      <Switch
        isChecked={colorMode === "dark"}
        colorScheme="green"
        onChange={toggleColorMode}
        size="sm"
      />
      <Icon
        as={FiMoon}
        boxSize={4}
        color={colorMode === "dark" ? "blue.400" : "gray.500"}
      />
    </HStack>
  );
};

export default ColorModeSwitch;
