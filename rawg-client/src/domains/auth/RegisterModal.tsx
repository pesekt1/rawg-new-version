import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import authService from "./authService";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { saveToken } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token } = await authService.register(username, password);
      saveToken(token);
      toast({ status: "success", title: "Registration successful" });
      onClose();
      navigate(0); // reload to update UI if needed
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
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
              Register
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
