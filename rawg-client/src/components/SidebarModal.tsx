import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import UserPanel from "../domains/user/UserPanel";
import GenreList from "../domains/genres/GenreList";
import StoreList from "../domains/stores/StoreList";
import PublisherList from "../domains/publishers/PublisherList";
import DeveloperList from "../domains/developers/DeveloperList";

const SidebarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        iconSpacing={0}
        aria-label="Open Filters"
        colorScheme="gray"
        justifyContent="center"
        width="auto"
        paddingX={2}
      >
        <FiMenu />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <UserPanel />
            <GenreList />
            <StoreList />
            <PublisherList />
            <DeveloperList />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SidebarModal;
