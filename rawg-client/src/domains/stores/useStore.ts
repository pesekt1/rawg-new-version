import useGetEntity from "../../hooks/useGetEntity";
import { Store } from "./Store";
import storeService from "./storeService";

const useStore = (storeId: number) =>
  useGetEntity<Store>({
    queryKey: ["store", storeId],
    queryFn: () => storeService.get(storeId),
  });

export default useStore;
