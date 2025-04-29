import useDevelopers from "./useDevelopers";

const useDeveloper = (selectedDeveloperId?: number) => {
  const { data } = useDevelopers();
  const selectedDeveloper = data?.results?.find(
    (developer) => developer.id === selectedDeveloperId
  );

  return selectedDeveloper;
};

export default useDeveloper;
