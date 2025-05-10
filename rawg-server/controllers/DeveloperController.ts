/**
 * DeveloperController handles CRUD operations for Developer entities.
 * All endpoints return DTOs (EntityReadDto) instead of raw entities.
 * Secured endpoints require admin privileges.
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
import { developerService } from "../services/developerService";
import { ListResponse, IBaseController } from "./IBaseController";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { EntityReadDto } from "./dto/EntityReadDto";

/**
 * Controller for managing Developer entities.
 * Returns DTOs for all endpoints.
 */
@Route("developers")
@Tags("Developers")
export class DeveloperController
  extends Controller
  implements IBaseController<EntityReadDto>
{
  /**
   * Get a list of all developers with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns ListResponse containing developer DTOs.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<ListResponse<EntityReadDto>> {
    return formatListResponse(developerService, { page, page_size });
  }

  /**
   * Get a developer by ID.
   * @param id Developer ID.
   * @returns Developer DTO or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<EntityReadDto | null> {
    return developerService.getByIdDto(id);
  }

  /**
   * Create a new developer.
   * Requires admin access.
   * @param data Developer creation data.
   * @returns The created Developer DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<EntityReadDto> {
    return developerService.createDto(data);
  }

  /**
   * Update an existing developer.
   * Requires admin access.
   * @param id Developer ID.
   * @param data Update data.
   * @returns Updated Developer DTO or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<EntityReadDto | null> {
    return developerService.updateDto(id, data);
  }

  /**
   * Delete a developer by ID.
   * Requires admin access.
   * @param id Developer ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(developerService, id);
  }
}
