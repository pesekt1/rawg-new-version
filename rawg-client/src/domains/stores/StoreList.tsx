import CustomList from "../../components/CustomList";
import useGameQueryStore from "../../state";
import useCreateStore from "./useCreateStore";
import useStores from "./useStores";
import useDeleteStore from "./useDeleteStore";

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
      useDeleteHook={useDeleteStore}
    />
  );
};

export default StoreList;
