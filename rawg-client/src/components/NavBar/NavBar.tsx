import {
  HStack,
  IconButton,
  useDisclosure,
  Tooltip,
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
import useGameQueryStore from "../../state/state";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import Logo from "./Logo";
import UserAvatar from "../../domains/user/UserAvatar";
import useAuthStore from "../../state/useAuthStore";
import useBrowseListStore from "../../state/useBrowseListStore";

const NavBar = () => {
  const resetGameQuery = useGameQueryStore((state) => state.reset);
  const resetBrowseListKey = useBrowseListStore((state) => state.reset);

  const handleClick = () => {
    //reset the state
    resetGameQuery();
    resetBrowseListKey();
  };

  const NavBarLogo = () => (
    <Link to="/" onClick={handleClick}>
      <Logo />
    </Link>
  );

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

  const { logout, isAuthenticated } = useAuth();
  const user = useAuthStore((s) => s.user);

  const authContent = isAuthenticated ? (
    <Menu>
      <Tooltip label={user?.role === "admin" ? "Admin" : "User"}>
        <MenuButton>
          <UserAvatar user={user} size="sm" />
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
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
    <Box>
      <VStack
        spacing={4}
        align="stretch"
        display={{ base: "flex", md: "none" }} // Stack vertically on small screens
      >
        <HStack justifyContent="space-between">
          <NavBarLogo />
          <ColorModeSwitch />
        </HStack>
        <HStack justifyContent="space-between">
          <SearchInput />
          {authContent}
        </HStack>
      </VStack>
      <HStack
        justifyContent="space-between"
        display={{ base: "none", md: "flex" }} // Restore original layout for larger screens
      >
        <NavBarLogo />
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
