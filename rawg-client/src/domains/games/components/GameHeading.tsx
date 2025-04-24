import { Heading } from "@chakra-ui/react";
import useGenres from "../../genres/useGenres";
import useGameQueryStore from "../../../state";
import usePlatform from "../../platforms/usePlatform";

const GameHeading = () => {
  const { genreId, platformId } = useGameQueryStore((s) => s.gameQuery);

  const { data: dataGenres } = useGenres();
  const genre = dataGenres?.results.find((g) => g.id === genreId);

  const platform = usePlatform(platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" fontSize="5xl" paddingY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
