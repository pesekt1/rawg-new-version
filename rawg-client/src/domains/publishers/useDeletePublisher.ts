import useDeleteEntity from "../../hooks/useDeleteEntity";
import publisherService from "./publisherService";

const useDeletePublisher = () =>
  useDeleteEntity(publisherService.delete, ["publishers"]);

export default useDeletePublisher;
