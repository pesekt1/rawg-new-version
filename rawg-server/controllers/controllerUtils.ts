import { BaseService } from "../services/baseService";
import { ObjectLiteral } from "typeorm";
import { ListResponse } from "./IBaseController";

export async function formatListResponse<T extends ObjectLiteral>(
  service: BaseService<T>
): Promise<ListResponse<T>> {
  const items = await service.getAll();
  return {
    count: items.length,
    results: items,
  };
}

export async function handleDelete<T extends ObjectLiteral>(
  service: BaseService<T>,
  id: number
): Promise<{ message: string }> {
  const deleted = await service.delete(id);
  if (!deleted) {
    const err: any = new Error("Not found");
    err.status = 404;
    throw err;
  }
  return { message: "Deleted" };
}
