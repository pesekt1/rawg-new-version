import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { AppDataSource } from "../startup/data-source";
import { ObjectType, DeepPartial, ObjectLiteral } from "typeorm";
import { constructNextUrl } from "../utils/paginationUtils";

/**
 * Generic base service for CRUD operations on entities.
 * @template T Entity type
 */
export class BaseService<T extends ObjectLiteral> {
  protected repository = AppDataSource.getRepository<T>(this.entity);

  /**
   * @param entity The entity class to operate on.
   */
  constructor(private entity: ObjectType<T>) {}

  /**
   * Get all entities with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns Promise resolving to an array of entities.
   */
  getAll(page?: number, page_size?: number): Promise<T[]> {
    const skip = page && page_size ? (page - 1) * page_size : undefined;
    const take = page_size;

    return this.repository.find({
      skip,
      take,
    }) as Promise<T[]>;
  }

  /**
   * Get an entity by its ID.
   * @param id Entity ID
   * @returns Promise resolving to the entity or null if not found.
   */
  getById(id: number | string): Promise<T | null> {
    return this.repository.findOneBy({ id } as any) as Promise<T | null>;
  }

  /**
   * Create a new entity.
   * @param data Partial entity data
   * @returns Promise resolving to the created entity.
   */
  create(data: DeepPartial<T>): Promise<T> {
    const instance = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(instance);
  }

  /**
   * Update an entity by its ID.
   * @param id Entity ID
   * @param data Partial entity data to update
   * @returns Promise resolving to the updated entity or null if not found.
   */
  async update(id: number | string, data: DeepPartial<T>): Promise<T | null> {
    const instance = await this.repository.findOneBy({ id } as any);
    if (!instance) return null;
    this.repository.merge(instance, data);
    return this.repository.save(instance);
  }

  /**
   * Delete an entity by its ID.
   * @param id Entity ID
   * @returns Promise resolving to true if deleted, false otherwise.
   */
  async delete(id: number | string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected && result.affected > 0;
  }

  /**
   * Get all entities with optional pagination and return a paginated response.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @param baseUrl optional Base URL for constructing the "next" link.
   * @returns Promise resolving to a paginated response.
   */
  async getAllPaginated(
    page: number = 1,
    page_size: number = 10,
    baseUrl?: string
  ): Promise<PaginatedResponse<T>> {
    console.log("Received baseUrl:", baseUrl); // Debug log

    const skip = (page - 1) * page_size;
    const take = page_size;

    const [items, total] = await this.repository.findAndCount({
      skip,
      take,
    });

    const next = constructNextUrl(baseUrl || "", page, page_size, total);

    return {
      count: total,
      next,
      results: items,
    };
  }
}
