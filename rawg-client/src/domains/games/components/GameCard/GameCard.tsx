import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../../../services/image-url";
import { Link } from "react-router-dom";
import { Game } from "../../Game";
import PlatformIconsList from "../../../platforms/PlatformIconsList";
import Emoji from "./Emoji";
import useScreenshots from "../../../screenshots/useScreenshots";
import ScreenshotPanel from "./ScreenshotPanel/ScreenshotPanel";
import UserGameRelationIcon from "./UserGameRelationIcon";
import wishlistService from "../../../wishlist/wishlistService";
import libraryService from "../../../gameLibrary/gameLibraryService";
import { FaRegHeart, FaHeart, FaBookOpen, FaBook } from "react-icons/fa";
import { useAuth } from "../../../auth/useAuth";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { data: screenshotsData } = useScreenshots(game.id);
  const screenshots = screenshotsData?.results?.slice(0, 4) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // <-- add hover state

  const { user } = useAuth();
  const { colorMode } = useColorMode();

  const handleMouseLeave = () => {
    setCurrentIndex(0);
    setIsHovered(false); // <-- reset hover state
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
      onMouseEnter={() => setIsHovered(true)} // <-- set hover state
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
            platforms={game.parent_platforms.map((p) => p.platform)}
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
          <UserGameRelationIcon
            gameId={game.id}
            initialActive={initialInWishlist}
            service={{
              add: wishlistService.addToWishlist,
              remove: wishlistService.removeFromWishlist,
            }}
            activeIcon={
              <FaHeart color={colorMode === "light" ? "#E53E3E" : "#F56565"} />
            }
            inactiveIcon={<FaRegHeart />}
          />
          <UserGameRelationIcon
            gameId={game.id}
            initialActive={initialInLibrary}
            service={{
              add: libraryService.addToLibrary,
              remove: libraryService.removeFromLibrary,
            }}
            activeIcon={
              <FaBook color={colorMode === "light" ? "#3182ce" : "#63b3ed"} />
            }
            inactiveIcon={<FaBookOpen />}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default GameCard;
