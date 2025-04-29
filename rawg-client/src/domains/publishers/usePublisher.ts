import useGetEntity from "../../hooks/useGetEntity";
import { Publisher } from "./Publisher";
import publisherService from "./publisherService";

const usePublisher = (publisherId: number) =>
  useGetEntity<Publisher>({
    queryKey: ["publisher", publisherId],
    queryFn: () => publisherService.get(publisherId),
  });

export default usePublisher;
