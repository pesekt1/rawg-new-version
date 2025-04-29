import useTags from "./useTags";

const useTag = (selectedTagId?: number) => {
  const { data } = useTags();
  const selectedTag = data?.results?.find((tag) => tag.id === selectedTagId);

  return selectedTag;
};

export default useTag;
