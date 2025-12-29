import useGetEntity from "../../hooks/useGetEntity";
import ApiClient from "../../services/api-client";
import { User } from "./User";

const apiClient = new ApiClient<User>("/users");

const useUser = (userId?: number | null) =>
  useGetEntity<User>({
    idOrSlug: userId,
    queryKeyPrefix: "user",
    service: apiClient,
  });

export default useUser;
