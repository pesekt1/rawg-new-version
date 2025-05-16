import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

// deleteFn: The function that deletes the entity by id or composite key
type DeleteFn =
  | ((id: string | number) => Promise<{ message: string }>)
  | ((
      id1: string | number,
      id2: string | number
    ) => Promise<{ message: string }>);

/**
 * useDeleteEntity is a generic hook for deleting an entity and invalidating the related query.
 * It supports both single IDs and composite keys.
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
    mutationFn: async (variables: TVariables) => {
      if (!variables) {
        throw new Error(
          "Invalid variables: variables cannot be null or undefined."
        );
      }

      if (
        typeof variables === "object" &&
        "id1" in variables &&
        "id2" in variables
      ) {
        // Handle composite keys
        const { id1, id2 } = variables as unknown as {
          id1: string | number;
          id2: string | number;
        };
        return await (
          deleteFn as (
            id1: string | number,
            id2: string | number
          ) => Promise<{ message: string }>
        )(id1, id2);
      } else {
        // Handle single ID
        return await (
          deleteFn as (id: string | number) => Promise<{ message: string }>
        )(variables as string | number);
      }
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
