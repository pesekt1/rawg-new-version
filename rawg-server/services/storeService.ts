import { Store } from "../entities/Store";
import { EntityReadDto } from "../controllers/dto/EntityReadDto";
import { toEntityReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

/**
 * Service instance for managing stores.
 * Provides CRUD operations for Store entities.
 * Maps entities to EntityReadDto for API responses.
 */
export const storeService = new BaseDtoService<Store, EntityReadDto>(
  Store,
  toEntityReadDto
);
