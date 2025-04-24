import CustomList from "./CustomList";
import useStores from "../hooks/useStores";
import useCreateStore from "../hooks/useCreateStore";
import useGameQueryStore from "../state";

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
    />
  );
};

export default StoreList;
