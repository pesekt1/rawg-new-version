import CustomList from "../../components/CustomList";
import useDevelopers from "./useDevelopers";
import useCreateDeveloper from "./useCreateDeveloper";
import useGameQueryStore from "../../state";
import useDeleteDeveloper from "./useDeleteDeveloper";

const DeveloperList = () => {
  const developerId = useGameQueryStore((s) => s.gameQuery.developerId);
  const setDeveloperId = useGameQueryStore((s) => s.setDeveloperId);

  return (
    <CustomList
      title="Developers"
      onSelectedItemId={setDeveloperId}
      selectedItemId={developerId}
      useDataHook={useDevelopers}
      useCreateHook={useCreateDeveloper}
      useDeleteHook={useDeleteDeveloper}
    />
  );
};

export default DeveloperList;
