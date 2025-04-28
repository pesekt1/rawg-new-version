import useCreateEntity from "../../hooks/useCreateEntity";
import { Tag } from "./Tag";
import tagService from "./tagService";

const useCreateTag = () => useCreateEntity<Tag>(tagService.post, ["tags"]);

export default useCreateTag;
