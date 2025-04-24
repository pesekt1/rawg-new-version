import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import { Game } from "./Game";

const apiClient = new ApiClient<Game>("/games");

const useCreateGame = () =>
  useMutation({
    mutationFn: (data: Partial<Game>) => apiClient.post(data),
  });

export default useCreateGame;
