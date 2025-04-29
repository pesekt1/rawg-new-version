import useGetEntity from "../../hooks/useGetEntity";
import { Tag } from "./Tag";
import tagService from "./tagService";

const useTag = (tagId?: number | null) =>
  useGetEntity<Tag>({
    idOrSlug: tagId,
    queryKeyPrefix: "tag",
    service: tagService,
  });

export default useTag;
