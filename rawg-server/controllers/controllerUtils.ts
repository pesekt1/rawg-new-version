/**
 * Utility functions for controller operations such as formatting list responses and handling deletes.
 */

import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { BaseDtoService } from "../services/baseDtoService";
import { ObjectLiteral } from "typeorm";
import { BaseService } from "../services/baseService";

/**
 * Formats the response for a list endpoint using a service that returns DTOs.
 * Supports optional pagination.
 * @param service The BaseDtoService to fetch DTOs from.
 * @param baseUrl optional Base URL for constructing the "next" link.
 * @param pagination Pagination parameters (page and page_size).
 * @returns An object containing the count, next link, and the results array.
 */
export async function formatListResponse<TDto>(
  service: BaseDtoService<any, TDto>, // Use BaseDtoService as the type
  baseUrl?: string,
  pagination?: { page?: number; page_size?: number }
): Promise<PaginatedResponse<TDto>> {
  const page = pagination?.page || 1;
  const page_size = pagination?.page_size || 10;

  const paginatedResponse = await service.getAllDtos(page, page_size, baseUrl); // Use BaseDtoService's method
  return {
    count: paginatedResponse.count,
    next: paginatedResponse.next,
    results: paginatedResponse.results,
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
