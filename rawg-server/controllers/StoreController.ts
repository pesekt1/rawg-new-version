/**
 * StoreController handles CRUD operations for Store entities.
 * All endpoints return DTOs (EntityReadDto) instead of raw entities.
 * Endpoints for creating, updating, and deleting require admin privileges.
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Tags,
  Security,
  Query,
} from "tsoa";
import { storeService } from "../services/storeService";
import { IBaseController } from "./IBaseController";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { EntityReadDto } from "./dto/EntityReadDto";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";

/**
 * Controller for managing Store entities.
 * Returns DTOs for GET endpoints.
 */
@Route("stores")
@Tags("Stores")
export class StoreController
  extends Controller
  implements IBaseController<EntityReadDto>
{
  /**
   * Get a list of all stores with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing store DTOs.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<EntityReadDto>> {
    const baseUrl = "stores"; // Define the baseUrl for this controller
    return formatListResponse(storeService, baseUrl, { page, page_size }); // Pass baseUrl
  }

  /**
   * Get a store by ID.
   * @param id Store ID.
   * @returns Store DTO or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<EntityReadDto | null> {
    return storeService.getByIdDto(id);
  }

  /**
   * Create a new store.
   * Requires admin access.
   * @param data Store creation data.
   * @returns The created Store DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<EntityReadDto> {
    return storeService.createDto(data);
  }

  /**
   * Update an existing store.
   * Requires admin access.
   * @param id Store ID.
   * @param data Update data.
   * @returns Updated Store DTO or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<EntityReadDto | null> {
    return storeService.updateDto(id, data);
  }

  /**
   * Delete a store by ID.
   * Requires admin access.
   * @param id Store ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(storeService, id);
  }
}
