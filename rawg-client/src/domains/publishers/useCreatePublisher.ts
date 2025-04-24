import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const useCreatePublisher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Publisher>) => publisherService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
  });
};

export default useCreatePublisher;
