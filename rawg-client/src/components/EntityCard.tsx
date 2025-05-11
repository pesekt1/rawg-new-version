import { Box, Heading, Image, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/**
 * Props for the `EntityCard` component.
 *
 * @template T - The type of the entity being displayed.
 * @property entity - The entity to display in the card.
 * @property image - The URL of the image to display for the entity.
 * @property name - The name of the entity.
 * @property renderDetails - Optional function to render additional details about the entity.
 * @property setter - A function to set the selected entity's ID.
 */
interface EntityCardProps<T> {
  entity: T;
  image: string;
  name: string;
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
const EntityCard = <T extends { id: number }>({
  entity,
  image,
  name,
  renderDetails,
  setter,
}: EntityCardProps<T>) => {
  const navigate = useNavigate();

  const handleHeadingClick = () => {
    setter(entity.id); // Dynamically call the provided setter
    navigate("/");
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _dark={{ bg: "gray.800" }}
      maxW="sm"
    >
      <Box position="relative">
        <Image src={image} alt={name} objectFit="cover" w="100%" h="150px" />
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
            {name}
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
