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
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import userService from "../user/userService";
import { useAuth } from "./useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { saveToken, saveUser } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token, user } = await userService.login(username, password);
      saveToken(token);
      saveUser(user);
      toast({ status: "success", title: "Login successful" });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl mb={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mb={2}>
              Login
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
