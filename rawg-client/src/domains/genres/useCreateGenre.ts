import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Genre } from "./Genre";
import genreService from "./genreService";

const useCreateGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Genre>) => genreService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });
};

export default useCreateGenre;
