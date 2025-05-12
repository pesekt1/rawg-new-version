import {
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiUser, FiUserPlus } from "react-icons/fi";
import LoginModal from "../../domains/auth/LoginModal";
import RegisterModal from "../../domains/auth/RegisterModal";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import Logo from "./Logo";

const NavBar = () => {
  const resetGameQuery = useGameQueryStore((state) => state.reset);
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  const { isAuthenticated, logout, role } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.reload(); // Temporary solution
  };

  const authContent = isAuthenticated ? (
    <Menu>
      <Tooltip label={role === "admin" ? "Admin" : "User"}>
        <MenuButton
          as={Avatar}
          size="sm"
          cursor="pointer"
          _hover={{
            boxShadow: "0 0 0 2px #319795",
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <>
      <Tooltip label="Login">
        <IconButton
          aria-label="Login"
          icon={<FiUser />}
          onClick={onLoginOpen}
          colorScheme="gray"
          variant="outline"
        />
      </Tooltip>
      <Tooltip label="Register">
        <IconButton
          aria-label="Register"
          icon={<FiUserPlus />}
          onClick={onRegisterOpen}
          colorScheme="gray"
          variant="outline"
        />
      </Tooltip>
    </>
  );

  return (
    <Box py={2}>
      <VStack
        spacing={4}
        align="stretch"
        display={{ base: "flex", md: "none" }} // Stack vertically on small screens
      >
        <HStack justifyContent="space-between">
          <Link to="/" onClick={resetGameQuery}>
            <Logo />
          </Link>
          <ColorModeSwitch />
        </HStack>
        <HStack justifyContent="space-between">
          <SearchInput />
          {authContent}
        </HStack>
      </VStack>
      <HStack
        justifyContent="space-between"
        px={4}
        display={{ base: "none", md: "flex" }} // Restore original layout for larger screens
      >
        <Link to="/" onClick={resetGameQuery}>
          <Logo />
        </Link>
        <SearchInput />
        <HStack>
          <ColorModeSwitch />
          {authContent}
        </HStack>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </Box>
  );
};

export default NavBar;
