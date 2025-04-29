import useGetEntity from "../../hooks/useGetEntity";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useDeveloper = (developerId: number) =>
  useGetEntity<Developer>({
    queryKey: ["developer", developerId],
    queryFn: () => developerService.get(developerId),
  });

export default useDeveloper;
