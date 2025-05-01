export class BaseController<T> {
  constructor(
    private service: {
      getAll: () => Promise<T[]>;
      getById: (id: number) => Promise<T | null>;
      create: (data: Partial<T>) => Promise<T>;
      update: (id: number, data: Partial<T>) => Promise<T | null>;
      delete: (id: number) => Promise<boolean>;
    }
  ) {}

  async getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  async getById(id: number): Promise<T | null> {
    return this.service.getById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.service.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    return this.service.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
