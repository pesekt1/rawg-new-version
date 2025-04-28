import { useColorMode } from "@chakra-ui/react";
import { FaArchive, FaGamepad } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import libraryService from "../../../gameLibrary/libraryService";

interface GameLibraryIconProps {
  gameId: number;
  initialActive: boolean;
}

const GameLibraryIcon = ({ gameId, initialActive }: GameLibraryIconProps) => {
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
    />
  );
};

export default GameLibraryIcon;
