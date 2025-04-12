import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import useGameQueryStore from "../state";

const NavBar = () => {
  const resetGameQuery = useGameQueryStore((state) => state.reset);

  return (
    <HStack justifyContent="space-between" paddingX={3}>
      <Link to="/" onClick={resetGameQuery}>
        <Image src={logo} boxSize="60px" objectFit="cover" />
      </Link>

      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
