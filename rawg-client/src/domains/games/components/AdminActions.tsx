import { HStack, Button } from "@chakra-ui/react";

const AdminActions = ({
  onEdit,
  onDelete,
  isDeleting,
}: {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) => (
  <HStack mb={2} spacing={2}>
    <Button colorScheme="blue" variant="solid" size="sm" onClick={onEdit}>
      Edit Game
    </Button>
    <Button
      colorScheme="red"
      variant="solid"
      size="sm"
      onClick={onDelete}
      isLoading={isDeleting}
    >
      Delete Game
    </Button>
  </HStack>
);

export default AdminActions;
