import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();
  return (
    <Button colorScheme="teal" onClick={() => navigate("/users")}>
      Browse Users
    </Button>
  );
};

export default UserButton;
