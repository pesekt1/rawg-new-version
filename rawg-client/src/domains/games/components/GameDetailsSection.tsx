import { Heading, Box } from "@chakra-ui/react";
import PlatformIconsList from "../../platforms/PlatformIconsList";
import StyledText from "../../../components/StyledText";
import ExpandableText from "../../../components/ExpandableText";
import GameAttributes from "./GameAttributes";

const GameDetailsSection = ({ game }: { game: any }) => (
  <Box>
    <Heading>{game.name}</Heading>
    <PlatformIconsList platforms={game.parent_platforms} />
    <StyledText>
      <ExpandableText>{game.description_raw}</ExpandableText>
    </StyledText>
    <GameAttributes game={game} />
  </Box>
);

export default GameDetailsSection;
