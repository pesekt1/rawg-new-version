import { useQuery } from "@tanstack/react-query";
import { Publisher } from "./Publisher";
import { Response } from "../../services/api-client";
import ms from "ms";
import publishers from "./publishers";
import publisherService from "./publisherService";

const usePublishers = () =>
  useQuery<Response<Publisher>, Error>({
    queryKey: ["publishers"],
    queryFn: publisherService.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: publishers,
  });

export default usePublishers;
