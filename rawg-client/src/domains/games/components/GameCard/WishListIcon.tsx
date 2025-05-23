import { useColorMode } from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import userService from "../../../user/userService";

interface WishListIconProps {
  gameId: number;
  initialActive: boolean;
  onChange?: (active: boolean) => void;
}

const WishListIcon = ({
  gameId,
  initialActive,
  onChange,
}: WishListIconProps) => {
  const { colorMode } = useColorMode();
  return (
    <UserGameRelationIcon
      gameId={gameId}
      initialActive={initialActive}
      service={{
        add: () => userService.addGame(gameId, "wishlist"), // Pass gameId correctly
        remove: () => userService.removeGame(gameId, "wishlist"), // Pass gameId correctly
      }}
      activeIcon={
        <FaStar color={colorMode === "light" ? "#ECC94B" : "#F6E05E"} />
      }
      inactiveIcon={<FaRegStar />}
      onChange={onChange}
    />
  );
};

export default WishListIcon;
