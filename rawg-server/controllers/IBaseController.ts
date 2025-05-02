import { DeepPartial } from "typeorm";

export interface ListResponse<T> {
  count: number;
  results: T[];
}

export interface IBaseController<T> {
  getAll(): Promise<ListResponse<T>>;
  getById(id: number): Promise<T | null>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: number, data: DeepPartial<T>): Promise<T | null>;
  delete(id: number): Promise<{ message: string }>;
}
