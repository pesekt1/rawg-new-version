import { useColorMode } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import wishlistService from "../../../wishlist/wishlistService";

interface WishListIconProps {
  gameId: number;
  initialActive: boolean;
}

const WishListIcon = ({ gameId, initialActive }: WishListIconProps) => {
  const { colorMode } = useColorMode();
  return (
    <UserGameRelationIcon
      gameId={gameId}
      initialActive={initialActive}
      service={{
        add: wishlistService.addToWishlist,
        remove: wishlistService.removeFromWishlist,
      }}
      activeIcon={
        <FaHeart color={colorMode === "light" ? "#E53E3E" : "#F56565"} />
      }
      inactiveIcon={<FaRegHeart />}
    />
  );
};

export default WishListIcon;
