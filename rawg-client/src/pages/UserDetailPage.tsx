import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useUser from "../domains/user/useUser";
import { useAuth } from "../domains/auth/useAuth";
import UserEditModal from "../domains/user/UserEditModal";

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? Number(id) : undefined;
  const { data: user, isLoading, error } = useUser(userId);
  const { user: currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="tomato">{(error as Error).message}</Text>;
  if (!user) return <Text>User not found.</Text>;

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading mb={4}>User Profile</Heading>
      <VStack align="start" spacing={2}>
        <Text>
          <b>ID:</b> {user.id}
        </Text>
        <Text>
          <b>Username:</b> {user.username}
        </Text>
        {/* Add more fields as needed */}
      </VStack>
      {currentUser && currentUser.id === user.id && (
        <>
          <Button mt={4} colorScheme="teal" onClick={onOpen}>
            Edit Profile
          </Button>
          <UserEditModal user={user} isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Box>
  );
};

export default UserProfilePage;
