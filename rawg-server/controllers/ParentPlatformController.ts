/**
 * ParentPlatformController handles CRUD operations for ParentPlatform entities.
 * All endpoints return DTOs (PlatformReadDto) instead of raw entities.
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
import { parentPlatformService } from "../services/parentPlatformService";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { PlatformReadDto } from "./dto/PlatformReadDto";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";

/**
 * Controller for managing ParentPlatform entities.
 * All endpoints return DTOs (PlatformReadDto) instead of raw entities.
 * Endpoints for creating, updating, and deleting require admin privileges.
 */
@Route("platforms/lists/parents")
@Tags("ParentPlatforms")
export class ParentPlatformController
  extends Controller
  implements IBaseController<PlatformReadDto>
{
  /**
   * Get a list of all parent platforms with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing parent platform DTOs.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<PaginatedResponse<PlatformReadDto>> {
    const baseUrl = "platforms/lists/parents";
    return formatListResponse(parentPlatformService, baseUrl, {
      page,
      page_size,
    });
  }

  /**
   * Get a parent platform by ID.
   * @param id ParentPlatform ID.
   * @returns ParentPlatform DTO or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<PlatformReadDto | null> {
    return parentPlatformService.getByIdDto(id);
  }

  /**
   * Create a new parent platform.
   * Requires admin access.
   * @param data Parent platform creation data.
   * @returns The created ParentPlatform DTO.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<PlatformReadDto> {
    return parentPlatformService.createDto(data);
  }

  /**
   * Update an existing parent platform.
   * Requires admin access.
   * @param id ParentPlatform ID.
   * @param data Update data.
   * @returns Updated ParentPlatform DTO or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<PlatformReadDto | null> {
    return parentPlatformService.updateDto(id, data);
  }

  /**
   * Delete a parent platform by ID.
   * Requires admin access.
   * @param id ParentPlatform ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("admin")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(parentPlatformService, id);
  }
}
