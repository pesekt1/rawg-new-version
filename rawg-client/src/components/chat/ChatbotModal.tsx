import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/useChat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChatbotModal({ isOpen, onClose }: Props) {
  const { messages, isBotTyping, error, sendMessage, reset } = useChat();
  const [prompt, setPrompt] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping, isOpen]);

  const send = async () => {
    const current = prompt;
    setPrompt("");
    await sendMessage(current);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            {messages.length === 0 ? (
              <Box color="gray.500" fontSize="sm">
                Ask for recommendations, filters, or “games like X”.
              </Box>
            ) : null}

            {messages.map((m, idx) => (
              <Box
                key={idx}
                alignSelf={m.role === "user" ? "flex-end" : "flex-start"}
                bg={m.role === "user" ? "blue.600" : "gray.100"}
                color={m.role === "user" ? "white" : "gray.900"}
                px={3}
                py={2}
                borderRadius="lg"
                maxW="85%"
                whiteSpace="pre-wrap"
              >
                <Text fontSize="sm">{m.content}</Text>
              </Box>
            ))}

            {isBotTyping ? (
              <HStack
                alignSelf="flex-start"
                bg="gray.100"
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Spinner size="sm" />
                <Text fontSize="sm" color="gray.600">
                  Typing…
                </Text>
              </HStack>
            ) : null}

            {error ? (
              <Text fontSize="sm" color="red.500">
                {error}
              </Text>
            ) : null}

            <div ref={bottomRef} />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <VStack w="100%" align="stretch" spacing={2}>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything…"
              resize="none"
              rows={3}
              maxLength={2000}
              isDisabled={isBotTyping}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <HStack justify="space-between">
              <Button variant="ghost" onClick={reset}>
                New chat
              </Button>
              <HStack>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
                <IconButton
                  aria-label="Send"
                  onClick={() => void send()}
                  isDisabled={!prompt.trim() || isBotTyping}
                  colorScheme="blue"
                  icon={<Text fontWeight="bold">↑</Text>}
                />
              </HStack>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
