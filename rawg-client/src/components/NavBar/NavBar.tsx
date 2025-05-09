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
        <MenuItem
          onClick={() => {
            logout();
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </MenuItem>
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
    <HStack justifyContent="space-between" p={4}>
      <Link to="/" onClick={resetGameQuery}>
        <Logo />
      </Link>
      <SearchInput />
      <HStack>
        <ColorModeSwitch />
        {authContent}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
    </HStack>
  );
};

export default NavBar;
