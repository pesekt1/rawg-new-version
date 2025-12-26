import {
  Box,
  Heading,
  Image,
  VStack,
  Button,
  useStyleConfig,
} from "@chakra-ui/react";
import { Entity } from "../interfaces/Entity";
import getCroppedImageUrl from "../utils/image-url";
import { Link } from "react-router-dom";

/**
 * Props for the `EntityCard` component.
 *
 * @template T - The type of the entity being displayed.
 * @property entity - The entity to display in the card.
 * @property renderDetails - Optional function to render additional details about the entity.
 * @property setter - A function to set the selected entity's ID.
 */
interface EntityCardProps<T extends Entity> {
  entity: T;
  renderDetails?: (entity: T) => React.ReactNode;
  setter: (id: number | undefined) => void;
}

/**
 * A card component for displaying an entity with an image, name, and optional details.
 *
 * @template T - The type of the entity being displayed.
 * @param props - The props for the component.
 * @returns A styled card with an image, name, and optional details.
 */
const EntityCard = <T extends Entity>({
  entity,
  renderDetails,
  setter,
}: EntityCardProps<T>) => {
  const cardStyles = useStyleConfig("Card");

  return (
    <Box __css={cardStyles} overflow="hidden">
      <Box position="relative">
        <Image
          src={getCroppedImageUrl(entity?.image_background)}
          alt={entity.name}
          objectFit="cover"
          w="100%"
          h="150px"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="rgba(0, 0, 0, 0.6)"
          color="white"
          p={2}
          textAlign="center"
        >
          <Heading size="md" isTruncated>
            <Link to="/" onClick={() => setter(entity.id)}>
              {entity.name}
            </Link>
          </Heading>
        </Box>
      </Box>
      <VStack align="start" p={4} spacing={3}>
        {renderDetails && renderDetails(entity)}
        <Button colorScheme="teal" size="sm" alignSelf={"center"}>
          Follow
        </Button>
      </VStack>
    </Box>
  );
};

export default EntityCard;
