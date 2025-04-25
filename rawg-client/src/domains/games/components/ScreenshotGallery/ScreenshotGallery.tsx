import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  Box,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GalleryNavButton from "./GalleryNavButton";
import GalleryThumbnails from "./GalleryThumbnails";

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
            <GalleryNavButton
              icon={<FiChevronLeft size={32} />}
              ariaLabel="Previous"
              onClick={goPrev}
              isDisabled={current === 0}
              position="left"
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
            <GalleryNavButton
              icon={<FiChevronRight size={32} />}
              ariaLabel="Next"
              onClick={goNext}
              isDisabled={current === screenshots.length - 1}
              position="right"
            />
          </Box>
          <GalleryThumbnails
            screenshots={screenshots}
            current={current}
            setCurrent={setCurrent}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScreenshotGallery;
