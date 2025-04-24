import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "../domains/genres/GenreList";
import StoreList from "../domains/stores/StoreList";
import GameHeading from "../domains/games/components/GameHeading";
import PlatformSelector from "../domains/platforms/PlatformSelector";
import SortSelector from "../domains/games/components/SortSelector";
import PublisherList from "../domains/publishers/PublisherList";
import AddGameButton from "../domains/games/components/AddGameButton";
import GameGrid from "../domains/games/components/GameGrid";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <Show above="lg">
        <GridItem area={"aside"}>
          <GenreList />
          <StoreList />
          <PublisherList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingLeft={2}>
          <AddGameButton />
          <GameHeading />
          <HStack>
            <PlatformSelector />
            <SortSelector />
          </HStack>
          <GameGrid />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
