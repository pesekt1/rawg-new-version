import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User } from "../../interfaces/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "./userService";
import { useAuth } from "../auth/useAuth";

interface UserEditModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
}

const UserEditModal = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}: UserEditModalProps) => {
  const queryClient = useQueryClient();
  const { saveUser, user: currentUser } = useAuth();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setPassword("");
  }, [user, isOpen]);

  const {
    mutate,
    isLoading: isSaving,
    isError,
    error: saveError,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: { username: string; password?: string }) =>
      userService.put(user.id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      setPassword("");
      if (currentUser && updatedUser && currentUser.id === updatedUser.id) {
        saveUser(updatedUser);
      }
      if (onSuccess) onSuccess(updatedUser);
      onClose();
    },
  });

  // Reset mutation state when modal closes
  useEffect(() => {
    if (!isOpen) resetMutation();
  }, [isOpen, resetMutation]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              username,
              ...(password ? { password } : {}),
            });
          }}
        >
          <ModalBody>
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
              {isError && (
                <Alert status="error">
                  <AlertIcon />
                  {(saveError as any)?.message || "Update failed"}
                </Alert>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              mr={3}
              variant="ghost"
              isDisabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal" isLoading={isSaving}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserEditModal;
