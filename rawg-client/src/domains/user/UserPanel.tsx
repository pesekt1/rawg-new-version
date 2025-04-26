import {
  HStack,
  Avatar,
  Text,
  VStack,
  Box,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { FaGift } from "react-icons/fa";
import { useAuth } from "../../domains/auth/useAuth";
import useGameQueryStore from "../../state";
import { useState } from "react";

const UserPanel = () => {
  const { user } = useAuth();
  const setWishlistId = useGameQueryStore((s) => s.setWishlistId);
  const [loading] = useState(false);

  const handleWishlistClick = () => {
    if (user?.id) {
      setWishlistId(user.id);
    }
  };

  const handleWishlistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleWishlistClick();
    }
  };

  if (!user) return null;

  return (
    <VStack align="start" spacing={6} mb={6}>
      <HStack spacing={3} alignItems="center">
        <Text fontWeight="bold" fontSize="2xl" color="white">
          {user.username}
        </Text>
        <Avatar name={user.username} color="white" size="md">
          {user.username[0]?.toUpperCase()}
        </Avatar>
      </HStack>
      <Box
        w="100%"
        cursor="pointer"
        onClick={handleWishlistClick}
        onKeyDown={handleWishlistKeyDown}
        role="button"
        tabIndex={0}
        display="flex"
        alignItems="center"
        gap={2}
        px={2}
        py={1}
        borderRadius="md"
        _hover={{ bg: "gray.700" }}
        transition="background 0.2s"
      >
        <Box
          bg="gray.700"
          color="white"
          borderRadius="md"
          p={2}
          display="flex"
          alignItems="center"
        >
          <Icon as={FaGift} boxSize={6} />
        </Box>
        <Text fontWeight="bold" fontSize="md">
          Wishlist
        </Text>
        {loading && <Spinner size="xs" ml={2} />}
      </Box>
      {/* Add more user-related items here in the future */}
    </VStack>
  );
};

export default UserPanel;
