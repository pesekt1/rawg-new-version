import useGetEntities from "../../hooks/useGetEntities";
import { Developer } from "./Developer";
import developerService from "./developerService";
import { Response } from "../../services/api-client";

const useDevelopers = () =>
  useGetEntities<Response<Developer>>({
    queryKey: ["developers"],
    queryFn: developerService.getAll,
    // placeholderData: developers, // Uncomment and import if you have local placeholder data
  });

export default useDevelopers;
