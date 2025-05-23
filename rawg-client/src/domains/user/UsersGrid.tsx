import { SimpleGrid, Text } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { User } from "../../interfaces/User";

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
      margin={10}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default UsersGrid;
