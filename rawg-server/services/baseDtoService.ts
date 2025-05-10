import { BaseService, PaginatedResponse } from "./baseService";
import { ObjectLiteral, ObjectType, DeepPartial } from "typeorm";

/**
 * Generic base service for entities that map to a DTO.
 * @template T Entity type
 * @template D DTO type
 */
export class BaseDtoService<T extends ObjectLiteral, D> extends BaseService<T> {
  constructor(
    entity: ObjectType<T>,
    private toDto: (entity: T) => D
  ) {
    super(entity);
  }

  /**
   * Get all entities as DTOs with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @param baseUrl Base URL for constructing the "next" link.
   * @returns Promise resolving to a paginated response with DTOs.
   */
  async getAllDtos(
    page: number = 1,
    page_size: number = 10,
    baseUrl: string
  ): Promise<PaginatedResponse<D>> {
    const paginatedResponse = await this.getAllPaginated(page, page_size, baseUrl);

    return {
      count: paginatedResponse.count,
      next: paginatedResponse.next,
      results: paginatedResponse.results.map(this.toDto),
    };
  }

  /**
   * Get an entity by ID as a DTO.
   */
  async getByIdDto(id: number): Promise<D | null> {
    const item = await this.getById(id);
    return item ? this.toDto(item) : null;
  }

  /**
   * Create a new entity and return as DTO.
   */
  async createDto(data: DeepPartial<T>): Promise<D> {
    const entity = await super.create(data);
    return this.toDto(entity);
  }

  /**
   * Update an entity by ID and return as DTO.
   */
  async updateDto(id: number | string, data: DeepPartial<T>): Promise<D | null> {
    const entity = await super.update(id, data);
    return entity ? this.toDto(entity) : null;
  }
}
