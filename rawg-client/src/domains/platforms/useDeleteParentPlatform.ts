import { useMutation, useQueryClient } from "@tanstack/react-query";
import platformService from "./platformService";

const useDeleteParentPlatform = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await platformService.delete(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
};

export default useDeleteParentPlatform;
