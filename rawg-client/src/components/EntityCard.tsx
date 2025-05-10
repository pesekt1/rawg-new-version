import { Box, Heading, Image, VStack, Button } from "@chakra-ui/react";

interface EntityCardProps<T> {
  entity: T;
  image: string;
  name: string;
  renderDetails?: (entity: T) => React.ReactNode;
}

const EntityCard = <T,>({
  entity,
  image,
  name,
  renderDetails,
}: EntityCardProps<T>) => {
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
          <Heading size="md" isTruncated>
            {name}
          </Heading>
        </Box>
      </Box>
      <VStack align="start" p={4} spacing={3}>
        {renderDetails && renderDetails(entity)}
        <Button colorScheme="teal" size="sm" alignSelf="stretch">
          Follow
        </Button>
      </VStack>
    </Box>
  );
};

export default EntityCard;
