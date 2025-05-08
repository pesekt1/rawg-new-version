import { Genre } from "../entities/Genre";
import { EntityReadDto } from "../controllers/dto/EntityReadDto";
import { toEntityReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

/**
 * Service instance for managing genres.
 * Provides CRUD operations for Genre entities.
 * Maps entities to EntityReadDto for API responses.
 */
export const genreService = new BaseDtoService<Genre, EntityReadDto>(
  Genre,
  toEntityReadDto
);
