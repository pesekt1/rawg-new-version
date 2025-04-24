import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../../../../services/image-url";
import { Link } from "react-router-dom";
import { Game } from "../../Game";
import PlatformIconsList from "../../../platforms/PlatformIconsList";
import Emoji from "./Emoji";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      position="relative"
      overflow="hidden"
      transition="transform 0.4s, filter 0.4s"
      _hover={{
        transform: "scale(1.05)",
        filter: "brightness(1.2)",
      }}
    >
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <Heading fontSize="2xl">
          <HStack>
            <Link to={`/games/${game.slug}`}>{game.name}</Link>
            <Emoji rating_top={game.rating_top} />
          </HStack>
        </Heading>
        <HStack justifyContent="space-between">
          <PlatformIconsList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
