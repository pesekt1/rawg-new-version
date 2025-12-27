import { IconButton, Portal, useDisclosure } from "@chakra-ui/react";
import { ChatbotModal } from "./ChatbotModal";

export function ChatbotLauncher() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Portal>
        <IconButton
          aria-label="Open chat"
          onClick={onOpen}
          position="fixed"
          right={4}
          bottom={4}
          zIndex={99999}
          colorScheme="blue"
          borderRadius="full"
          size="lg"
          icon={<span>Chat</span>}
        />
      </Portal>

      <ChatbotModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
