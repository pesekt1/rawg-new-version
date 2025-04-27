import { useColorMode } from "@chakra-ui/react";
import { FaBookOpen, FaBook } from "react-icons/fa";
import UserGameRelationIcon from "./UserGameRelationIcon";
import libraryService from "../../../gameLibrary/gameLibraryService";

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
        add: libraryService.addToLibrary,
        remove: libraryService.removeFromLibrary,
      }}
      activeIcon={
        <FaBook color={colorMode === "light" ? "#3182ce" : "#63b3ed"} />
      }
      inactiveIcon={<FaBookOpen />}
    />
  );
};

export default GameLibraryIcon;
