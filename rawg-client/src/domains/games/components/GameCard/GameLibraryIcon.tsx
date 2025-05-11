import { useColorMode } from "@chakra-ui/react";
import { FaGamepad } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import libraryService from "../../../gameLibrary/libraryService";

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
        add: libraryService.add,
        remove: libraryService.remove,
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
