import {
  Box,
  Heading,
  Image,
  VStack,
  Button,
  useStyleConfig,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Entity } from "../interfaces/Entity";

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
  name?: string; // Optional name for cases like loading skeletons
  image?: string; // Optional image for cases like loading skeletons
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
  name,
  image,
  renderDetails,
  setter,
}: EntityCardProps<T>) => {
  const navigate = useNavigate();
  const cardStyles = useStyleConfig("Card");
  const handleHeadingClick = () => {
    setter(entity.id); // Dynamically call the provided setter
    navigate("/");
  };

  return (
    <Box __css={cardStyles} overflow="hidden">
      <Box position="relative">
        <Image
          src={image || entity.image_background} // Use provided image or fallback to entity's image
          alt={name || entity.name} // Use provided name or fallback to entity's name
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
          <Heading
            size="md"
            isTruncated
            onClick={handleHeadingClick}
            cursor="pointer"
            textDecoration="underline"
            _hover={{
              textDecoration: "none",
              color: "teal.500",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {name || entity.name} {/* Use provided name or fallback */}
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
