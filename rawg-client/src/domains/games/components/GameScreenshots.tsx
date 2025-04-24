import { Image, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import useScreenshots from "../../screenshots/useScreenshots";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data } = useScreenshots(gameId);
  const gridBg = useColorModeValue("whiteAlpha.700", "gray.800");

  return (
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
      {data?.results.map((screenshot) => (
        <Image
          key={screenshot.id}
          src={screenshot.image}
          borderRadius="md"
          boxShadow="lg"
          transition="transform 0.2s, box-shadow 0.2s"
          _hover={{
            transform: "scale(1.03)",
            boxShadow: "2xl",
          }}
          objectFit="cover"
          w="100%"
          h="200px"
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
