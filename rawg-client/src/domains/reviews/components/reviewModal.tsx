import React, { useState, useEffect } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import useCreteReview from "../useCreateReview";
import useReview from "../useReview";
import { useAuth } from "../../auth/useAuth";
import useDeleteReview from "../useDeleteReview";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  gameId,
}) => {
  const [reviewText, setReviewText] = useState("");
  const toast = useToast();
  const { createReview, isLoading } = useCreteReview();
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Get the current user
  const { data: userReview } = useReview(gameId, user?.id || 0); // Fetch the user's existing review
  const { mutateAsync: deleteReview, isLoading: isDeleting } = useDeleteReview(
    gameId,
    user?.id || 0
  );

  useEffect(() => {
    if (userReview) {
      setReviewText(userReview.review); // Prefill the input field with the existing review
    } else {
      setReviewText(""); // Clear the input field if no review exists
    }
  }, [userReview]);

  const handleSubmit = async () => {
    try {
      await createReview({ gameId, review: reviewText });
      toast({
        title: userReview ? "Review updated." : "Review created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setReviewText("");
      //invalidate cache
      queryClient.invalidateQueries(["reviews", gameId]);
      queryClient.invalidateQueries(["review", gameId, user?.id || 0]);
      onClose();
    } catch (error: any) {
      toast({
        title: "Failed to submit review.",
        description:
          error.response?.data?.error || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (userReview) {
        await deleteReview({
          id1: userReview.userId,
          id2: userReview.gameId,
        }); // Pass composite keys
        toast({
          title: "Review deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setReviewText("");
        onClose(); // Close the modal
      }
    } catch (error: any) {
      toast({
        title: "Failed to delete review.",
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
        <ModalHeader>
          {userReview ? "Update Review" : "Create Review"}
        </ModalHeader>
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
          {userReview && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
