import {
  SimpleGrid,
  Box,
  Badge,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Game } from "../Game";
import DefinitionItem from "../../../components/DefinitionItem";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor={cardBorder}
      p={5}
      my={4}
    >
      <SimpleGrid columns={2} as="dl" spacing={4}>
        <DefinitionItem term="Platforms">
          <Stack direction="row" flexWrap="wrap" spacing={2}>
            {game.parent_platforms.map((platform) => (
              <Badge
                key={platform.platform.id}
                colorScheme="blue"
                variant="subtle"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                {platform.platform.name}
              </Badge>
            ))}
          </Stack>
        </DefinitionItem>

        <DefinitionItem term="Metacritic">
          <Badge
            colorScheme={
              game.metacritic >= 75
                ? "green"
                : game.metacritic >= 50
                ? "yellow"
                : "red"
            }
            fontSize="md"
            px={3}
            py={1}
            borderRadius="md"
          >
            {game.metacritic}
          </Badge>
        </DefinitionItem>

        <DefinitionItem term="Genres">
          <Stack direction="row" flexWrap="wrap" spacing={2}>
            {game.genres.map((genre) => (
              <Badge
                key={genre.id}
                colorScheme="purple"
                variant="subtle"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                {genre.name}
              </Badge>
            ))}
          </Stack>
        </DefinitionItem>

        <DefinitionItem term="Publishers">
          <Stack direction="row" flexWrap="wrap" spacing={2}>
            {game.publishers.map((publisher) => (
              <Badge
                key={publisher.id}
                colorScheme="orange"
                variant="subtle"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                {publisher.name}
              </Badge>
            ))}
          </Stack>
        </DefinitionItem>
      </SimpleGrid>
    </Box>
  );
};

export default GameAttributes;
