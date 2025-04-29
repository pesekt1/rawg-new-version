import { Spinner } from "@chakra-ui/react";
import useFirstTrailer from "../../trailers/useFirstTrailer";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data: trailer, isLoading, error } = useFirstTrailer(gameId);

  if (isLoading) return <Spinner />;
  if (error) throw error;
  if (!trailer) return null;

  return (
    <video
      src={trailer.data480}
      poster={trailer.preview}
      controls
      width="100%"
      height="auto"
      style={{ borderRadius: 12, marginBottom: 16, display: "block" }}
    />
  );
};

export default GameTrailer;
