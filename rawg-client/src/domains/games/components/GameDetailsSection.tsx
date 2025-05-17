import { Heading, Button, Box } from "@chakra-ui/react";
import PlatformIconsList from "../../platforms/PlatformIconsList";
import StyledText from "../../../components/StyledText";
import ExpandableText from "../../../components/ExpandableText";
import GameAttributes from "./GameAttributes";
import { FaPlus } from "react-icons/fa";

const GameDetailsSection = ({
  game,
  userReview,
  role,
}: {
  game: any;
  userReview: any;
  role: string | null;
}) => (
  <Box>
    <Heading>{game.name}</Heading>
    <PlatformIconsList platforms={game.parent_platforms} />
    <Button
      marginTop={2}
      variant="outlinedButton"
      size="sm"
      isDisabled={!role} // Disable the button if the user is not authenticated
      leftIcon={<FaPlus />} // Add the Plus icon to the button
    >
      {userReview ? "Update Review" : "Create Review"}
    </Button>
    <StyledText>
      <ExpandableText>{game.description_raw}</ExpandableText>
    </StyledText>
    <GameAttributes game={game} />
  </Box>
);

export default GameDetailsSection;
