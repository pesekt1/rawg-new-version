import useGetEntity from "../../hooks/useGetEntity";
import { User } from "../../interfaces/User";
import ApiClient from "../../services/api-client";

const apiClient = new ApiClient<User>("/users");

const useUser = (userId?: number | null) =>
  useGetEntity<User>({
    idOrSlug: userId,
    queryKeyPrefix: "user",
    service: apiClient,
  });

export default useUser;
