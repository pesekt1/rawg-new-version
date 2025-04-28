import ApiClient from "../../services/api-client";
import { Tag } from "./Tag";

const tagService = new ApiClient<Tag>("/tags");

export default tagService;
