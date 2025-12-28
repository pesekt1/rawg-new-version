import { IconButton, Portal, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { ChatbotModal } from "./ChatbotModal";

export function ChatbotLauncher() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Portal>
        <Tooltip label="Chat with us" placement="left" hasArrow>
          <IconButton
            aria-label="Open chat"
            onClick={onOpen}
            position="fixed"
            right={4}
            bottom={4}
            zIndex={99999}
            colorScheme="teal"
            borderRadius="full"
            border="2px solid black"
            size="lg"
            fontSize="3xl"
            boxShadow="lg"
            icon={<FaRobot />}
          />
        </Tooltip>
      </Portal>

      <ChatbotModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
