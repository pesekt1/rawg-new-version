import {
  HStack,
  Image,
  IconButton,
  useDisclosure,
  Tooltip,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import useGameQueryStore from "../state";
import LoginModal from "./LoginModal";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const resetGameQuery = useGameQueryStore((state) => state.reset);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useAuth();

  return (
    <HStack justifyContent="space-between" paddingX={3}>
      <Link to="/" onClick={resetGameQuery}>
        <Image src={logo} boxSize="60px" objectFit="cover" />
      </Link>

      <SearchInput />

      <HStack>
        <ColorModeSwitch />
        {isAuthenticated ? (
          <Menu>
            <Tooltip label="Admin">
              <MenuButton
                as={Avatar}
                size="sm"
                // Remove the name prop to hide the "A" letter
                cursor="pointer"
                _hover={{
                  boxShadow: "0 0 0 2px #319795", // teal.500
                  bg: "teal.100",
                  _dark: { bg: "teal.700" },
                }}
                _active={{
                  boxShadow: "0 0 0 2px #319795",
                  bg: "teal.200",
                  _dark: { bg: "teal.800" },
                }}
              />
            </Tooltip>
            <MenuList>
              <MenuItem
                onClick={() => {
                  logout();
                  localStorage.removeItem("token");
                  window.location.reload(); // Force UI to re-evaluate authentication state
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Tooltip label="Login">
            <IconButton
              aria-label="Login"
              icon={<FiUser />}
              onClick={onOpen}
              colorScheme="gray"
              variant="outline"
            />
          </Tooltip>
        )}
      </HStack>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default NavBar;
