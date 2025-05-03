import CustomList from "../../components/CustomList";

import useGameQueryStore from "../../state";
import useCreateDeveloper from "./useCreateDeveloper";
import useDeleteDeveloper from "./useDeleteDeveloper";
import useUpdateDeveloper from "./useUpdateDeveloper";
import useDevelopers from "./useDevelopers";

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
      useUpdateHook={useUpdateDeveloper}
      useDeleteHook={useDeleteDeveloper}
    />
  );
};

export default DeveloperList;
