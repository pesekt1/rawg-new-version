import { Heading } from "@chakra-ui/react";
import useGameQueryStore from "../../../state";
import usePlatform from "../../platforms/usePlatform";
import useGenre from "../../genres/useGenre";
import useStore from "../../stores/useStore";
import useDeveloper from "../../developers/useDeveloper";
import useTag from "../../tags/useTag";
import usePublisher from "../../publishers/usePublisher";

const GameHeading = () => {
  const {
    genreId,
    platformId,
    storeId,
    wishlistUserId,
    libraryUserId,
    developerId,
    publisherId,
    tagId,
  } = useGameQueryStore((s) => s.gameQuery);

  const genre = useGenre(genreId);
  const platform = usePlatform(platformId);
  const store = useStore(storeId);
  const developer = useDeveloper(developerId);
  const tag = useTag(tagId);
  const publisher = usePublisher(publisherId);
  const developedBy = developer ? "developed by" : "";
  const publishedBy = publisher ? "published by" : "";
  const wishlist = wishlistUserId ? "Wishlist" : "";
  const library = libraryUserId ? "Library" : "";

  let heading = `${wishlist} ${library} ${store?.name || ""} ${
    platform?.name || ""
  } ${genre?.name || ""} Games ${developedBy} ${
    developer?.name || ""
  } ${publishedBy} ${publisher?.name || ""}`;

  //selecting tagId will override all other filters
  if (tag) {
    heading = `${tag.name} Games`;
  }

  return (
    <Heading as="h1" fontSize="5xl" paddingY={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
