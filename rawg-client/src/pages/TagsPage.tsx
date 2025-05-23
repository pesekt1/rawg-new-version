import { Box, Heading, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import AttributeBadge from "../domains/games/components/AttributeBadge";
import useGameQueryStore from "../state/state";
import useTags from "../domains/tags/useTags";

const TagsPage = () => {
  const setTagId = useGameQueryStore((s) => s.setTagId);
  const { data, isLoading, error } = useTags();
  const tags = data?.results || [];

  if (isLoading)
    return (
      <Box
        minH="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Failed to load tags
      </Alert>
    );

  return (
    <Box maxW="3xl" mx="auto" mt={8} p={4}>
      <Heading mb={4}>Tags</Heading>
      <AttributeBadge items={tags} colorScheme="pink" onSetId={setTagId} />
    </Box>
  );
};

export default TagsPage;
