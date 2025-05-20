import { Box, Heading, Center, Text, SimpleGrid } from "@chakra-ui/react";
import useUsers from "../domains/user/useUsers";
import UsersGrid from "../domains/user/UsersGrid";
import GameCardSkeleton from "../domains/games/components/GameCard/GameCardSkeleton"; // Use skeleton for loading

const UsersPage = () => {
  const { data, isLoading, error } = useUsers();
  const users = data?.results || [];

  if (isLoading && users.length === 0) {
    return (
      <Box>
        <Heading>All Users</Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
          spacing={4}
          margin={10}
        >
          {[...Array(10).keys()].map((skeleton) => (
            <GameCardSkeleton key={skeleton} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <Center minH="70vh">
        <Text fontSize="2xl" fontWeight="bold" color="purple.400">
          No users found...
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <Heading>All Users</Heading>
      <UsersGrid users={users} error={error} />
    </Box>
  );
};

export default UsersPage;
