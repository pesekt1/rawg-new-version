import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { uploadMyAvatar, validateAvatarFile } from "./avatarUpload";
import { User } from "./User";
import userService from "./userService";

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
  const [email, setEmail] = useState(user.email ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    setUsername(user.username);
    setPassword("");
    setEmail(user.email ?? "");
    setAvatarFile(null);
  }, [user, isOpen]);

  const {
    mutateAsync: saveProfileAsync,
    isLoading: isSavingProfile,
    isError: isProfileError,
    error: profileError,
    reset: resetProfileMutation,
  } = useMutation({
    mutationFn: (data: {
      username: string;
      password?: string;
      email?: string;
    }) => userService.put(user.id, data),
  });

  const {
    mutateAsync: uploadAvatarAsync,
    isLoading: isUploadingAvatar,
    isError: isAvatarError,
    error: avatarError,
    reset: resetAvatarMutation,
  } = useMutation({
    mutationFn: (file: File) => uploadMyAvatar(file),
  });

  useEffect(() => {
    if (!isOpen) {
      resetProfileMutation();
      resetAvatarMutation();
    }
  }, [isOpen, resetProfileMutation, resetAvatarMutation]);

  const isSaving = isSavingProfile || isUploadingAvatar;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const updatedUser = await saveProfileAsync({
              username,
              ...(password ? { password } : {}),
              email: email || undefined,
            });

            // Only /users/me/avatar exists on the server
            if (avatarFile && currentUser?.id === user.id) {
              validateAvatarFile(avatarFile);

              const { avatarUrl } = await uploadAvatarAsync(avatarFile);
              const merged = { ...updatedUser, avatarUrl };

              queryClient.invalidateQueries({ queryKey: ["user", user.id] });
              if (currentUser && currentUser.id === merged.id) saveUser(merged);
              onSuccess?.(merged);
              onClose();
              return;
            }

            queryClient.invalidateQueries({ queryKey: ["user", user.id] });
            setPassword("");
            if (
              currentUser &&
              updatedUser &&
              currentUser.id === updatedUser.id
            ) {
              saveUser(updatedUser);
            }
            onSuccess?.(updatedUser);
            onClose();
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

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Optional"
                  isDisabled={isSaving}
                />
              </FormControl>

              <FormControl isDisabled={isSaving || currentUser?.id !== user.id}>
                <FormLabel>Profile image</FormLabel>
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                />
              </FormControl>

              {(isProfileError || isAvatarError) && (
                <Alert status="error">
                  <AlertIcon />
                  {(profileError as any)?.message ||
                    (avatarError as any)?.message ||
                    "Update failed"}
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
