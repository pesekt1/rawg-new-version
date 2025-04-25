import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

type DeleteFn = (id: string) => Promise<any>;

const useDeleteEntity = <TVariables = string>(
  deleteFn: DeleteFn,
  queryKey: string[],
  options?: UseMutationOptions<any, Error, TVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TVariables>({
    mutationFn: async (id) => {
      await deleteFn(id as string);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

export default useDeleteEntity;
