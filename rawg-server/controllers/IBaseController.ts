/**
 * Common interfaces for controller responses and controller CRUD contracts.
 */

import { DeepPartial } from "typeorm";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";

/**
 * Generic interface for CRUD controller methods.
 */
export interface IBaseController<T> {
  /**
   * Get all entities with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing entities.
   */
  getAll(page?: number, page_size?: number): Promise<PaginatedResponse<T>>;

  /**
   * Get an entity by ID.
   * @param id Entity ID.
   * @returns The entity or null if not found.
   */
  getById(id: number): Promise<T | null>;

  /**
   * Create a new entity.
   * @param data Partial entity data.
   * @returns The created entity.
   */
  create(data: DeepPartial<T>): Promise<T>;

  /**
   * Update an existing entity.
   * @param id Entity ID.
   * @param data Update data.
   * @returns The updated entity or null if not found.
   */
  update(id: number, data: DeepPartial<T>): Promise<T | null>;

  /**
   * Delete an entity by ID.
   * @param id Entity ID.
   * @returns Message indicating result.
   */
  delete(id: number): Promise<{ message: string }>;
}
