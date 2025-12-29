import { SimpleGrid, Text } from "@chakra-ui/react";
import { User } from "./User";
import UserCard from "./UserCard";

interface UsersGridProps {
  users: User[];
  error?: Error | null;
}

const UsersGrid = ({ users, error }: UsersGridProps) => {
  if (error) return <Text color="tomato">{error.message}</Text>;

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
      spacing={4}
      marginRight={5}
      marginTop={5}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default UsersGrid;
