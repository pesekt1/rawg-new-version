import { Image, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import useScreenshots from "../../screenshots/useScreenshots";
import { useState } from "react";
import ScreenshotGallery from "./ScreenshotGallery";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data } = useScreenshots(gameId);
  const gridBg = useColorModeValue("whiteAlpha.700", "gray.800");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const screenshots = data?.results || [];

  const handleOpenGallery = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  return (
    <>
      <SimpleGrid
        spacing={4}
        p={4}
        borderRadius="lg"
        bg={gridBg}
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        boxShadow="md"
      >
        {screenshots.map((screenshot, idx) => (
          <Image
            key={screenshot.id}
            src={screenshot.image}
            borderRadius="md"
            boxShadow="lg"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "2xl",
              cursor: "pointer",
            }}
            objectFit="cover"
            w="100%"
            h="200px"
            onClick={() => handleOpenGallery(idx)}
          />
        ))}
      </SimpleGrid>
      {galleryOpen && (
        <ScreenshotGallery
          screenshots={screenshots}
          initialIndex={galleryIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
};

export default GameScreenshots;
