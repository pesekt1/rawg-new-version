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
  ButtonGroup,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import useCreteReview from "../useCreateReview";
import useReview from "../useReview";
import { useAuth } from "../../auth/useAuth";
import useDeleteReview from "../useDeleteReview";
import exceptionalIcon from "../../../assets/bulls-eye.webp";
import recommendedIcon from "../../../assets/thumbs-up.webp";
import mehIcon from "../../../assets/meh.webp";
import skipIcon from "../../../assets/skip.png";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const DEFAULT_RATING = 5;

const ratingOptions = [
  { value: 5, label: "Exceptional", icon: exceptionalIcon },
  { value: 4, label: "Recommended", icon: recommendedIcon },
  { value: 3, label: "Meh", icon: mehIcon },
  { value: 2, label: "Skip", icon: skipIcon },
];

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  gameId,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState<number>(DEFAULT_RATING);
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
      // If a review exists, populate the fields with the existing review data
      setReviewText(userReview.review);
      setSelectedRating(userReview.rating || DEFAULT_RATING);
    } else {
      // If no review exists, reset the fields
      setReviewText("");
      setSelectedRating(DEFAULT_RATING);
    }
  }, [userReview]);

  const handleSubmit = async () => {
    try {
      await createReview({
        gameId,
        review: reviewText,
        rating: selectedRating!,
      });
      toast({
        title: userReview ? "Review updated." : "Review created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setReviewText("");
      setSelectedRating(DEFAULT_RATING);
      //invalidate cache
      queryClient.invalidateQueries(["reviews", gameId]);
      queryClient.invalidateQueries(["review", gameId, user?.id || 0]);
      queryClient.invalidateQueries(["reviews-pagination"]);
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
        });
        toast({
          title: "Review deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setReviewText("");
        setSelectedRating(DEFAULT_RATING);
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", sm: "xl", md: "2xl", lg: "3xl" }}
    >
      <ModalOverlay />
      <ModalContent
        w={{ base: "98vw", sm: "90vw", md: "700px", lg: "900px", xl: "1100px" }}
        maxW={{
          base: "98vw",
          sm: "90vw",
          md: "700px",
          lg: "900px",
          xl: "1100px",
        }}
        minH={{ base: "60vh", md: "400px" }}
        maxH={{ base: "90vh", md: "80vh" }}
        overflowY="auto"
      >
        <ModalHeader>
          {userReview ? "Update Review" : "Create Review"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Chakra UI Rating selector - responsive */}
          <Flex
            wrap="wrap"
            gap={3}
            mb={4}
            justify={{ base: "center", md: "flex-start" }}
          >
            {ratingOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setSelectedRating(option.value)}
                leftIcon={
                  <Image
                    src={option.icon}
                    alt={option.label}
                    boxSize="24px"
                    mr={2}
                  />
                }
                colorScheme={selectedRating === option.value ? "teal" : "gray"}
                variant={selectedRating === option.value ? "solid" : "outline"}
                fontWeight={selectedRating === option.value ? "bold" : "normal"}
                opacity={selectedRating === option.value ? 1 : 0.8}
                borderRadius="24px"
                mr={2}
                mb={2}
                minW="150px"
                flexShrink={0}
              >
                <Text>{option.label}</Text>
              </Button>
            ))}
          </Flex>
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
