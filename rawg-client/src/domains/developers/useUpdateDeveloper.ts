import useUpdateEntity from "../../hooks/useUpdateEntity";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useUpdateDeveloper = () =>
  useUpdateEntity<Developer>(developerService.put, ["developers"]);

export default useUpdateDeveloper;
