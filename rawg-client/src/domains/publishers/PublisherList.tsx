import CustomList from "../../components/CustomList";
import usePublishers from "./usePublishers";
import useCreatePublisher from "./useCreatePublisher";
import useGameQueryStore from "../../state";

const PublisherList = () => {
  const publisherId = useGameQueryStore((s) => s.gameQuery.publisherId);
  const setPublisherId = useGameQueryStore((s) => s.setPublisherId);

  return (
    <CustomList
      title="Publishers"
      onSelectedItemId={setPublisherId}
      selectedItemId={publisherId}
      useDataHook={usePublishers}
      useCreateHook={useCreatePublisher}
    />
  );
};

export default PublisherList;
