import { HStack, Switch, useColorMode, Icon } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        colorScheme="green"
        onChange={toggleColorMode}
      />
      <Icon as={colorMode === "dark" ? FiMoon : FiSun} boxSize={5} />
    </HStack>
  );
};

export default ColorModeSwitch;
