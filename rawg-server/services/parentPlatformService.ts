import { ParentPlatform } from "../entities/ParentPlatform";
import { PlatformReadDto } from "../controllers/dto/PlatformReadDto";
import { toPlatformReadDto } from "../controllers/dto/entityMappers";
import { BaseDtoService } from "./baseDtoService";

/**
 * Service instance for managing parent platforms.
 * Provides CRUD operations for ParentPlatform entities.
 * Maps entities to PlatformReadDto for API responses.
 */
export const parentPlatformService = new BaseDtoService<ParentPlatform, PlatformReadDto>(
  ParentPlatform,
  toPlatformReadDto
);
