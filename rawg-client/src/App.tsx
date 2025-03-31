import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
import useGenres, { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import useStores, { Store } from "./hooks/useStores";
import CustomList from "./components/CustomList";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  store: Store | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleOnSelectedGenre = (genre: Genre | null) =>
    setGameQuery({ ...gameQuery, genre });
  const handleOnSelectedPlatform = (platform: Platform | null) =>
    setGameQuery({ ...gameQuery, platform });
  const handleSelectedStore = (store: Store | null) =>
    setGameQuery({ ...gameQuery, store });
  const handleOnSelectedSortOrder = (sortOrder: string) =>
    setGameQuery({ ...gameQuery, sortOrder });
  const handleOnSearch = (searchText: string) =>
    setGameQuery({ ...gameQuery, searchText });

  return (
    <Grid
      paddingX="4"
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area={"header"}>
        <NavBar onSearch={handleOnSearch} />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>
          <CustomList
            title="Genres"
            onSelectedItem={handleOnSelectedGenre}
            selectedItem={gameQuery.genre}
            useDataHook={useGenres}
          />
          <CustomList
            title="Stores"
            onSelectedItem={handleSelectedStore}
            selectedItem={gameQuery.store}
            useDataHook={useStores}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <HStack>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectedPlatform={handleOnSelectedPlatform}
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={handleOnSelectedSortOrder}
            />
          </HStack>
          <GameGrid gameQuery={gameQuery} />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
