import { Heading } from "@chakra-ui/react";
import useGenres from "../../genres/useGenres";
import useGameQueryStore from "../../../state";
import usePlatform from "../../platforms/usePlatform";

const GameHeading = () => {
  const { genreId, platformId, wishlistId, libraryId } = useGameQueryStore(
    (s) => s.gameQuery
  );

  const { data: dataGenres } = useGenres();
  const genre = dataGenres?.results.find((g) => g.id === genreId);

  const platform = usePlatform(platformId);

  let heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  if (wishlistId) {
    heading = "Games in Wishlist";
  }

  if (libraryId) {
    heading = "Games in Library";
  }

  return (
    <Heading as="h1" fontSize="5xl" paddingY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
