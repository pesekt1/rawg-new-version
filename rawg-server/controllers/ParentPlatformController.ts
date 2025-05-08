/**
 * ParentPlatformController handles CRUD operations for ParentPlatform entities.
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
} from "tsoa";
import { parentPlatformService } from "../services/parentPlatformService";
import { ParentPlatform } from "../entities/ParentPlatform";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { ListResponse, IBaseController } from "./IBaseController";
import { EntityUpdateDto } from "./dto/EntityUpdateDto";
import { PlatformReadDto } from "./dto/PlatformReadDto";

/**
 * Controller for managing ParentPlatform entities.
 * Returns DTOs for GET endpoints.
 */
@Route("platforms/lists/parents")
@Tags("ParentPlatforms")
export class ParentPlatformController
  extends Controller
  implements IBaseController<PlatformReadDto>
{
  /**
   * Get a list of all parent platforms.
   * @returns ListResponse containing parent platform DTOs.
   */
  @Get("/")
  public async getAll(): Promise<ListResponse<PlatformReadDto>> {
    return formatListResponse(parentPlatformService);
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
   * @returns The created ParentPlatform entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: EntityUpdateDto): Promise<ParentPlatform> {
    return parentPlatformService.create(data);
  }

  /**
   * Update an existing parent platform.
   * Requires admin access.
   * @param id ParentPlatform ID.
   * @param data Update data.
   * @returns Updated ParentPlatform entity or null if not found.
   */
  @Put("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: EntityUpdateDto
  ): Promise<ParentPlatform | null> {
    return parentPlatformService.update(id, data);
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
