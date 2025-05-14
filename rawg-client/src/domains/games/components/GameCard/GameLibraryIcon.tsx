import { useColorMode } from "@chakra-ui/react";
import { FaGamepad } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import userService from "../../../user/userService";

interface GameLibraryIconProps {
  gameId: number;
  initialActive: boolean;
  onChange?: (active: boolean) => void; // <-- add this line
}

const GameLibraryIcon = ({
  gameId,
  initialActive,
  onChange,
}: GameLibraryIconProps) => {
  const { colorMode } = useColorMode();
  return (
    <UserGameRelationIcon
      gameId={gameId}
      initialActive={initialActive}
      service={{
        add: () => userService.addGame(gameId, "library"), // Pass gameId correctly
        remove: () => userService.removeGame(gameId, "library"), // Pass gameId correctly
      }}
      activeIcon={
        <FaGamepad color={colorMode === "light" ? "#38A169" : "#68D391"} />
      }
      inactiveIcon={<FaGamepad />}
      onChange={onChange}
    />
  );
};

export default GameLibraryIcon;
