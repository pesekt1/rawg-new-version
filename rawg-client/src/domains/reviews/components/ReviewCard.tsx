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

const ReviewCard = ({ review }: { review: any }) => {
  const game = useGame(review.gameId).data;
  const { user } = useAuth();

  return (
    <Card mb={4} borderRadius="lg" boxShadow="md">
      <CardHeader pb={0}>
        <Heading size="md">
          {game ? (
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          ) : (
            "Loading game..."
          )}
        </Heading>
      </CardHeader>
      <CardBody pt={2} pb={2}>
        <StyledText>
          <ExpandableText>{review.review}</ExpandableText>
        </StyledText>
      </CardBody>
      <CardFooter pt={0} justifyContent="space-between" alignItems="center">
        <Box>
          {review.userId === user?.id ? (
            <Text fontWeight="bold">You</Text>
          ) : (
            <Link to={`/users/${review.userId}`}>User {review.userId}</Link>
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
