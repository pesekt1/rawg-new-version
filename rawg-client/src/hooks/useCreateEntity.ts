import { UseMutationOptions } from "@tanstack/react-query";
import useMutationWithInvalidation from "./useMutationWithInvalidation";

/**
 * Async create function signature used by `useCreateEntity`.
 *
 * @template T - Entity shape accepted by the create function (input is `Partial<T>`).
 * @template TResult - Result type returned by the create function.
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
) =>
  useMutationWithInvalidation<TResult, Partial<T>>(
    (data) => createFn(data),
    queryKey,
    options
  );

export default useCreateEntity;
