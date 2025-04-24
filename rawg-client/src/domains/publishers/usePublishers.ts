import useGetEntities from "../../hooks/useGetEntities";
import { Publisher } from "./Publisher";
import publishers from "./publishers";
import publisherService from "./publisherService";
import { Response } from "../../services/api-client";

const usePublishers = () =>
  useGetEntities<Response<Publisher>>({
    queryKey: ["publishers"],
    queryFn: publisherService.getAll,
    placeholderData: publishers,
  });

export default usePublishers;
