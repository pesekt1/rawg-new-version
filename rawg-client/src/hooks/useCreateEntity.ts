import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

// createFn: The function that creates the entity and returns the created entity or response

/**
 * useCreateEntity is a generic hook for creating an entity and invalidating the related query.
 *
 * @template T - The entity type to create.
 * @template TResult - The result type returned by the create function (defaults to any).
 * @param createFn - Function to create the entity (should return a promise of the created entity or response).
 * @param queryKey - The query key to invalidate after creation (e.g. ["games"]).
 * @param options - Additional react-query mutation options (e.g. onSuccess, onError, etc).
 *
 * @returns A react-query mutation object for the create operation.
 */
type CreateFn<T, TResult = any> = (data: Partial<T>) => Promise<TResult>;

/**
 * useCreateEntity is a generic hook for creating an entity and invalidating the related query.
 * @param createFn - function to create the entity
 * @param queryKey - the query key to invalidate after creation (e.g. ["games"])
 * @param options - react-query mutation options
 */
const useCreateEntity = <T, TResult = any>(
  createFn: CreateFn<T, TResult>,
  queryKey: (string | number)[],
  options?: UseMutationOptions<TResult, Error, Partial<T>>
) => {
  const queryClient = useQueryClient();
  return useMutation<TResult, Error, Partial<T>>({
    mutationFn: (data) => createFn(data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};

export default useCreateEntity;
