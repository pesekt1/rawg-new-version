import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteFn = (id: string) => Promise<any>;

const useDeleteEntity = (deleteFn: DeleteFn, queryKey: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string) => {
      await deleteFn(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useDeleteEntity;
