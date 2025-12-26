import { UseMutationOptions } from "@tanstack/react-query";
import useMutationWithInvalidation from "./useMutationWithInvalidation";

type UpdateFn<T, TResult = any> = (
  id: number,
  data: Partial<T>
) => Promise<TResult>;

const useUpdateEntity = <T, TResult = any>(
  updateFn: UpdateFn<T, TResult>,
  queryKey: (string | number)[],
  options?: UseMutationOptions<TResult, Error, { id: number; data: Partial<T> }>
) =>
  useMutationWithInvalidation<TResult, { id: number; data: Partial<T> }, Error>(
    ({ id, data }) => {
      // Remove id from the update payload if present
      const { id: _id, ...dataWithoutId } = data as any;
      return updateFn(id, dataWithoutId);
    },
    queryKey,
    options
  );

export default useUpdateEntity;
