import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const handleOnSelectedGenre = (genre: Genre) => setSelectedGenre(genre);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem pl="2" area={"header"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          <GenreList
            onSelectedGenre={handleOnSelectedGenre}
            selectedGenre={selectedGenre}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
