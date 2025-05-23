import useGetEntities from "../../hooks/useGetEntities";
import { Tag } from "./Tag";
import tagService from "./tagService";
import { Response } from "../../services/api-client";
// import tags from "./tags"; // Uncomment if you have local placeholder data

const useTags = () =>
  useGetEntities<Response<Tag>>({
    queryKey: ["tags"],
    queryFn: () => tagService.getAll({ params: { page_size: 1000 } }),
    // placeholderData: tags,
  });

export default useTags;
