import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../domains/games/useCreateGame";
import { useAuth } from "../domains/auth/useAuth";
import GameForm from "../domains/games/components/GameForm/GameForm";

const NewGamePage = () => {
  const { mutate, isLoading, isSuccess, isError, error, reset } =
    useCreateGame();

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
        developers: [],
        tags: [],
      }}
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
