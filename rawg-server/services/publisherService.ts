import { Publisher } from "../entities/Publisher";
import { EntityReadDto } from "../controllers/dto/EntityReadDto";
import { toEntityReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

/**
 * Service instance for managing publishers.
 * Provides CRUD operations for Publisher entities.
 * Maps entities to EntityReadDto for API responses.
 */
export const publisherService = new BaseDtoService<Publisher, EntityReadDto>(
  Publisher,
  toEntityReadDto
);
