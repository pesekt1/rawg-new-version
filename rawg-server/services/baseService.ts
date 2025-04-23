import { AppDataSource } from "../startup/data-source";
import { ObjectType, DeepPartial, ObjectLiteral } from "typeorm";

export class BaseService<T extends ObjectLiteral> {
  private repository = AppDataSource.getRepository<T>(this.entity);

  constructor(private entity: ObjectType<T>) {}

  getAll(): Promise<T[]> {
    return this.repository.find() as Promise<T[]>;
  }

  getById(id: number | string): Promise<T | null> {
    return this.repository.findOneBy({ id } as any) as Promise<T | null>;
  }

  create(data: DeepPartial<T>): Promise<T> {
    const instance = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(instance);
  }

  async update(id: number | string, data: DeepPartial<T>): Promise<T | null> {
    const instance = await this.repository.findOneBy({ id } as any);
    if (!instance) return null;
    this.repository.merge(instance, data);
    return this.repository.save(instance);
  }

  async delete(id: number | string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
