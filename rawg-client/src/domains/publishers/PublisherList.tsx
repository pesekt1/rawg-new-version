import CustomList from "../../components/CustomList/CustomList";
import usePublishers from "./usePublishers";
import useCreatePublisher from "./useCreatePublisher";
import useGameQueryStore from "../../state";
import useDeletePublisher from "./useDeletePublisher";
import useUpdatePublisher from "./useUpdatePublisher";

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
      useUpdateHook={useUpdatePublisher}
      useDeleteHook={useDeletePublisher}
    />
  );
};

export default PublisherList;
