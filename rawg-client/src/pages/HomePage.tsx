import { Box, HStack, Show } from "@chakra-ui/react";
import SidebarModal from "../components/SidebarModal";
import { useAuth } from "../domains/auth/useAuth";
import AddGameButton from "../domains/games/components/AddGameButton";
import GameGrid from "../domains/games/components/GameGrid";
import GameHeading from "../domains/games/components/GameHeading";
import SortSelector from "../domains/games/components/SortSelector";
import PlatformSelector from "../domains/platforms/PlatformSelector";

const HomePage = () => {
  const { role } = useAuth();
  return (
    <Box>
      <Box marginLeft={2}>
        <HStack paddingBottom={2}>
          {role === "admin" && <AddGameButton />}
          <GameHeading />
        </HStack>
        <Box
          marginBottom={2}
          display="flex"
          width="fit-content"
          flexDirection={{ base: "column", md: "row" }}
          gap={2}
        >
          <Box display="flex" flexDirection="row" gap={2}>
            <Show below="lg">
              <SidebarModal />
            </Show>
            <PlatformSelector />
          </Box>
          <SortSelector />
        </Box>
      </Box>
      <GameGrid />
    </Box>
  );
};

export default HomePage;
