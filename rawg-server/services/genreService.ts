import { Genre } from "../entities/Genre";
import { BaseService } from "./baseService";

/**
 * Service instance for managing genres.
 * Provides CRUD operations for Genre entities.
 */
export const genreService = new BaseService(Genre);
