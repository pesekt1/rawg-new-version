import { Avatar, AvatarProps, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { User } from "./User";

interface UserAvatarProps extends AvatarProps {
  user: User | null;
}

const UserAvatar = ({ user, size = "md", ...props }: UserAvatarProps) => {
  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("teal.100", "teal.700");
  const activeBg = useColorModeValue("teal.200", "teal.800");
  const navigate = useNavigate();

  return (
    <Avatar
      name={user?.username}
      src={user?.avatarUrl || undefined}
      size={size}
      cursor="pointer"
      bg={bg}
      color={color}
      fontSize={size === "sm" ? "sm" : "md"}
      showBorder
      borderColor="teal.300"
      _hover={{
        boxShadow: "0 0 0 2px #319795",
        bg: hoverBg,
      }}
      _active={{
        boxShadow: "0 0 0 2px #319795",
        bg: activeBg,
      }}
      onClick={() => {
        if (user?.id) navigate(`/users/${user.id}`);
      }}
      {...props} // Spread additional props for flexibility
    />
  );
};

export default UserAvatar;
