import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  HStack,
  Box,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Screenshot {
  id: number;
  image: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ScreenshotGallery = ({
  screenshots,
  initialIndex,
  isOpen,
  onClose,
}: ScreenshotGalleryProps) => {
  const [current, setCurrent] = useState(initialIndex);

  // Reset to initialIndex when opened - local UI state
  useEffect(() => {
    if (isOpen) setCurrent(initialIndex);
  }, [isOpen, initialIndex]);

  const goPrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  const goNext = () =>
    setCurrent((prev) => (prev < screenshots.length - 1 ? prev + 1 : prev));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay bg="blackAlpha.900" />
      <ModalContent bg="transparent" boxShadow="none" maxW="90vw">
        <ModalBody p={0} position="relative">
          <IconButton
            icon={<FiX />}
            aria-label="Close"
            position="absolute"
            top={4}
            right={4}
            zIndex={10}
            onClick={onClose}
            bg="blackAlpha.700"
            color="white"
            _hover={{ bg: "blackAlpha.900" }}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="70vh"
          >
            <IconButton
              icon={<FiChevronLeft size={32} />}
              aria-label="Previous"
              onClick={goPrev}
              isDisabled={current === 0}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              bg="blackAlpha.700"
              color="white"
              _hover={{ bg: "blackAlpha.900" }}
              zIndex={10}
            />
            <Image
              src={screenshots[current].image}
              maxH="70vh"
              maxW="80vw"
              mx="auto"
              borderRadius="lg"
              boxShadow="2xl"
              objectFit="contain"
            />
            <IconButton
              icon={<FiChevronRight size={32} />}
              aria-label="Next"
              onClick={goNext}
              isDisabled={current === screenshots.length - 1}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              bg="blackAlpha.700"
              color="white"
              _hover={{ bg: "blackAlpha.900" }}
              zIndex={10}
            />
          </Box>
          <HStack
            mt={6}
            px={6}
            pb={4}
            spacing={2}
            justify="center"
            overflowX="auto"
            maxW="100vw"
          >
            {screenshots.map((s, idx) => (
              <Box
                key={s.id}
                border={
                  idx === current ? "2px solid #fff" : "2px solid transparent"
                }
                borderRadius="md"
                overflow="hidden"
                cursor="pointer"
                opacity={idx === current ? 1 : 0.7}
                onClick={() => setCurrent(idx)}
                minW="80px"
                maxW="120px"
                transition="border 0.2s, opacity 0.2s"
              >
                <Image src={s.image} h="60px" w="100%" objectFit="cover" />
              </Box>
            ))}

            {screenshots.length > 10 && (
              <Box color="white" fontWeight="bold" px={2}>
                ...
              </Box>
            )}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScreenshotGallery;
