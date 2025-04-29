import useGetEntity from "../../hooks/useGetEntity";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const usePublisher = (publisherId?: number | null) =>
  useGetEntity<Publisher>({
    idOrSlug: publisherId,
    queryKeyPrefix: "publisher",
    service: publisherService,
  });

export default usePublisher;
