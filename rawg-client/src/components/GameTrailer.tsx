import { Spinner } from "@chakra-ui/react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, isLoading, error } = useTrailers(gameId);

  if (isLoading) return <Spinner />;

  if (error) throw error;

  const firstTrailer = data?.results[0];
  if (!firstTrailer) return null;

  return (
    <video
      src={firstTrailer?.data480}
      poster={firstTrailer?.preview}
      controls
    />
  );
};

export default GameTrailer;
