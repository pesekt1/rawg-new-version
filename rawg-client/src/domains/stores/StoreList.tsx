import CustomList from "../../components/CustomList/CustomList";
import useStores from "./useStores";
import useCreateStore from "./useCreateStore";
import useDeleteStore from "./useDeleteStore";
import useUpdateStore from "./useUpdateStore";
import useGameQueryStore from "../../state";

const StoreList = () => {
  const storeId = useGameQueryStore((s) => s.gameQuery.storeId);
  const setStoreId = useGameQueryStore((s) => s.setStoreId);

  return (
    <CustomList
      title="Stores"
      onSelectedItemId={setStoreId}
      selectedItemId={storeId}
      useDataHook={useStores}
      useCreateHook={useCreateStore}
      useUpdateHook={useUpdateStore}
      useDeleteHook={useDeleteStore}
    />
  );
};

export default StoreList;
