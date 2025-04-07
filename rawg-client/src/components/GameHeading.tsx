import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const { data: dataGenres } = useGenres();
  const genre = dataGenres?.results.find((g) => g.id === gameQuery.genreId);

  const { data: dataPlatforms } = usePlatforms();
  const platform = dataPlatforms?.results.find(
    (p) => p.id === gameQuery.platformId
  );

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" fontSize="5xl" paddingY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
