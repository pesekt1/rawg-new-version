import useCreateEntity from "../../hooks/useCreateEntity";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const useCreatePublisher = () =>
  useCreateEntity<Publisher>(publisherService.post, ["publishers"]);

export default useCreatePublisher;
