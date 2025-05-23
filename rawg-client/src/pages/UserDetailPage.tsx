import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import userService from "../domains/user/userService";
import useAuthStore from "../state/useAuthStore";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const currentUser = useAuthStore((s) => s.user);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.get(Number(id)),
    enabled: !!id,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  const {
    mutate,
    isLoading: isSaving,
    isSuccess,
    isError,
    error: saveError,
  } = useMutation({
    mutationFn: (data: { username: string; password?: string }) =>
      userService.put(Number(id), data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      setPassword("");
      // If the updated user is the logged-in user, update the state
      if (currentUser && updatedUser && currentUser.id === updatedUser.id) {
        setUser(updatedUser);
      }
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text color="tomato">{(error as Error).message}</Text>;
  if (!user) return <Text>User not found.</Text>;

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading mb={4}>User Detail</Heading>
      <Text mb={2}>ID: {user.id}</Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            username,
            ...(password ? { password } : {}),
          });
        }}
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isDisabled={isSaving}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              isDisabled={isSaving}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" isLoading={isSaving}>
            Update User
          </Button>
          {isSuccess && (
            <Alert status="success">
              <AlertIcon />
              User updated successfully!
            </Alert>
          )}
          {isError && (
            <Alert status="error">
              <AlertIcon />
              {(saveError as any)?.message || "Update failed"}
            </Alert>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default UserDetailPage;
