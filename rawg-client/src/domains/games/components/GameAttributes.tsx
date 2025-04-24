import {
  SimpleGrid,
  Box,
  Badge,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Game } from "../Game";
import DefinitionItem from "../../../components/DefinitionItem";
import CriticScore from "../components/GameCard/CriticScore";

interface Props {
  game: Game;
}

const AttributeBadge = ({
  items,
  colorScheme,
}: {
  items: { id: number; name: string }[];
  colorScheme: string;
}) => (
  <Stack direction="row" flexWrap="wrap" spacing={2}>
    {items.map((item) => (
      <Badge
        key={item.id}
        colorScheme={colorScheme}
        variant="subtle"
        px={2}
        py={1}
        borderRadius="md"
        fontSize="sm"
      >
        {item.name}
      </Badge>
    ))}
  </Stack>
);

const GameAttributes = ({ game }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  const platformBadges = game.parent_platforms.map((p) => ({
    id: p.platform.id,
    name: p.platform.name,
  }));

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
          <AttributeBadge items={platformBadges} colorScheme="blue" />
        </DefinitionItem>

        <DefinitionItem term="Metacritic">
          <CriticScore score={game.metacritic} />
        </DefinitionItem>

        <DefinitionItem term="Genres">
          <AttributeBadge items={game.genres} colorScheme="purple" />
        </DefinitionItem>

        <DefinitionItem term="Publishers">
          <AttributeBadge items={game.publishers} colorScheme="orange" />
        </DefinitionItem>
      </SimpleGrid>
    </Box>
  );
};

export default GameAttributes;
