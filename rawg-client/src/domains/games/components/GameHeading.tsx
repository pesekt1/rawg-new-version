import { Heading } from "@chakra-ui/react";
import useGameQueryStore from "../../../state";
import usePlatform from "../../platforms/usePlatform";
import useGenre from "../../genres/useGenre";
import useStore from "../../stores/useStore";

const GameHeading = () => {
  const { genreId, platformId, storeId, wishlistUserId, libraryUserId } =
    useGameQueryStore((s) => s.gameQuery);

  const genre = useGenre(genreId);
  const platform = usePlatform(platformId);
  const store = useStore(storeId);

  let heading = `${store?.name || ""} ${platform?.name || ""} ${
    genre?.name || ""
  } Games`;

  if (wishlistUserId) {
    heading = "Games in Wishlist";
  }

  if (libraryUserId) {
    heading = "Games in Library";
  }

  return (
    <Heading as="h1" fontSize="5xl" paddingY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
