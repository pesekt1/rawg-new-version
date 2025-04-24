import { useMutation, useQueryClient } from "@tanstack/react-query";
import publisherService from "./publisherService";

const useDeletePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await publisherService.delete(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
  });
};

export default useDeletePublisher;
