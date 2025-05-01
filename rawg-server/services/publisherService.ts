import { Publisher } from "../entities/Publisher";
import { BaseService } from "./baseService";

/**
 * Service instance for managing publishers.
 * Provides CRUD operations for Publisher entities.
 */
export const publisherService = new BaseService(Publisher);
