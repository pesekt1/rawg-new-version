import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import useCreteReview from "./useCreateReview";

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  isOpen,
  onClose,
  gameId,
}) => {
  const [reviewText, setReviewText] = useState("");
  const toast = useToast();
  const { createReview, isLoading } = useCreteReview();

  const handleSubmit = async () => {
    try {
      await createReview({ gameId, review: reviewText });
      toast({
        title: "Review created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setReviewText("");
      onClose();
    } catch (error: any) {
      toast({
        title: "Failed to create review.",
        description:
          error.response?.data?.error || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateReviewModal;
