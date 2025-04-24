import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Platform } from "./Platform";
import platformService from "./platformService";

const useCreateParentPlatform = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Platform>) => platformService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
};

export default useCreateParentPlatform;
