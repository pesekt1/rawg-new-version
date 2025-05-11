import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "../domains/genres/GenreList";
import StoreList from "../domains/stores/StoreList";
import GameHeading from "../domains/games/components/GameHeading";
import PlatformSelector from "../domains/platforms/PlatformSelector";
import SortSelector from "../domains/games/components/SortSelector";
import PublisherList from "../domains/publishers/PublisherList";
import AddGameButton from "../domains/games/components/AddGameButton";
import GameGrid from "../domains/games/components/GameGrid";
import { useAuth } from "../domains/auth/useAuth";
import UserPanel from "../domains/user/UserPanel";
import DeveloperList from "../domains/developers/DeveloperList";
import SidebarModal from "../components/SidebarModal";

const HomePage = () => {
  const { role } = useAuth();
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <Show above="lg">
        <GridItem area={"aside"} paddingRight={2}>
          <UserPanel />
          <GenreList />
          <StoreList />
          <PublisherList />
          <DeveloperList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box>
          <HStack paddingBottom={2}>
            {role === "admin" && <AddGameButton />}
            <GameHeading />
          </HStack>
          <Box
            paddingBottom={4}
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
          <GameGrid />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
