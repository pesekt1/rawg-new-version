import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const AddGameButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <Button
      colorScheme="teal"
      variant="solid"
      size="md"
      leftIcon={<FaPlus />}
      borderRadius="full"
      _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
      onClick={() => navigate("/new-game")}
    >
      New
    </Button>
  );
};

export default AddGameButton;
