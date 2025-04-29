import useGetEntity from "../../hooks/useGetEntity";
import { Tag } from "./Tag";
import tagService from "./tagService";

const useTag = (tagId: number) =>
  useGetEntity<Tag>({
    queryKey: ["tag", tagId],
    queryFn: () => tagService.get(tagId),
  });

export default useTag;
