import useGetEntities from "../../hooks/useGetEntities";
import userService from "./userService";

const useUsers = () =>
  useGetEntities({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

export default useUsers;
