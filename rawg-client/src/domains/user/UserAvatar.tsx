import { Avatar, AvatarProps, useColorModeValue } from "@chakra-ui/react";

interface UserAvatarProps extends AvatarProps {
  username: string;
}

const UserAvatar = ({ username, size = "md", ...props }: UserAvatarProps) => {
  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("teal.100", "teal.700");
  const activeBg = useColorModeValue("teal.200", "teal.800");

  return (
    <Avatar
      name={username}
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
      {...props} // Spread additional props for flexibility
    />
  );
};

export default UserAvatar;
