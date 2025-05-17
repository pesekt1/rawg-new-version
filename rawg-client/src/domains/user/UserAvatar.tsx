import { Avatar, AvatarProps } from "@chakra-ui/react";

interface UserAvatarProps extends AvatarProps {
  username: string;
}

const UserAvatar = ({ username, size = "md", ...props }: UserAvatarProps) => {
  return (
    <Avatar
      name={username}
      size={size}
      cursor="pointer"
      bg="gray.200"
      _dark={{ bg: "gray.700" }}
      color="white"
      fontSize={size === "sm" ? "sm" : "md"}
      showBorder
      borderColor="teal.300"
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
      {...props} // Spread additional props for flexibility
    />
  );
};

export default UserAvatar;
