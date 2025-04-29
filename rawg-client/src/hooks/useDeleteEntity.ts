import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

// deleteFn: The function that deletes the entity by id (string or number)
type DeleteFn = (id: string | number) => Promise<{ message: string }>;

/**
 * useDeleteEntity is a generic hook for deleting an entity and invalidating the related query.
 * @param deleteFn - function to delete the entity
 * @param queryKey - the query key to invalidate after deletion (e.g. ["games", id])
 * @param options - react-query mutation options
 */
const useDeleteEntity = <TVariables = string | number>(
  deleteFn: DeleteFn,
  queryKey: (string | number)[],
  options?: UseMutationOptions<{ message: string }, Error, TVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, TVariables>({
    mutationFn: async (id) => {
      return await deleteFn(id as string | number);
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
