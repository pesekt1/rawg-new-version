import useCreateEntity from "../../hooks/useCreateEntity";
import { Developer } from "./Developer";
import developerService from "./developerService";

const useCreateDeveloper = () =>
  useCreateEntity<Developer>(developerService.post, ["developers"]);

export default useCreateDeveloper;
