import { ParentPlatform } from "../entities/ParentPlatform";
import { BaseService } from "./baseService";

/**
 * Service instance for managing parent platforms.
 * Provides CRUD operations for ParentPlatform entities.
 */
export const parentPlatformService = new BaseService(ParentPlatform);
