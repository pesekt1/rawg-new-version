import { HStack, Box, Image } from "@chakra-ui/react";

interface Screenshot {
  id: number;
  image: string;
}

interface GalleryThumbnailsProps {
  screenshots: Screenshot[];
  current: number;
  setCurrent: (idx: number) => void;
}

const GalleryThumbnails = ({
  screenshots,
  current,
  setCurrent,
}: GalleryThumbnailsProps) => (
  <HStack
    mt={6}
    px={6}
    pb={4}
    spacing={2}
    justify="center"
    overflowX="auto"
    maxW="100vw"
  >
    {screenshots.map((s, idx) => (
      <Box
        key={s.id}
        border={idx === current ? "2px solid #fff" : "2px solid transparent"}
        borderRadius="md"
        overflow="hidden"
        cursor="pointer"
        opacity={idx === current ? 1 : 0.7}
        onClick={() => setCurrent(idx)}
        minW="80px"
        maxW="120px"
        transition="border 0.2s, opacity 0.2s"
      >
        <Image src={s.image} h="60px" w="100%" objectFit="cover" />
      </Box>
    ))}
    {screenshots.length > 10 && (
      <Box color="white" fontWeight="bold" px={2}>
        ...
      </Box>
    )}
  </HStack>
);

export default GalleryThumbnails;
