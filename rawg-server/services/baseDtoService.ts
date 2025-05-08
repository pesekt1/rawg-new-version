import { BaseService } from "./baseService";
import { ObjectLiteral, ObjectType } from "typeorm";

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
   * Get all entities as DTOs.
   */
  async getAllDtos(): Promise<D[]> {
    const items = await this.getAll();
    return items.map(this.toDto);
  }

  /**
   * Get an entity by ID as a DTO.
   */
  async getByIdDto(id: number): Promise<D | null> {
    const item = await this.getById(id);
    return item ? this.toDto(item) : null;
  }
}
