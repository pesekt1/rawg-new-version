import useDeleteEntity from "../../hooks/useDeleteEntity";
import publisherService from "./publisherService";

const useDeletePublisher = (options?: any) =>
  useDeleteEntity<string>(publisherService.delete, ["publishers"], options);

export default useDeletePublisher;
