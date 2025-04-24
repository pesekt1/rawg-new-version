import { useMutation, useQueryClient } from "@tanstack/react-query";
import genreService from "./genreService";

const useDeleteGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await genreService.delete(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });
};

export default useDeleteGenre;
