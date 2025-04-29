import useStores from "./useStores";

const useStore = (selectedStoreId?: number) => {
  const { data } = useStores();
  const selectedStore = data?.results?.find(
    (store) => store.id === selectedStoreId
  );

  return selectedStore;
};

export default useStore;
