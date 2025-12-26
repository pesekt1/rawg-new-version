import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGame from "../domains/games/useGame";
import ApiClient from "../services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "../domains/games/Game";
import { useAuth } from "../domains/auth/useAuth";
import GameForm from "../domains/games/components/GameForm/GameForm";

const apiClient = new ApiClient<Game>("/games");

const EditGamePage = () => {
  const { id } = useParams();
  const gameId = Number(id);

  const { data: game, isLoading, error } = useGame(gameId);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isSaving,
    isSuccess,
    isError,
    error: saveError,
  } = useMutation({
    mutationFn: (data: Partial<Game>) => apiClient.patch(gameId, data),
    onSuccess: () => {
      //Invalidate the list and the single game
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  // Navigate to home page after showing success message for a short time
  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1500); // Show success message for 1.5 seconds
      return () => clearTimeout(timeout);
    }
    return undefined; // Always return a value
  }, [isSuccess, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !game) return <div>Failed to load game</div>;

  return (
    <GameForm
      initialValues={{
        name: game.name,
        slug: game.slug,
        description_raw: game.description_raw,
        released: game.released,
        background_image: game.background_image,
        website: game.website,
        genres: game.genres || [],
        parent_platforms: game.parent_platforms || [],
        stores: game.stores || [],
        publishers: game.publishers || [],
        developers: game.developers || [],
        tags: game.tags || [],
      }}
      onSubmit={mutate}
      isLoading={isSaving}
      isSuccess={isSuccess}
      isError={isError}
      error={saveError}
      buttonLabel="Save Changes"
      heading="Edit Game"
      successMessage="Game updated successfully!"
    />
  );
};

export default EditGamePage;
