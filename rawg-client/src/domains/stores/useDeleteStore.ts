import { useMutation, useQueryClient } from "@tanstack/react-query";
import storeService from "./storeService";

const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await storeService.delete(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export default useDeleteStore;
