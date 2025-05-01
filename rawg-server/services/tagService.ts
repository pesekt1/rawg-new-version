import { Tag } from "../entities/Tag";
import { BaseService } from "./baseService";

/**
 * Service instance for managing tags.
 * Provides CRUD operations for Tag entities.
 */
export const tagService = new BaseService(Tag);
