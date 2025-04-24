import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateFn<T> = (data: Partial<T>) => Promise<any>;

const useCreateEntity = <T>(createFn: CreateFn<T>, queryKey: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<T>) => createFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useCreateEntity;
