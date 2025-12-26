import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

/**
 * Wraps React Query's `useMutation` and invalidates a given query key after a successful mutation.
 *
 * @template TResult - Mutation result type.
 * @template TVariables - Variables type passed to the mutation function.
 * @template TError - Error type (defaults to `Error`).
 *
 * @param mutationFn - Async mutation function.
 * @param queryKey - Query key to invalidate on success.
 * @param options - Optional `useMutation` options; `onSuccess` is composed (invalidation runs first).
 *
 * @returns The mutation object returned by `useMutation`.
 */
const useMutationWithInvalidation = <TResult, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  queryKey: (string | number)[],
  options?: UseMutationOptions<TResult, TError, TVariables>
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...rest } = options ?? {};

  return useMutation<TResult, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.(data, variables, context);
    },
    ...rest,
  });
};

export default useMutationWithInvalidation;
