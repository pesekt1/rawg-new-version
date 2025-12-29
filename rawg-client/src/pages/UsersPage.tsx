import { Box, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import EntityGrid from "../components/EntityGrid";
import GameCardSkeleton from "../domains/games/components/GameCard/GameCardSkeleton"; // Use skeleton for loading
import UserCard from "../domains/user/UserCard";
import useUsersPagination from "../domains/user/useUsersPagination";
import { Entity } from "../interfaces/Entity";
import { User } from "../interfaces/User";

const PAGE_SIZE = 20;

type UserEntity = Entity & { user: User };

const UsersPage = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersPagination(PAGE_SIZE);

  const users = data?.pages?.flatMap((page) => page.results) || [];

  const userEntities: UserEntity[] = users.map((user) => ({
    id: user.id,
    name: user.username || `User #${user.id}`,
    image_background: user.avatarUrl,
    user,
  }));

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
      <EntityGrid
        data={userEntities}
        isFetchingNextPage={isFetchingNextPage}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        renderCard={(item: UserEntity) => (
          <UserCard user={item.user} to={`/users/${item.user.id}`} />
        )}
      />
    </Box>
  );
};

export default UsersPage;
