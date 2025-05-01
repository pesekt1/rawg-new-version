import { Developer } from "../entities/Developer";
import { BaseService } from "./baseService";

/**
 * Service instance for managing developers.
 * Provides CRUD operations for Developer entities.
 */
export const developerService = new BaseService(Developer);
