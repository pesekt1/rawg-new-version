import { useQuery } from "@tanstack/react-query";
import { Response } from "../../services/api-client";
import stores from "./stores";
import ms from "ms";
import { Store } from "./Store";
import storeService from "./storeService";

const useStores = () =>
  useQuery<Response<Store>, Error>({
    queryKey: ["stores"],
    queryFn: storeService.getAll,
    staleTime: ms("1d"),
    cacheTime: ms("1d"),
    placeholderData: stores,
  });

export default useStores;
