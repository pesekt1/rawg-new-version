import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import StyledText from "../../../components/StyledText";
import useGame from "../../games/useGame";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import ExpandableText from "../../../components/ExpandableText";
import useUser from "../../user/useUser";

interface Props {
  review: any;
  isGameDetail?: boolean;
}

const ReviewCard = ({ review, isGameDetail }: Props) => {
  const game = useGame(review.gameId).data;
  const { user: currentUser } = useAuth();
  const reviewUser = useUser(review.userId).data;

  return (
    <Card mb={4} borderRadius="lg" boxShadow="md">
      <CardHeader pb={0}>
        {!isGameDetail && (
          <Heading size="md">
            {game ? (
              <Link to={`/games/${game.id}`}>{game.name}</Link>
            ) : (
              "Loading game..."
            )}
          </Heading>
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
        {review.createdAt && (
          <Text fontSize="sm" color="gray.500">
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
