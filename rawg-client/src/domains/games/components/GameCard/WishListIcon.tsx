import { IconButton, useToast, useColorMode } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import wishlistService from "../../../wishlist/wishlistService";

interface WishListIconProps {
  gameId: number;
  initialInWishlist: boolean;
}

const WishListIcon = ({ gameId, initialInWishlist }: WishListIconProps) => {
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleToggle = async () => {
    if (!user?.id) {
      toast({
        title: "Login required",
        description: "Please log in to use the wishlist.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      if (inWishlist) {
        await wishlistService.removeFromWishlist(user.id, gameId);
        setInWishlist(false);
      } else {
        await wishlistService.addToWishlist(user.id, gameId);
        setInWishlist(true);
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not update wishlist.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      icon={
        inWishlist ? (
          <FaHeart color={colorMode === "light" ? "#E53E3E" : "#F56565"} />
        ) : (
          <FaRegHeart />
        )
      }
      isLoading={loading}
      variant="ghost"
      size="md"
      fontSize="1.5rem"
      bg="transparent"
      _hover={{
        bg: colorMode === "light" ? "gray.100" : "gray.700",
        color: colorMode === "light" ? "red.400" : "red.300",
      }}
      _active={{
        bg: colorMode === "light" ? "gray.200" : "gray.600",
      }}
      onClick={handleToggle}
      tabIndex={0}
      transition="all 0.15s"
    />
  );
};

export default WishListIcon;
