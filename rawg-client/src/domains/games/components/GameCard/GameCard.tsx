import { useState, useMemo } from "react";
import { Card, CardBody, Heading, HStack, Image, Box } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../../../utils/image-url";
import { Link } from "react-router-dom";
import { Response } from "../../../../services/api-client";
import { Game } from "../../Game";
import PlatformIconsList from "../../../platforms/PlatformIconsList";
import Emoji from "./Emoji";
import useScreenshots from "../../../screenshots/useScreenshots";
import ScreenshotPanel from "./ScreenshotPanel/ScreenshotPanel";
import WishListIcon from "./WishListIcon";
import GameLibraryIcon from "./GameLibraryIcon";
import { useAuth } from "../../../auth/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import useGameQueryStore from "../../../../state";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Only fetch screenshots when hovered
  const { data: screenshotsData } = useScreenshots(game.id, isHovered);
  const screenshots = screenshotsData?.results?.slice(0, 4) || [];
  const { user } = useAuth();
  const wishlistUserId = useGameQueryStore((s) => s.gameQuery.wishlistUserId);
  const libraryUserId = useGameQueryStore((s) => s.gameQuery.libraryUserId);
  const queryClient = useQueryClient();

  // Helper to remove a game from the games cache
  const removeGameFromCache = (gameId: number) => {
    queryClient.setQueryData<
      { pages: Response<Game>[]; pageParams: unknown[] } | undefined
    >(["games", { ...useGameQueryStore.getState().gameQuery }], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          results: page.results.filter((g) => g.id !== gameId),
        })),
      };
    });
  };

  const handleMouseLeave = () => {
    setCurrentIndex(0);
    setIsHovered(false);
  };

  const displayImage = useMemo(
    () =>
      currentIndex === 0 || screenshots.length === 0
        ? getCroppedImageUrl(game.background_image)
        : getCroppedImageUrl(screenshots[currentIndex - 1]?.image),
    [currentIndex, screenshots, game.background_image]
  );

  // Check if the current user has wishlisted this game
  const initialInWishlist =
    !!user &&
    Array.isArray(game.wishlistedBy) &&
    game.wishlistedBy.some((u) => u.id === user.id);

  // Check if the current user has this game in their library
  const initialInLibrary =
    !!user &&
    Array.isArray(game.inLibraryOf) &&
    game.inLibraryOf.some((u) => u.id === user.id);

  return (
    <Card
      position="relative"
      overflow="hidden"
      transition="transform 0.4s, filter 0.4s"
      _hover={{
        transform: "scale(1.05)",
        filter: "brightness(1.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Box position="relative">
        <Image src={displayImage} w="100%" h="220px" objectFit="cover" />
        {screenshots.length > 0 &&
          isHovered && ( // <-- show only on hover
            <ScreenshotPanel
              screenshots={screenshots}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}
      </Box>
      <CardBody p={4}>
        <HStack justifyContent="space-between">
          <PlatformIconsList
            platforms={game.parent_platforms}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          <HStack>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
            <Emoji rating_top={game.rating_top} />
          </HStack>
        </Heading>
        <Box mt={2} display="flex" gap={2}>
          <WishListIcon
            gameId={game.id}
            initialActive={initialInWishlist}
            onChange={(active) => {
              if (!active && wishlistUserId && user?.id === wishlistUserId) {
                removeGameFromCache(game.id);
              }
            }}
          />
          <GameLibraryIcon
            gameId={game.id}
            initialActive={initialInLibrary}
            onChange={(active) => {
              if (!active && libraryUserId && user?.id === libraryUserId) {
                removeGameFromCache(game.id);
              }
            }}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default GameCard;
