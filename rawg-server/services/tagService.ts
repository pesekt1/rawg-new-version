import { Tag } from "../entities/Tag";
import { TagReadDto } from "../controllers/dto/TagReadDto";
import { toTagReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

/**
 * Service instance for managing tags.
 * Provides CRUD operations for Tag entities.
 * Maps entities to TagReadDto for API responses.
 */
export const tagService = new BaseDtoService<Tag, TagReadDto>(
  Tag,
  toTagReadDto
);
