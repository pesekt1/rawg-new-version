import { SimpleGrid, Box, useColorModeValue } from "@chakra-ui/react";
import { Game } from "../Game";
import DefinitionItem from "../../../components/DefinitionItem";
import CriticScore from "../components/GameCard/CriticScore";
import AttributeBadge from "./AttributeBadge";
import useGameQueryStore from "../../../state";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const setGenreId = useGameQueryStore((s) => s.setGenreId);
  const setPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const setPublisherId = useGameQueryStore((s) => s.setPublisherId);
  const setStoreId = useGameQueryStore((s) => s.setStoreId);
  const setDeveloperId = useGameQueryStore((s) => s.setDeveloperId);
  const setTagId = useGameQueryStore((s) => s.setTagId);

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
          <AttributeBadge
            items={platformBadges}
            colorScheme="blue"
            onSetId={setPlatformId}
          />
        </DefinitionItem>
        <DefinitionItem term="Genres">
          <AttributeBadge
            items={game.genres}
            colorScheme="purple"
            onSetId={setGenreId}
          />
        </DefinitionItem>
        <DefinitionItem term="Publishers">
          <AttributeBadge
            items={game.publishers}
            colorScheme="orange"
            onSetId={setPublisherId}
          />
        </DefinitionItem>
        <DefinitionItem term="Stores">
          <AttributeBadge
            items={game.stores}
            colorScheme="green"
            onSetId={setStoreId}
          />
        </DefinitionItem>
        <DefinitionItem term="Developers">
          <AttributeBadge
            items={game.developers}
            colorScheme="teal"
            onSetId={setDeveloperId}
          />
        </DefinitionItem>
        <DefinitionItem term="Tags">
          <AttributeBadge
            items={game.tags}
            colorScheme="pink"
            onSetId={setTagId}
          />
        </DefinitionItem>
        <DefinitionItem term="Release date">{game.released}</DefinitionItem>
        <DefinitionItem term="Website">
          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "underline" }}
          >
            {game.website}
          </a>
        </DefinitionItem>
        <DefinitionItem term="Metacritic">
          <CriticScore score={game.metacritic} />
        </DefinitionItem>
      </SimpleGrid>
    </Box>
  );
};

export default GameAttributes;
