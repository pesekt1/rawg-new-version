import useUpdateEntity from "../../hooks/useUpdateEntity";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const useUpdatePublisher = () =>
  useUpdateEntity<Publisher>(publisherService.put, ["publishers"]);

export default useUpdatePublisher;
