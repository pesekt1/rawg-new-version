import { Box, useColorMode } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

interface Props {
  onClick?: () => void;
  title?: string;
}

function isAdminLoggedIn() {
  return !!localStorage.getItem("token");
}

const AdminEditIcon = ({ onClick, title }: Props) => {
  const { colorMode } = useColorMode();

  if (!isAdminLoggedIn()) return null;

  return (
    <Box
      as={FaEdit}
      boxSize={5}
      color={colorMode === "light" ? "gray.600" : "yellow.300"}
      cursor="pointer"
      title={title || "Update"}
      onClick={onClick}
    />
  );
};

export default AdminEditIcon;
