import { useState, useMemo } from "react";
import { Card, CardBody, Heading, HStack, Image, Box } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../../../services/image-url";
import { Link } from "react-router-dom";
import { Game } from "../../Game";
import PlatformIconsList from "../../../platforms/PlatformIconsList";
import Emoji from "./Emoji";
import useScreenshots from "../../../screenshots/useScreenshots";
import ScreenshotPanel from "./ScreenshotPanel/ScreenshotPanel";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { data: screenshotsData } = useScreenshots(game.id);
  const screenshots = screenshotsData?.results?.slice(0, 4) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseLeave = () => setCurrentIndex(0);

  const displayImage = useMemo(
    () =>
      currentIndex === 0 || screenshots.length === 0
        ? getCroppedImageUrl(game.background_image)
        : getCroppedImageUrl(screenshots[currentIndex - 1]?.image),
    [currentIndex, screenshots, game.background_image]
  );

  return (
    <Card
      position="relative"
      overflow="hidden"
      transition="transform 0.4s, filter 0.4s"
      _hover={{
        transform: "scale(1.05)",
        filter: "brightness(1.2)",
      }}
      onMouseLeave={handleMouseLeave}
    >
      <Box position="relative">
        <Image src={displayImage} w="100%" h="220px" objectFit="cover" />
        {screenshots.length > 0 && (
          <ScreenshotPanel
            screenshots={screenshots}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </Box>
      <CardBody>
        <Heading fontSize="2xl">
          <HStack>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
            <Emoji rating_top={game.rating_top} />
          </HStack>
        </Heading>
        <HStack justifyContent="space-between">
          <PlatformIconsList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
