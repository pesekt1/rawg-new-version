import { useColorMode } from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
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
        add: wishlistService.add,
        remove: wishlistService.remove,
      }}
      activeIcon={
        <FaStar color={colorMode === "light" ? "#ECC94B" : "#F6E05E"} />
      }
      inactiveIcon={<FaRegStar />}
    />
  );
};

export default WishListIcon;
