import useGetEntity from "../../hooks/useGetEntity";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useDeveloper = (developerId?: number | null) =>
  useGetEntity<Developer>({
    idOrSlug: developerId,
    queryKeyPrefix: "developer",
    service: developerService,
  });

export default useDeveloper;
