import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../state/state";
import useTags from "../domains/tags/useTags";

const TagsPage = () => {
  const setTagId = useGameQueryStore((s) => s.setTagId);
  const { data, isLoading, error } = useTags();
  const tags = data?.results || [];
  const navigate = useNavigate();

  // Black/white/gray color styles for both themes
  const badgeBg = useColorModeValue("white", "gray.900");
  const badgeHoverBg = useColorModeValue("gray.100", "gray.700");
  const badgeColor = useColorModeValue("black", "gray.200");
  const badgeBorder = useColorModeValue("gray.300", "gray.600");

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
    <Box mx="auto" mt={8} p={4}>
      <Heading mb={4}>Tags</Heading>
      {tags.length === 0 ? (
        <Text fontSize="2xl" fontWeight="bold" color="gray.500" p={4}>
          No tags found...
        </Text>
      ) : (
        <Flex wrap="wrap" gap={3}>
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              py={2}
              px={2}
              fontSize={{ base: "sm", md: "md" }}
              borderRadius="md"
              cursor="pointer"
              color={badgeColor}
              bg={badgeBg}
              border={`1px solid`}
              borderColor={badgeBorder}
              transition="all 0.15s"
              _hover={{
                bg: badgeHoverBg,
                color: badgeColor,
                textDecoration: "underline",
                boxShadow: "md",
              }}
              onClick={() => {
                setTagId(tag.id);
                navigate("/");
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default TagsPage;
