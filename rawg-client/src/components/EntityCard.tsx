import { Box, Heading, Image, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface EntityCardProps<T> {
  entity: T;
  image: string;
  name: string;
  renderDetails?: (entity: T) => React.ReactNode;
  setter: (id: number | undefined) => void; // Setter function from zustand
}

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
