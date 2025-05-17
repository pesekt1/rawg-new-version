import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const ReviewButton = ({
  userReview,
  role,
  onOpenReviewModal,
}: {
  userReview: any;
  role: string | null;
  onOpenReviewModal: () => void;
}) => (
  <Button
    marginBottom={4}
    variant="outlinedButton"
    size="sm"
    onClick={onOpenReviewModal} // Trigger the modal
    isDisabled={!role} // Disable the button if the user is not authenticated
    leftIcon={<FaPlus />} // Add the Plus icon to the button
  >
    {userReview ? "Update Review" : "Create Review"}
  </Button>
);

export default ReviewButton;
