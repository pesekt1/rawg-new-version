import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Box,
  Image,
  HStack,
} from "@chakra-ui/react";
import StyledText from "../../../components/StyledText";
import useGame from "../../games/useGame";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import ExpandableText from "../../../components/ExpandableText";
import useUser from "../../user/useUser";
import exceptionalIcon from "../../../assets/bulls-eye.webp";
import recommendedIcon from "../../../assets/thumbs-up.webp";
import mehIcon from "../../../assets/meh.webp";
import skipIcon from "../../../assets/skip.png";

interface Props {
  review: any;
  isGameDetail?: boolean;
}

const ratingOptions = [
  { value: 5, label: "Exceptional", icon: exceptionalIcon },
  { value: 4, label: "Recommended", icon: recommendedIcon },
  { value: 3, label: "Meh", icon: mehIcon },
  { value: 2, label: "Skip", icon: skipIcon },
];

const ReviewCard = ({ review, isGameDetail }: Props) => {
  const game = useGame(review.gameId).data;
  const { user: currentUser } = useAuth();
  const reviewUser = useUser(review.userId).data;
  const ratingOption = ratingOptions.find((opt) => opt.value === review.rating);

  return (
    <Card mb={4} borderRadius="lg" boxShadow="md">
      <CardHeader pb={0}>
        {!isGameDetail && (
          <Heading size="md" display="flex" alignItems="center">
            {game ? (
              <>
                <Link to={`/games/${game.id}`}>{game.name}</Link>
                {ratingOption && (
                  <Image
                    src={ratingOption.icon}
                    alt="rating icon"
                    boxSize="24px"
                    ml={2}
                  />
                )}
              </>
            ) : (
              "Loading game..."
            )}
          </Heading>
        )}
        {isGameDetail && (
          <>
            {ratingOption && (
              <HStack>
                <Heading size="md" display="flex" alignItems="center">
                  {ratingOption.label}
                </Heading>
                <Image
                  src={ratingOption.icon}
                  alt="rating icon"
                  boxSize="24px"
                  ml={2}
                />
              </HStack>
            )}
          </>
        )}
      </CardHeader>
      <CardBody pt={2} pb={2}>
        <StyledText>
          <ExpandableText>{review.review}</ExpandableText>
        </StyledText>
      </CardBody>
      <CardFooter pt={0} justifyContent="space-between" alignItems="center">
        <Box>
          {review.userId === currentUser?.id ? (
            <Text fontWeight="bold">You</Text>
          ) : (
            <Link to={`/users/${review.userId}`}>{reviewUser?.username}</Link>
          )}
        </Box>
        {review.updated_at && (
          <Text fontSize="sm" color="gray.500">
            {new Date(review.updated_at).toLocaleDateString()}
          </Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
