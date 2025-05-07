import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../domains/games/useCreateGame";
import useGenres from "../domains/genres/useGenres";
import usePublishers from "../domains/publishers/usePublishers";
import { useAuth } from "../domains/auth/useAuth";
import useStores from "../domains/stores/useStores";
import usePlatforms from "../domains/platforms/usePlatforms";
import GameForm from "../domains/games/components/GameForm";

const NewGamePage = () => {
  const { mutate, isLoading, isSuccess, isError, error, reset } =
    useCreateGame();
  const genres = useGenres();
  const platforms = usePlatforms();
  const stores = useStores();
  const publishers = usePublishers();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <GameForm
      initialValues={{
        name: "",
        slug: "",
        description_raw: "",
        released: "",
        background_image: "",
        website: "",
        genres: [],
        parent_platforms: [],
        stores: [],
        publishers: [],
      }}
      genresData={genres.data}
      genresLoading={genres.isLoading}
      genresError={genres.error}
      platformsData={platforms.data}
      platformsLoading={platforms.isLoading}
      platformsError={platforms.error}
      storesData={stores.data}
      storesLoading={stores.isLoading}
      storesError={stores.error}
      publishersData={publishers.data}
      publishersLoading={publishers.isLoading}
      publishersError={publishers.error}
      onSubmit={(values) => {
        reset();
        mutate(values, {
          onSuccess: () => {
            navigate("/");
          },
        });
      }}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      buttonLabel="Create Game"
      heading="Add New Game"
      successMessage="Game created successfully!"
    />
  );
};

export default NewGamePage;
