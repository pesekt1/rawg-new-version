import { useState } from "react";
import { Card, CardBody, Heading, HStack, Image, Box } from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../../../services/image-url";
import { Link } from "react-router-dom";
import { Game } from "../../Game";
import PlatformIconsList from "../../../platforms/PlatformIconsList";
import Emoji from "./Emoji";
import useScreenshots from "../../../screenshots/useScreenshots";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { data: screenshotsData } = useScreenshots(game.id);
  const screenshots = screenshotsData?.results?.slice(0, 4) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // On leave, reset to the original image that was shown before
  const handleMouseLeave = () => {
    setCurrentIndex(0);
  };

  // Show main image if not selecting a screenshot
  const displayImage =
    currentIndex === 0 || screenshots.length === 0
      ? getCroppedImageUrl(game.background_image)
      : getCroppedImageUrl(screenshots[currentIndex - 1]?.image);

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
          <HStack
            position="absolute"
            left="50%"
            bottom="12px"
            transform="translateX(-50%)"
            spacing={2}
            zIndex={2}
            bg="rgba(0,0,0,0.35)"
            px={3}
            py={1}
            borderRadius="md"
          >
            <Box
              as="button"
              w="28px"
              h="6px"
              borderRadius="full"
              bg={currentIndex === 0 ? "whiteAlpha.900" : "whiteAlpha.500"}
              border={currentIndex === 0 ? "2px solid #fff" : "none"}
              transition="background 0.2s"
              onMouseEnter={() => setCurrentIndex(0)}
              aria-label="Main image"
            />
            {screenshots.map((s, idx) => (
              <Box
                as="button"
                key={s.id}
                w="28px"
                h="6px"
                borderRadius="full"
                bg={
                  currentIndex === idx + 1 ? "whiteAlpha.900" : "whiteAlpha.500"
                }
                border={currentIndex === idx + 1 ? "2px solid #fff" : "none"}
                transition="background 0.2s"
                onMouseEnter={() => setCurrentIndex(idx + 1)}
                aria-label={`Screenshot ${idx + 1}`}
              />
            ))}
          </HStack>
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
