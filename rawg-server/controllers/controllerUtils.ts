/**
 * Utility functions for controller operations such as formatting list responses and handling deletes.
 */

import { BaseService } from "../services/baseService";
import { ObjectLiteral } from "typeorm";
import { ListResponse } from "./IBaseController";

/**
 * Formats the response for a list endpoint using a service that returns DTOs.
 * Supports optional pagination.
 * @param service The service to fetch DTOs from.
 * @param pagination Pagination parameters (page and page_size).
 * @returns An object containing the count and the results array.
 */
export async function formatListResponse<TDto>(
  service: { getAllDtos: (page?: number, page_size?: number) => Promise<TDto[]> },
  pagination?: { page?: number; page_size?: number }
): Promise<ListResponse<TDto>> {
  const items = await service.getAllDtos(pagination?.page, pagination?.page_size);
  return {
    count: items.length,
    results: items,
  };
}

/**
 * Handles deletion of an entity by ID.
 * Throws a 404 error if the entity is not found.
 * @param service The service to perform the delete operation.
 * @param id The ID of the entity to delete.
 * @returns An object with a message indicating the result.
 */
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
