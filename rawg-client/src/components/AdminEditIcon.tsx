import { Box, useColorMode } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

/**
 * Props for the `AdminEditIcon` component.
 *
 * @property onClick - Optional callback function to handle click events.
 * @property title - Optional tooltip text for the icon.
 */
interface Props {
  onClick?: () => void;
  title?: string;
}

/**
 * Checks if an admin user is logged in by verifying the presence of a token in local storage.
 *
 * @returns `true` if an admin is logged in, otherwise `false`.
 */
function isAdminLoggedIn() {
  return !!localStorage.getItem("token");
}

/**
 * A component that displays an edit icon for admin users.
 *
 * @param props - The props for the component.
 * @returns An edit icon if an admin is logged in, otherwise `null`.
 */
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
