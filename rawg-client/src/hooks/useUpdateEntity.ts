import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

type UpdateFn<T, TResult = any> = (
  id: number,
  data: Partial<T>
) => Promise<TResult>;

const useUpdateEntity = <T, TResult = any>(
  updateFn: UpdateFn<T, TResult>,
  queryKey: (string | number)[],
  options?: UseMutationOptions<TResult, Error, { id: number; data: Partial<T> }>
) => {
  const queryClient = useQueryClient();
  return useMutation<TResult, Error, { id: number; data: Partial<T> }>({
    mutationFn: ({ id, data }) => {
      // Remove id from the update payload if present
      const { id: _id, ...dataWithoutId } = data as any;
      return updateFn(id, dataWithoutId);
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

export default useUpdateEntity;
