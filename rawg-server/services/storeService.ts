import { Store } from "../entities/Store";
import { BaseService } from "./baseService";

/**
 * Service instance for managing stores.
 * Provides CRUD operations for Store entities.
 */
export const storeService = new BaseService(Store);
