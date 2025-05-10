import { Button } from "@chakra-ui/react";
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
      size="sm"
      onClick={() => navigate("/new-game")}
    >
      New
    </Button>
  );
};

export default AddGameButton;
