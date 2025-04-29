import ApiClient from "../../services/api-client";
import { Tag } from "./Tag";

/**
 * Service for performing CRUD operations on Tag entities.
 * Uses the generic ApiClient with the "/tags" endpoint.
 */
const tagService = new ApiClient<Tag>("/tags");

export default tagService;
