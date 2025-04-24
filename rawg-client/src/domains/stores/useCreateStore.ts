import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Store } from "./Store";
import storeService from "./storeService";

const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Store>) => storeService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export default useCreateStore;
